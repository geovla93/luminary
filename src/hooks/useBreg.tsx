import {useDispatch} from 'react-redux';
import {_addMessage, setDisplayBregSplash} from '@redux/slices/breg.slice';
import {useAppSelector} from '@redux/hook';
import useAxios from 'src/api/useAxios';
import {useWalletContext} from './useWalletContext';
import {IMessage} from '@itypes/breg';

const useBreg = () => {
  const {messages, displayBregSplash} = useAppSelector(state => state.breg);
  const {mainWalletAddress} = useWalletContext();
  const axios = useAxios();
  const dispatch = useDispatch();
  const hideBregSplash = () => {
    dispatch(setDisplayBregSplash(false));
  };

  const addMessage = (message: IMessage) => {
    dispatch(_addMessage(message));
  };

  const askBreg = (message: string, mode: 'audio' | 'text') => {
    return axios.post('/breg/prompt', {
      address: mainWalletAddress,
      message,
      mode,
    });
  };

  return {
    messages: messages || [],
    displayBregSplash,
    hideBregSplash,
    askBreg,
    addMessage,
  };
};

export default useBreg;
