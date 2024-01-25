import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
} from 'react';

import {Mnemonic} from 'ethers';
import {setUnlockingMethod} from '@redux/slices/application.slice';
import WalletManager from 'src/blockchain/evm/WalletManager';
import {useAppDispatch} from '@redux/hook';
import {EVM_CHAINS} from 'src/blockchain';
import useWalletSecurity from './useWalletSecurity';
import {WALLET_ENCRYPTION_VERSION} from '@utils/config';
import useWalletDispatcher from './wallet/useWalletDispatcher';

// Defines the shape of the context data for temporary wallet
interface ITemporaryWalletContext {
  mode: 'creating' | 'recovering' | null;
  backedUp: boolean;
  setPassword: (password: string) => void;
  setWalletMode: (mode: 'creating' | 'recovering' | null) => void;
  createTempWallet: () => Promise<boolean>;
  recoverWallet: (seedPhrase: string) => Promise<boolean>;
  getSeedPhrase: () => string | null;
  onConfirmBackup: () => void;
  securedStoreWalletData: (
    pin: string,
    withBiometrics: boolean,
  ) => Promise<boolean>;
}

interface ITemporaryWalletProviderProps {
  children: React.ReactNode;
}

const TemporaryWalletContext = createContext<ITemporaryWalletContext>(
  {} as ITemporaryWalletContext,
);

const TemporaryWalletProvider = ({children}: ITemporaryWalletProviderProps) => {
  const dispatch = useAppDispatch();
  const {dispatchEvmWallet} = useWalletDispatcher();
  const {
    encryptAndStoreCredentials,
    encryptAndStoreForPinValidation,
    verifyWalletEncryption,
  } = useWalletSecurity();
  const [walletState, setWalletState] = useState({
    mode: null as 'creating' | 'recovering' | null,
    password: '',
    backedUp: false,
  });

  const wallet = useRef<WalletManager | null>(null);

  // Helper function to handle common wallet creation and recovery logic
  const initializeWallet = async (
    action: 'create' | 'recover',
    seedPhrase: string | null = null,
    walletIndex: string = '0',
  ) => {
    try {
      wallet.current = new WalletManager();
      if (action === 'create') {
        await wallet.current.createWallet();
      } else {
        await wallet.current.recoverWallet(seedPhrase!, walletIndex);
      }
      return true;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

  // Creates a temporary wallet
  const createTempWallet = async (): Promise<boolean> => {
    try {
      await initializeWallet('create');
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to create wallet:', error.message);
      } else {
        console.error('An unexpected error occurred during wallet creation');
      }
      return false;
    }
  };

  // Recovers a temporary wallet
  const recoverWallet = async (
    seedPhrase: string,
    walletIndex: string = '0',
  ) => {
    const normalizedSeedPhrase = seedPhrase.trim().toLowerCase();
    if (!Mnemonic.isValidMnemonic(normalizedSeedPhrase)) {
      throw new Error('Invalid seed phrase');
    }

    try {
      await initializeWallet('recover', normalizedSeedPhrase, walletIndex);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to recover wallet:', error.message);
      } else {
        console.error('An unexpected error occurred during wallet recovery');
      }
      return false;
    }
  };

  // Cleanup wallet on component unmount
  useEffect(() => {
    return () => {
      setWalletState({mode: null, password: '', backedUp: false});
      wallet.current = null;
    };
  }, []);

  // Marks the wallet as backed up
  const onConfirmBackup = () => {
    setWalletState(prevState => ({...prevState, backedUp: true}));
  };

  // Stores the wallet data in Redux
  const storeEvmWallet = (signature: string) => {
    if (wallet.current) {
      dispatchEvmWallet({
        index: wallet.current.walletIndex,
        key: `wallet_${wallet.current.walletIndex}`,
        address: wallet.current.getAddress(),
        derivationPath: wallet.current.getDerivationPath(),
        backedUp: walletState.backedUp,
        signature,
        chains: EVM_CHAINS,
        type: 'mnemonic',
      });
    }
  };

  // Stores the wallet data securely
  const securedStoreWalletData = async (
    pin: string,
    withBiometrics: boolean,
  ): Promise<boolean> => {
    try {
      if (!wallet.current || !walletState.password) {
        throw new Error('Wallet not initialized or password not set');
      }
      const credentials = JSON.stringify({
        version: WALLET_ENCRYPTION_VERSION,
        wallets: {
          ['wallet_' + wallet.current.walletIndex]: {
            index: wallet.current.walletIndex,
            mode: 'mnemonic',
            secret: wallet.current.getEntropy(),
          },
        },
      });

      await encryptAndStoreCredentials(credentials, walletState.password);
      await encryptAndStoreForPinValidation(
        walletState.password,
        pin,
        wallet.current.getAddress(),
      );
      await verifyAndStoreWallet(pin);
      dispatch(setUnlockingMethod(withBiometrics ? 'biometrics' : 'pin'));

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to store wallet data:', error.message);
      } else {
        console.error('An unexpected error occurred during wallet storage');
      }
      return false;
    }
  };

  async function verifyAndStoreWallet(pin: string): Promise<void> {
    const signature = await verifyWalletEncryption(
      pin,
      `wallet_${wallet.current?.walletIndex}`,
    );
    if (!signature) {
      throw new Error('Failed to verify wallet encryption');
    }
    storeEvmWallet(signature);
  }

  // Retrieves the seed phrase of the wallet
  const getSeedPhrase = () => {
    if (!wallet.current) {
      throw new Error('Wallet not initialized');
    }
    return wallet.current.getMnemonic().phrase;
  };

  return (
    <TemporaryWalletContext.Provider
      value={{
        ...walletState,
        getSeedPhrase,
        createTempWallet,
        recoverWallet,
        setPassword: password =>
          setWalletState(prevState => ({...prevState, password})),
        onConfirmBackup,
        securedStoreWalletData,
        setWalletMode: mode =>
          setWalletState(prevState => ({...prevState, mode})),
      }}>
      {children}
    </TemporaryWalletContext.Provider>
  );
};

export default TemporaryWalletProvider;

export const useTemporaryWallet = () => {
  const context = useContext(TemporaryWalletContext);
  if (context === undefined) {
    throw new Error(
      'useTemporaryWallet must be used within a TemporaryWalletProvider',
    );
  }
  return context;
};
