import {useAppDispatch} from '@redux/hook';
import {resetNews} from '@redux/slices/news.slice';
import {resetOnboarding} from '@redux/slices/onboarding.slice';
import {resetTokens} from '@redux/slices/tokens.slice';
import {resetUser} from '@redux/slices/user.slice';
import {resetWallet} from '@redux/slices/wallet.slice';

const useDisconnect = () => {
  const dispatch = useAppDispatch();
  const disconnect = async () => {
    return new Promise(resolve => {
      dispatch(resetWallet());
      dispatch(resetTokens());
      dispatch(resetNews());
      dispatch(resetUser());
      dispatch(resetOnboarding());
      resolve(true);
    });
  };

  return disconnect;
};

export default useDisconnect;
