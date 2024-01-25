import {ELOCALE} from '@itypes/locale';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {
  setLocale,
  setAppCloseTimestamp,
  switchCurrency,
  setHideBalances,
  setLockedUntil,
  setHelpCenterLogin,
  setUnlockingMethod,
} from '@redux/slices/application.slice';
import {formatBalance, formatCurrency} from '@utils/displayNumbers';
import {CURRENCIES} from 'src/blockchain/currencies';
import {LOCK_PERIOD} from 'src/configs/security';

const useApplication = () => {
  const dispatch = useAppDispatch();
  const application = useAppSelector(state => state.application);

  const setAppLocale = (_locale: ELOCALE) => {
    dispatch(setLocale(_locale));
  };

  const setBackgroundTimestamp = () => {
    dispatch(setAppCloseTimestamp(true));
  };

  const setHelpLogin = (state: boolean) => {
    dispatch(setHelpCenterLogin(state));
  };

  const setAppCurrency = (currency: CURRENCIES) => {
    dispatch(switchCurrency(currency));
  };

  const changeBalanceDisplay = (state: boolean) => {
    dispatch(setHideBalances(state));
  };

  const setTheUnlockingMethod = (method: 'pin' | 'biometrics' | 'none') => {
    dispatch(setUnlockingMethod(method));
  };

  const priceDisplay = (price: number, options?: any) => {
    if (application.hideBalances && !options?.showCurrency) {
      return '*****';
    }
    if (isNaN(price) && !price) {
      price = 0;
    }

    const priceString = formatCurrency(price, application.currency, options);
    return priceString;
  };

  const lockOnWrongPin = (state: boolean) => {
    let lockedUntil = null;
    if (state) {
      const currentTimestamp = Date.now();
      lockedUntil = currentTimestamp + LOCK_PERIOD;
    }
    dispatch(setLockedUntil(lockedUntil));
  };

  const balanceDisplay = (balance: number, options?: any) => {
    if (application.hideBalances) {
      return '*****';
    }
    const balanceString = formatBalance(balance, options);
    return balanceString;
  };

  return {
    ...application,
    setBackgroundTimestamp,
    setAppLocale,
    setAppCurrency,
    changeBalanceDisplay,
    priceDisplay,
    balanceDisplay,
    lockOnWrongPin,
    setHelpLogin,
    setTheUnlockingMethod,
  };
};

export default useApplication;
