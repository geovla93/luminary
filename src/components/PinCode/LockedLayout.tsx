import React from 'react';
import {Image, Text, View} from 'react-native';
import {PinCodeT} from './types';
import {DEFAULT} from './common';
import Countdown from './components/Countdown';
import {useIntl} from 'react-intl';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';

const LockedLayout = ({
  options,
  textOptions,
  onClockFinish,
}: {
  styles?: PinCodeT.LockedStyles;
  textOptions?: PinCodeT.LockedTextOptions;
  options?: PinCodeT.Options;
  onClockFinish: () => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <>
      <View style={[DEFAULT.Styles.locked?.header]}>
        <Image
          resizeMode="contain"
          style={{width: 300}}
          source={require('@assets/locked.png')}
        />
        <Typography
          fontWeight="bold"
          variant="headlineMedium"
          color={colors.onSecondary}>
          {formatMessage({id: 'temporarily_locked'})}
        </Typography>
        <Typography mt={20} mb={20} color={colors.onSurface} textAlign="center">
          {formatMessage(
            {id: 'temporary_locked_subtitle'},
            {
              maxAttempt: (
                options?.maxAttempt ||
                DEFAULT.Options.maxAttempt ||
                5
              ).toString(),
            },
          )}
        </Typography>
      </View>
      <View style={DEFAULT.Styles.locked?.content}>
        {options?.lockIcon || (
          <Typography
            textAlign="center"
            color={colors.primary}
            fontWeight="bold">
            {formatMessage({id: 'temporary_locked_remaining'})}
          </Typography>
        )}
        <Countdown duration={options?.lockDuration} onFinish={onClockFinish} />
      </View>
      <View style={DEFAULT.Styles.locked?.footer}>
        <Text style={DEFAULT.Styles.locked?.footerText}>
          {textOptions?.footerText}
        </Text>
      </View>
    </>
  );
};

export default LockedLayout;
