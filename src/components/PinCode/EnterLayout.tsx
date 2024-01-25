import React, {useState} from 'react';
import {Image, Platform, Pressable, Text, Vibration, View} from 'react-native';
import {PinCodeT} from './types';
import {DEFAULT} from './common';
import NumbersPanel from './components/NumbersPanel';
import Pin from './components/Pin';
import {decryptData} from '@utils/encryption';
import {getSensitiveData} from '@utils/encryptedStorage';
import {useAppSelector} from '@redux/hook';
import {WALLET_UNLOCK_KEY} from 'src/configs/security';
import {useIntl} from 'react-intl';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';

const EnterLayout = ({
  // pin,
  styles,
  textOptions,
  options,
  onEnter,
  onReset,
  onMaxAttempt,
}: {
  pin: string | undefined;
  styles?: PinCodeT.EnterStyles;
  mode: PinCodeT.Modes;
  textOptions: PinCodeT.TextOptions;
  options?: PinCodeT.Options;
  onSwitchMode?: () => void;
  onEnter: (newPin: string) => void;
  onMaxAttempt: () => void;
  onReset: () => void;
}) => {
  const {formatMessage} = useIntl();
  const [curPin, setCurPin] = useState('');
  const {mainWalletAddress} = useAppSelector(state => state.wallet);
  const [disabled, disableButtons] = useState(false);
  const [failureCount, setFailureCount] = useState(0);
  const [showError, setShowError] = useState(false);

  async function onNumberPress(value: string) {
    const newPin =
      value == 'delete'
        ? curPin.substring(0, curPin.length - 1)
        : curPin + value;

    setCurPin(newPin);

    if (newPin.length == options?.pinLength) {
      await processEnterPin(newPin);
    }
  }

  async function processEnterPin(enteredPin: string) {
    disableButtons(true);
    const encryptedAddress = await getSensitiveData(WALLET_UNLOCK_KEY);
    let success = false;
    // if the pin can decrypt the address, then it is the correct pin
    try {
      const decryptedAddress = await decryptData(encryptedAddress, enteredPin);
      if (decryptedAddress == mainWalletAddress) {
        // correct pin
        success = true;
      }
    } catch (error) {
      // wrong pin
      console.log(error);
      success = false;
    }
    if (success) {
      setFailureCount(0);
      disableButtons(false);
      onEnter(enteredPin);
      return;
    }

    if (
      !options?.disableLock &&
      failureCount >=
        (options?.maxAttempt || DEFAULT.Options.maxAttempt || 5) - 1
    ) {
      disableButtons(false);
      onMaxAttempt();
      return;
    }

    setCurPin('');
    setFailureCount(failureCount + 1);

    if (Platform.OS === 'ios') {
      Vibration.vibrate(); // android requires VIBRATE permission
    }

    setShowError(true);
    setTimeout(
      () => setShowError(false),
      options?.retryLockDuration || DEFAULT.Options.retryLockDuration,
    );

    setTimeout(
      () => disableButtons(false),
      options?.retryLockDuration || DEFAULT.Options.retryLockDuration,
    );
  }

  return (
    <>
      <View style={DEFAULT.Styles.enter?.header}>
        <Image
          style={{marginBottom: 40, width: 200, height: 50}}
          resizeMode="contain"
          source={require('@assets/logo-text.png')}
        />
        <Typography
          fontWeight="bold"
          variant="displaySmall"
          textAlign="center"
          color={colors.onSecondary}>
          {formatMessage({id: 'enter_pin'})}
        </Typography>

        <Typography mt={8} textAlign="center" color={colors.onSurface}>
          {formatMessage(
            {
              id: 'enter_pin_subtitle',
              defaultMessage: '',
            },
            {
              pinLength: (
                options?.pinLength ||
                DEFAULT.Options.pinLength ||
                6
              ).toString(),
            },
          )}
        </Typography>
        {showError && (
          <Typography mt={10} color={colors.primary}>
            {formatMessage({
              id: 'enter_pin_error',
              defaultMessage: '',
            })}
          </Typography>
        )}
      </View>
      <View style={DEFAULT.Styles.enter?.content}>
        <Pin
          pin={curPin}
          pinLength={options?.pinLength || DEFAULT.Options.pinLength || 6}
          pinStyle={DEFAULT.Styles.enter?.pin}
          enteredPinStyle={DEFAULT.Styles.enter?.enteredPin}
        />

        <NumbersPanel
          disabled={disabled}
          onButtonPress={onNumberPress}
          backSpace={options?.backSpace}
          backSpaceText={textOptions.enter?.backSpace}
          buttonStyle={styles?.button}
          rowStyle={styles?.buttonRow}
          style={styles?.buttonContainer}
          textStyle={styles?.buttonText}
          disabledStyle={styles?.buttonTextDisabled}
        />
      </View>
      <View style={DEFAULT.Styles.enter?.footer}>
        {options?.allowReset && (
          <Pressable
            onPress={onReset}
            style={state => ({opacity: state.pressed ? 0.6 : 1})}>
            <Text style={DEFAULT.Styles.enter?.footerText}>
              {formatMessage({id: 'reset_pin'})}
            </Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default EnterLayout;
