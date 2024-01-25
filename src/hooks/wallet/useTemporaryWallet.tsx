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
import useWalletDispatcher from './useWalletDispatcher';
import {generateRandomKey} from '@utils/encryption';
import {v4 as uuidV4} from 'uuid';
import {
  DEFAULT_DERIVATION_PATH,
  WALLET_ENCRYPTION_VERSION,
} from 'src/configs/security';
import {IWalletAddresses} from '@itypes/wallet';

// Defines the shape of the context data for temporary wallet
interface ITemporaryWalletContext {
  mode: 'creating' | 'recovering' | null;
  backedUp: boolean;
  seedPhrase: string;
  setSeedPhrase: (seedPhrase: string) => void;
  setPassword: (password: string) => void;
  setWalletMode: (mode: 'creating' | 'recovering' | null) => void;
  createTempWallet: () => Promise<boolean>;
  recoverWallet: (derivationPath: string) => Promise<boolean>;
  getSeedPhrase: () => string | null;
  onConfirmBackup: () => void;
  resetTemporaryWalletState: () => void;
  getAddressesByDerivationPaths: (
    paths: string[],
  ) => Promise<IWalletAddresses[]>;
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
  const [seedPhrase, setSeedPhrase] = useState('');

  const {
    encryptAndStoreWalletCredentials,
    encryptAndStoreForPinValidation,
    encryptAndStoreWalletData,
    verifyWalletEncryption,
  } = useWalletSecurity();
  const [walletState, setWalletState] = useState({
    mode: null as 'creating' | 'recovering' | null,
    backedUp: false,
  });

  const wallet = useRef<WalletManager | null>(null);

  // Helper function to handle common wallet creation and recovery logic
  const initializeWallet = async (
    action: 'create' | 'recover',
    _seedPhrase: string | null = null,
    derivationPath: string = DEFAULT_DERIVATION_PATH,
  ) => {
    try {
      wallet.current = new WalletManager();
      if (action === 'create') {
        await wallet.current.createWallet();
      } else {
        await wallet.current.recoverWallet(_seedPhrase!, derivationPath);
      }
      return true;
    } catch (e) {
      console.error('Wallet initialization error:', e);
      return false;
    }
  };
  // Creates a temporary wallet
  const createTempWallet = async (): Promise<boolean> => {
    return await initializeWallet('create');
  };

  // Recovers a temporary wallet
  const recoverWallet = async (
    derivationPath: string = DEFAULT_DERIVATION_PATH,
  ): Promise<boolean> => {
    const normalizedSeedPhrase = seedPhrase.trim().toLowerCase();
    if (!Mnemonic.isValidMnemonic(normalizedSeedPhrase)) {
      throw new Error('Invalid seed phrase');
    }
    return initializeWallet('recover', normalizedSeedPhrase, derivationPath);
  };

  const resetTemporaryWalletState = () => {
    setWalletState({mode: null, backedUp: false});
    wallet.current = null;
    setSeedPhrase('');
  };

  // Cleanup wallet on component unmount
  useEffect(() => {
    return () => {
      resetTemporaryWalletState();
    };
  }, []);

  // Marks the wallet as backed up
  const onConfirmBackup = () => {
    setWalletState(prevState => ({...prevState, backedUp: true}));
  };

  // Stores the wallet data in Redux
  const storeEvmWallet = (signature: string, secretId: string) => {
    if (wallet.current) {
      dispatchEvmWallet({
        index: wallet.current.walletIndex,
        key: secretId,
        address: wallet.current.getAddress(),
        derivationPath: wallet.current.getDerivationPath(),
        backedUp: walletState.backedUp,
        signature,
        chains: EVM_CHAINS,
        type: 'mnemonic',
      });
    }
  };

  const getAddressesByDerivationPaths = async (
    paths: string[],
  ): Promise<IWalletAddresses[]> => {
    return new Promise(async resolve => {
      const result: IWalletAddresses[] = [];
      for (const path of paths) {
        const controller = new WalletManager();
        await controller.recoverWallet(seedPhrase, path);
        result.push({
          address: controller.getAddress(),
          derivationPath: controller.getDerivationPath(),
        });
      }
      return resolve(result);
    });
  };

  // Stores the wallet data securely
  const securedStoreWalletData = async (
    pin: string,
    withBiometrics: boolean,
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!wallet.current) {
          throw new Error('Wallet not initialized or password not set');
        }
        // create a random key to encrypt the wallet credentials
        const randomWalletKey = generateRandomKey();

        // create a secret id for the wallet
        const secretId = uuidV4();

        // prepare the wallet secret data
        const walletData = JSON.stringify({
          id: secretId,
          version: WALLET_ENCRYPTION_VERSION,
          mode: 'entropy',
          secret: wallet.current.getEntropy(),
        });
        // encrypt and securely store the wallet data with the random key
        await encryptAndStoreWalletData(secretId, walletData, randomWalletKey);

        // encrypt and securely store the pin with the wallet address
        await encryptAndStoreForPinValidation(pin, wallet.current.getAddress());
        // encrypt the wallet random key with the password
        await encryptAndStoreWalletCredentials(randomWalletKey, pin);
        await verifyAndStoreWallet(pin, secretId);
        dispatch(setUnlockingMethod(withBiometrics ? 'biometrics' : 'pin'));

        return resolve(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Failed to store wallet data:', error.message);
        } else {
          console.error('An unexpected error occurred during wallet storage');
        }
        return reject(false);
      }
    });
  };

  async function verifyAndStoreWallet(
    pin: string,
    secretId: string,
  ): Promise<void> {
    if (!wallet.current) {
      throw new Error('Wallet not initialized');
    }
    const signature = await verifyWalletEncryption(
      pin,
      secretId,
      wallet.current.getDerivationPath(),
    );
    if (!signature) {
      throw new Error('Failed to verify wallet encryption');
    }
    storeEvmWallet(signature, secretId);
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
        seedPhrase,
        setSeedPhrase,
        setPassword: password =>
          setWalletState(prevState => ({...prevState, password})),
        onConfirmBackup,
        getAddressesByDerivationPaths,
        securedStoreWalletData,
        setWalletMode: mode =>
          setWalletState(prevState => {
            if (mode === 'recovering') {
              return {...prevState, mode, backedUp: true};
            }
            return {...prevState, mode};
          }),
        resetTemporaryWalletState,
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
