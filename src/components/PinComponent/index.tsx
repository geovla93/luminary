import React from 'react';
import {StyleSheet} from 'react-native';
import {PinCode, PinCodeT} from '@components/PinCode';
import {colors} from '@ui/core/theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface IPinComponentProps {
  pin: string | undefined;
  visible: boolean;
  pinMode: PinCodeT.Modes;
  onSet: (pin: string) => void;
  onSetCancel: () => void;
  onReset: () => void;
  onEnter: (pin: string) => void;
  onModeChanged: (
    currMode: PinCodeT.Modes,
    newMode: PinCodeT.Modes | undefined,
  ) => void;
  lockDuration: number;
}

const PinComponent = ({
  pin,
  visible,
  pinMode,
  onSet,
  onSetCancel,
  onReset,
  onEnter,
  onModeChanged,
  lockDuration,
}: IPinComponentProps) => {
  return (
    <PinCode
      pin={pin}
      mode={pinMode}
      visible={visible}
      options={{
        allowReset: false,
        pinLength: 6,
        maxAttempt: 3,
        lockDuration,
        backSpace: (
          <Icon name="backspace-outline" size={24} color={colors.onTertiary} />
        ),
      }}
      styles={{
        main: {
          ...StyleSheet.absoluteFillObject,
          zIndex: 99,
          backgroundColor: colors.background,
        },
      }}
      onSet={onSet}
      onSetCancel={onSetCancel}
      onReset={onReset}
      onEnter={onEnter}
      onModeChanged={onModeChanged}
    />
  );
};

export default PinComponent;
