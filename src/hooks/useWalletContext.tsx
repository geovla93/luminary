import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {setBackedUp} from '@redux/slices/wallet.slice';

import {IBlockchain} from '@itypes/blockchain';
import blockchains from 'src/blockchain';
import {IWalletChain} from '@itypes/wallet';
import AskForBackup from '@components/AskForBackup';

interface WalletContextProps {
  wallet: any;
  current: string;
  openBackup: () => void;
  getCurrentWallet: () => any;
  setCurrentWalletBackedUp: () => void;
  mainWalletAddress: string;
  chains: IBlockchain[];
  walletPairs: {
    [key: string]: any;
  };
}

const WalletContext = createContext<WalletContextProps>(
  {} as WalletContextProps,
);

interface WalletContextProviderProps {
  children: React.ReactNode;
}

const WalletContextProvider = ({children}: WalletContextProviderProps) => {
  const dispatch = useAppDispatch();
  const {walletPairs, current, mainWalletAddress} = useAppSelector(
    state => state.wallet,
  );
  const [backupOpen, setBackupOpen] = useState<boolean>(false);
  const backedUpRef = useRef<any>(null);

  const wallet = useMemo(() => walletPairs[current], [walletPairs, current]);

  const chains = useMemo(() => {
    const _chains: IBlockchain[] = [];
    if (walletPairs[current]?.chains) {
      Object.keys(walletPairs[current].chains).forEach((chainKey: string) => {
        const _chain = walletPairs[current].chains[chainKey] as IWalletChain;
        const chainData = {
          ...blockchains[_chain.chain],
          address: _chain.address,
        };
        _chains.push(chainData);
      });
    }
    return _chains;
  }, [walletPairs, current]);

  useEffect(() => {
    if (walletPairs && current && !walletPairs[current].backedUp) {
      setBackupOpen(true);
    }
  }, [current]);

  const handleCloseBackup = () => {
    backedUpRef.current?.close();
    setTimeout(() => {
      setBackupOpen(false);
    }, 100);
  };

  const setCurrentWalletBackedUp = () => {
    dispatch(setBackedUp(true));
  };

  const getCurrentWallet = () => {
    return walletPairs[current];
  };

  return (
    <WalletContext.Provider
      value={{
        walletPairs,
        current,
        wallet,
        chains,
        mainWalletAddress,
        openBackup: () => setBackupOpen(true),
        getCurrentWallet,
        setCurrentWalletBackedUp,
      }}>
      {children}
      {backupOpen && (
        <AskForBackup
          bottomSheetRef={backedUpRef}
          onClose={handleCloseBackup}
        />
      )}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletContext');
  }
  return context;
};
