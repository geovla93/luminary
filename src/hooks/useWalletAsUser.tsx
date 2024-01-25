import React, {useContext, createContext, useEffect, useMemo} from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {agreementMessage} from '@utils/config';
import {authenticateWallet} from '../api/wallet';
import useTokens from './useTokens';
import {setToken, setUserData} from '@redux/slices/user.slice';

interface IWalletAsUserContext {
  shouldAuthenticate: boolean;
}

type WalletAsUserProviderProps = {
  children: React.ReactNode;
};

const WalletAsUserContext = createContext<IWalletAsUserContext>(
  {} as IWalletAsUserContext,
);

const WalletAsUserProvider = ({children}: WalletAsUserProviderProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const walletData = useAppSelector(state => state.wallet);
  const {setInitialTokens, refreshPrices} = useTokens();

  const shouldAuthenticate = useMemo(() => {
    if (!user.token && walletData.mainWalletAddress && walletData.signature) {
      return true;
    }
    return false;
  }, [user.token, walletData.mainWalletAddress, walletData.signature]);
  const authenticate = async (address: string, chains: string[]) => {
    try {
      const authData = {
        address,
        chains,
        signature: walletData.signature,
        message: agreementMessage,
        deviceType: Platform.OS,
        deviceId: await DeviceInfo.getUniqueId(),
        deviceModel: DeviceInfo.getModel(),
        version: DeviceInfo.getVersion(),
      };
      const {data} = await authenticateWallet(authData);

      const {tokens, tokenIds, wallet, accessToken} = data;
      setInitialTokens(tokens, tokenIds);
      dispatch(setToken(accessToken));
      dispatch(setUserData(wallet));
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (shouldAuthenticate) {
      // Authentication is checking if the signature address is matching the main wallet address and is allowing the connection to breg
      // also is retrieving the default tokens for the wallet

      // const _chains: string[] = [];
      const _chains = Object.keys(
        walletData.walletPairs[walletData.current].chains,
      );
      authenticate(walletData.mainWalletAddress, _chains);
    } else {
      console.log('should not Authenticate');
    }
  }, [
    shouldAuthenticate,
    walletData.mainWalletAddress,
    user.token,
    walletData.signature,
  ]);

  useEffect(() => {
    if (user.token) {
      refreshPrices();
      const interval = setInterval(() => {
        refreshPrices();
        // automatically refresh prices every 2 minutes. will do more complex logic later
      }, 120000);
      return () => clearInterval(interval);
    }
  }, [user.token, walletData.signature]);

  return (
    <WalletAsUserContext.Provider value={{shouldAuthenticate}}>
      {children}
    </WalletAsUserContext.Provider>
  );
};

export default WalletAsUserProvider;

export const useWalletAsUser = () => useContext(WalletAsUserContext);
