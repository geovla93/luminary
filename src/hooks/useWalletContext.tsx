import React, {createContext, useContext, useMemo} from 'react';
import {useAppSelector} from '@redux/hook';
import {} from '@redux/slices/wallet.slice';

import {Blockchain, IBlockchain} from '@itypes/blockchain';
import blockchains from 'src/blockchain';
import {IWalletChain} from '@itypes/wallet';

interface WalletContextProps {
  wallet: any;
  current: string;
  switchChain: (chain: Blockchain) => void;
  backupWallet: (password: string) => void;
  getCurrentWallet: () => any;
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
  const {walletPairs, current} = useAppSelector(state => state.wallet);

  const wallet = useMemo(() => walletPairs[current], [walletPairs, current]);

  const chains = useMemo(() => {
    const _chains: IBlockchain[] = [];
    if (walletPairs[current]?.chains) {
      Object.keys(walletPairs[current].chains).forEach((chainKey: string) => {
        const _chain = walletPairs[current].chains[chainKey] as IWalletChain;
        const chainData = blockchains[_chain.chain];
        chainData.address = _chain.address;
        _chains.push(chainData);
      });
    }
    return _chains;
  }, [walletPairs, current]);

  const backupWallet = async (password: string) => {
    console.log('backupWallet', password);
  };

  const switchChain = (_chain: Blockchain) => {
    // dispatch(setBlockchain(chain));
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
        getCurrentWallet,
        switchChain,
        backupWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;

export const useWalletContext = () => useContext(WalletContext);
