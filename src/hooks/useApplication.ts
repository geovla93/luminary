import {ELOCALE} from '@itypes/locale';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {setLocale, setLocked} from '@redux/slices/application.slice';

const useApplication = () => {
  const dispatch = useAppDispatch();
  const application = useAppSelector(state => state.application);

  const setAppLocale = (_locale: ELOCALE) => {
    dispatch(setLocale(_locale));
  };

  const lockWallet = () => {
    dispatch(setLocked(true));
  };

  return {
    ...application,
    lockWallet,
    setAppLocale,
  };
};

export default useApplication;
