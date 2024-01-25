import {useDispatch, useSelector} from 'react-redux';
import {setDisplayBregSplash} from '@redux/slices/breg.slice';

const useBreg = () => {
  const bregState = useSelector(state => state.breg);
  const dispatch = useDispatch();
  const hideBregSplash = () => {
    dispatch(setDisplayBregSplash(false));
  };

  return {
    hideBregSplash,
    displayBregSplash: bregState.displayBregSplash,
  };
};

export default useBreg;
