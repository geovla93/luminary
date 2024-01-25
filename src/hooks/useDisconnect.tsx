import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from '@redux/hook';
import {resetNews} from '@redux/slices/news.slice';
import {resetApplication} from '@redux/slices/application.slice';
import {resetOnboarding} from '@redux/slices/onboarding.slice';
import {resetTokens} from '@redux/slices/tokens.slice';
import {resetUser} from '@redux/slices/user.slice';
import {resetWallet} from '@redux/slices/wallet.slice';
import {resetBreg} from '@redux/slices/breg.slice';
import {resetNfts} from '@redux/slices/nfts.slice';
import useCredential from './useCredentials';
import Intercom from '@intercom/intercom-react-native';

const useDisconnect = () => {
  const {removeAllCredentials} = useCredential();
  const dispatch = useAppDispatch();
  const disconnect = async () => {
    return new Promise(async resolve => {
      await EncryptedStorage.clear();
      await removeAllCredentials();
      dispatch(resetWallet());
      dispatch(resetTokens());
      dispatch(resetNews());
      dispatch(resetUser());
      dispatch(resetOnboarding());
      dispatch(resetNfts());
      dispatch(resetApplication());
      dispatch(resetBreg());
      Intercom.logout();
      resolve(true);
    });
  };

  return disconnect;
};

export default useDisconnect;
