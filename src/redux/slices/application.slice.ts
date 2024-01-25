import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {detectLanguage, ELOCALE} from '../../types/locale';
import {CURRENCIES} from 'src/blockchain/currencies';

export interface IApplicationState {
  locale: ELOCALE;
  currency: CURRENCIES;
  hideBalances: boolean;
  lockedUntil: number | null;
  lockingMethod: 'pin' | 'biometrics' | 'none';
  bgTimestamp: number;
  locked: boolean;
  currentScreen: string | null;
  helpCenterLogin: boolean;
}

const initialState: IApplicationState = {
  locale: detectLanguage(),
  currency: CURRENCIES.USD,
  hideBalances: false,
  lockedUntil: null,
  lockingMethod: 'none',
  bgTimestamp: 0,
  locked: false,
  currentScreen: null,
  helpCenterLogin: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<ELOCALE>) {
      state.locale = action.payload;
    },
    setUnlockingMethod(
      state,
      action: PayloadAction<'pin' | 'biometrics' | 'none'>,
    ) {
      state.lockingMethod = action.payload;
    },
    setAppCloseTimestamp(state, action: PayloadAction<boolean>) {
      state.locked = action.payload;
      state.bgTimestamp = Date.now();
    },
    setCurrentScreen: (state, action: PayloadAction<string | null>) => {
      state.currentScreen = action.payload;
    },
    setHideBalances: (state, action: PayloadAction<boolean>) => {
      state.hideBalances = action.payload;
    },
    switchCurrency: (state, action: PayloadAction<CURRENCIES>) => {
      state.currency = action.payload;
    },
    setLockedUntil: (state, action: PayloadAction<number | null>) => {
      state.lockedUntil = action.payload;
    },
    setHelpCenterLogin: (state, action: PayloadAction<boolean>) => {
      state.helpCenterLogin = action.payload;
    },
    resetApplication: state => {
      state.currentScreen = null;
      // state.locale = ELOCALE.ENGLISH;
      state.lockingMethod = 'none';
      state.locked = false;
      state.bgTimestamp = 0;
      state.hideBalances = false;
      state.lockedUntil = null;
      state.helpCenterLogin = false;
    },
  },
});

export const {
  setLocale,
  setCurrentScreen,
  switchCurrency,
  setAppCloseTimestamp,
  setUnlockingMethod,
  setHideBalances,
  setLockedUntil,
  setHelpCenterLogin,
  resetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;
