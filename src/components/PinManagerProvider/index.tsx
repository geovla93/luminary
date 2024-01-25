import React, {createContext, useContext, useRef, useState} from 'react';
import {PinCodeT} from '@anhnch/react-native-pincode';
import PinComponent from '@components/PinComponent';
import {useAppSelector} from '@redux/hook';
import useApplication from '@hooks/useApplication';
import RNBiometrics from 'react-native-simple-biometrics';

type PinCallback = (pin: string) => void;

interface IPinManagerContext {
  handleSetPin: (cb: PinCallback) => void;
  lockTheApp: (cb: PinCallback) => void;
}

interface IPinManagerProviderProps {
  children: React.ReactNode;
}

const PinManagerContext = createContext<IPinManagerContext>(
  {} as IPinManagerContext,
);

const PinManagerProvider = ({children}: IPinManagerProviderProps) => {
  const {lockingMethod, lockWallet} = useApplication();
  const [visible, setVisible] = useState(false);
  const [pinMode, setPinMode] = useState<PinCodeT.Modes>(PinCodeT.Modes.Enter);
  const pinCallback = useRef<PinCallback | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const handleSetPin = (_pinCallback: PinCallback) => {
    pinCallback.current = _pinCallback;
    setPinMode(PinCodeT.Modes.Set);
    setVisible(true);
  };

  const lockTheApp = (_pinCallback: PinCallback) => {
    pinCallback.current = _pinCallback;
    setVisible(true);
    setPinMode(PinCodeT.Modes.Enter);
    setUnlocking(true);
    lockWallet();
    if (lockingMethod === 'biometrics') {
      RNBiometrics.requestBioAuth(
        'Unlock wallet',
        'Confirm your identity',
      ).then((res: any) => {
        if (res) {
          onEnterSuccess();
        } else {
          console.log('onEnterCancel');
        }
      });
    }
  };

  const onSet = (pin: string) => {
    if (typeof pinCallback.current === 'function') {
      pinCallback.current(pin);
      pinCallback.current = null;
      setVisible(false);
    }
  };
  const onSetCancel = () => {
    console.log('onSetCancel');
  };
  const onReset = () => {
    console.log('onReset');
  };
  const onEnterSuccess = async () => {
    if (typeof pinCallback.current === 'function') {
      pinCallback.current('');
      pinCallback.current = null;
    }
    setVisible(false);
  };

  return (
    <PinManagerContext.Provider
      value={{
        handleSetPin,
        lockTheApp,
      }}>
      {children}
      <PinComponent
        pin={undefined}
        hasFaceIdEnabled={false}
        pinMode={pinMode}
        visible={visible}
        onSet={onSet}
        onSetCancel={onSetCancel}
        onReset={onReset}
        onEnter={onEnterSuccess}
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
