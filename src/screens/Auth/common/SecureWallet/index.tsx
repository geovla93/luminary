import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import RNBiometrics from 'react-native-simple-biometrics';
import OnboardingHeader from '@components/OnboardingHeader';
import {useIntl} from 'react-intl';
import {Button} from '@ui/core/components';
import AgreementCheckbox from './components/AgreementCheckbox';
import {SCREENS} from '@screens/screens';
import OnboardingSteps from '@components/OnboardingSteps';

import {usePinManager} from '@components/PinManagerProvider';
import {useTemporaryWallet} from '@hooks/wallet/useTemporaryWallet';
import {useToast} from 'react-native-toast-notifications';
import {Icon} from 'react-native-paper';

const SecureWalletScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const toast = useToast();

  const [canUseBiometrics, setCanUseBiometrics] = useState(false);
  const {mode, securedStoreWalletData, resetTemporaryWalletState} =
    useTemporaryWallet();
  const {handleSetPin} = usePinManager();
  const [checked, setChecked] = useState(false);

  const handleNext = async (pin: string, withBiometrics: boolean) => {
    securedStoreWalletData(pin, withBiometrics)
      .then(() => {
        navigation.navigate(
          mode === 'recovering'
            ? SCREENS.COMPLETED_RECOVERY_SCREEN
            : SCREENS.COMPLETED_WALLET_SCREEN,
        );
      })
      .catch(_err => {
        resetTemporaryWalletState();
        navigation.navigate(SCREENS.AUTH_ROOT_SCREEN, {
          screen: SCREENS.ONBOARDING_SCREEN,
        });
        toast.show('Error while creating wallet', {
          type: 'danger',
          placement: 'top',
          animationType: 'slide-in',
          icon: <Icon source="alert-circle-outline" size={24} color="#fff" />,
          dangerColor: '#d32f2f',
          style: {
            width: '100%',
          },
        });
      });
  };

  const openPinSetup = (enableBiometrics: boolean) => {
    handleSetPin(_pin => {
      handleNext(_pin, enableBiometrics);
    });
  };

  useEffect(() => {
    const checkBiometrics = async () => {
      const canAuthenticate = await RNBiometrics.canAuthenticate();
      setCanUseBiometrics(canAuthenticate);
    };
    checkBiometrics();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.wrapper}>
        <OnboardingSteps
          total={4}
          fill={3}
          showBack={true}
          onBack={() => navigation.goBack()}
        />
        <OnboardingHeader
          showBack={true}
          title={'protect_wallet'}
          subtitle="protect_wallet_subtitle"
          info="protect_wallet_info"
        />
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <AgreementCheckbox
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
          </View>
          <View style={styles.actionContainer}>
            {canUseBiometrics && (
              <Button
                variant="contained"
                disabled={!checked}
                onPress={() => openPinSetup(true)}
                sx={{marginTop: 20}}>
                {formatMessage({
                  id: 'use_face_id',
                })}
              </Button>
            )}
            <Button
              variant="elevated"
              disabled={!checked}
              textColor="#fff"
              onPress={() => openPinSetup(false)}
              sx={{marginTop: 20}}>
              {formatMessage({
                id: 'create_pin',
              })}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  actionContainer: {
    marginBottom: 20,
  },
});

export default SecureWalletScreen;
