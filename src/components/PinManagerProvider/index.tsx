import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {PinCodeT} from '@anhnch/react-native-pincode';
import PinComponent from '@components/PinComponent';

import useApplication from '@hooks/useApplication';
import RNBiometrics from 'react-native-simple-biometrics';
import {LOCK_PERIOD} from 'src/configs/security';
import {useIntl} from 'react-intl';

type PinCallback = (pin: string) => void;
type PinCallbackWithNoParams = () => void;
type IOnCancel = () => void;

interface IPinManagerContext {
  handleSetPin: (cb: PinCallback, onCancel: IOnCancel) => void;
  lockTheApp: (cb: PinCallbackWithNoParams) => void;
  lockForPin: (cb: PinCallback) => void;
  dismiss: () => void;
}

interface IPinManagerProviderProps {
  children: React.ReactNode;
}

const PinManagerContext = createContext<IPinManagerContext>(
  {} as IPinManagerContext,
);

const PinManagerProvider = ({children}: IPinManagerProviderProps) => {
  const {formatMessage} = useIntl();
  const {lockingMethod, lockOnWrongPin, lockedUntil} = useApplication();
  const [visible, setVisible] = useState(false);
  const [lockedDuration, setLockedDuration] = useState(LOCK_PERIOD);
  const [pinMode, setPinMode] = useState<PinCodeT.Modes>(PinCodeT.Modes.Enter);
  const pinCallback = useRef<PinCallback | null>(null);
  const onCancel = useRef<IOnCancel | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const handleSetPin = useCallback(
    (_pinCallback: PinCallback, _onCancel: IOnCancel) => {
      pinCallback.current = _pinCallback;
      onCancel.current = _onCancel;
      setPinMode(PinCodeT.Modes.Set);
      setVisible(true);
    },
    [],
  );

  const lockTheApp = useCallback(
    async (_pinCallback: PinCallback) => {
      pinCallback.current = _pinCallback;
      setVisible(true);
      const now = Date.now();
      const isLocked = lockedUntil && now < lockedUntil;
      const _lockedDuration = isLocked ? lockedUntil - now : LOCK_PERIOD;
      setLockedDuration(_lockedDuration);
      setPinMode(isLocked ? PinCodeT.Modes.Locked : PinCodeT.Modes.Enter);
      setUnlocking(true);
      if (lockingMethod === 'biometrics') {
        try {
          const identityMessage = formatMessage({id: 'confirm_your_identity'});
          const biometricsMessage = formatMessage({
            id: 'confirm_your_identity_subtitle',
          });

          const res = await RNBiometrics.requestBioAuth(
            identityMessage,
            biometricsMessage,
          );
          if (res) {
            onEnterSuccess('');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      }
    },
    [formatMessage, lockedUntil, lockingMethod],
  );

  const lockForPin = useCallback((_pinCallback: PinCallback) => {
    setPinMode(PinCodeT.Modes.Enter);
    setVisible(true);
    pinCallback.current = _pinCallback;
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setUnlocking(false);
    setPinMode(PinCodeT.Modes.Enter);
    pinCallback.current = null;
    onCancel.current = null;
  }, []);

  useEffect(() => {
    if (!lockedUntil) {
      setLockedDuration(LOCK_PERIOD);
    }
  }, [lockedUntil]);

  const onSet = useCallback(
    (pin: string) => {
      if (typeof pinCallback.current === 'function') {
        pinCallback.current(pin);
        dismiss();
      }
    },
    [dismiss],
  );

  const onSetCancel = useCallback(() => {
    if (onCancel.current) {
      onCancel.current();
      dismiss();
    }
  }, [dismiss]);

  const onEnterSuccess = useCallback(
    async (pin: string) => {
      if (typeof pinCallback.current === 'function') {
        pinCallback.current(pin);
      }
      dismiss();
    },
    [dismiss],
  );

  const onReset = () => {
    console.log('onReset');
  };

  const handleModeChanged = useCallback(
    (currMode: PinCodeT.Modes, newMode: PinCodeT.Modes | undefined) => {
      if (
        currMode !== PinCodeT.Modes.Locked &&
        newMode === PinCodeT.Modes.Locked
      ) {
        lockOnWrongPin(true);
      }
    },
    [lockOnWrongPin],
  );

  return (
    <PinManagerContext.Provider
      value={{handleSetPin, lockTheApp, lockForPin, dismiss}}>
      {children}
      <PinComponent
        pin={undefined}
        pinMode={pinMode}
        visible={visible}
        onSet={onSet}
        onSetCancel={onSetCancel}
        onReset={onReset}
        onEnter={onEnterSuccess}
        onModeChanged={handleModeChanged}
        lockDuration={lockedDuration}
      />
    </PinManagerContext.Provider>
  );
};

export default PinManagerProvider;

export const usePinManager = () => {
  const context = useContext(PinManagerContext);
  if (context === undefined) {
    throw new Error('usePinManager must be used within a PinManagerProvider');
  }
  return context;
};
