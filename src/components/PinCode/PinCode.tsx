import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {PinCodeT} from './types';
import ResetLayout from './ResetLayout';
import LockedLayout from './LockedLayout';
import EnterLayout from './EnterLayout';
import {DEFAULT} from './common';
import SetLayout from './SetLayout';
import useApplication from '@hooks/useApplication';
import {colors} from '@ui/core/theme';

const PinCode = ({
  pin,
  visible = false,
  mode = PinCodeT.Modes.Enter,
  options,
  textOptions,
  styles,
  onEnter,
  onSet,
  onSetCancel,
  onReset,
  onModeChanged,
}: PinCodeT.PinCodeProps) => {
  const [curMode, setCurMode] = useState<PinCodeT.Modes>(mode);
  const [curOptions, setCurOptions] = useState<PinCodeT.Options>(
    DEFAULT.Options,
  );
  const {lockOnWrongPin} = useApplication();
  const [curTextOptions, setCurTextOptions] = useState<PinCodeT.TextOptions>(
    DEFAULT.TextOptions,
  );

  useEffect(() => {
    setCurOptions({...DEFAULT.Options, ...options});
  }, [options]);

  useEffect(() => {
    if (!textOptions) {
      return;
    }

    const merged: PinCodeT.TextOptions = {
      enter: {
        ...DEFAULT.TextOptions.enter,
        ...textOptions.enter,
      },
      set: {
        ...DEFAULT.TextOptions.set,
        ...textOptions.set,
      },
      locked: {
        ...DEFAULT.TextOptions.locked,
        ...textOptions.locked,
      },
      reset: {
        ...DEFAULT.TextOptions.reset,
        ...textOptions.reset,
      },
    };
    setCurTextOptions(merged);
  }, [textOptions]);

  useEffect(() => {
    setCurMode(mode);
  }, [mode]);

  function switchMode(newMode: PinCodeT.Modes) {
    setCurMode(newMode);
    onModeChanged?.(curMode, newMode);
  }

  if (!visible) {
    return null;
  }

  return (
    <View style={[DEFAULT.Styles.main, styles?.main]}>
      {curMode == PinCodeT.Modes.Enter && (
        <EnterLayout
          pin={pin}
          mode={curMode}
          options={curOptions}
          textOptions={curTextOptions}
          onEnter={onEnter}
          onMaxAttempt={() => switchMode(PinCodeT.Modes.Locked)}
          onReset={() => switchMode(PinCodeT.Modes.Reset)}
          styles={{
            button: {
              backgroundColor: colors.primary,
              borderRadius: 24,
            },
            pinContainer: {
              // backgroundColor: 'red',
            },
            pin: {
              backgroundColor: colors.background,
              borderBottomWidth: 1,
              borderBottomColor: colors.tertiary,
              width: 20,
            },
            enteredPin: {
              backgroundColor: colors.primary,
              width: 10,
              height: 10,
              marginHorizontal: 15,
              paddingBottom: 0,
              marginTop: -10,
              borderBottomWidth: 1,
              borderBottomColor: colors.primary,
            },
          }}
        />
      )}
      {curMode == PinCodeT.Modes.Set && (
        <SetLayout
          pin={pin}
          mode={curMode}
          options={curOptions}
          textOptions={curTextOptions}
          onSet={onSet}
          onReset={() => switchMode(PinCodeT.Modes.Reset)}
          onSetCancel={onSetCancel}
          styles={styles?.enter}
        />
      )}
      {curMode == PinCodeT.Modes.Locked && (
        <LockedLayout
          options={curOptions}
          textOptions={curTextOptions.locked}
          styles={styles?.locked}
          onClockFinish={() => {
            lockOnWrongPin(false);
            switchMode(PinCodeT.Modes.Enter);
          }}
        />
      )}
      {curMode == PinCodeT.Modes.Reset && (
        <ResetLayout
          styles={styles?.reset}
          textOptions={curTextOptions.reset}
          options={curOptions}
          onReset={onReset}
          onCancel={() => switchMode(PinCodeT.Modes.Enter)}
        />
      )}
    </View>
  );
};

export default PinCode;
