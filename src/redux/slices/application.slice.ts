import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ELOCALE} from '../../types/locale';

export interface IApplicationState {
  locale: ELOCALE;
  lockingMethod: 'pin' | 'biometrics' | 'none';
  lastLocked: number;
  locked: boolean;
  currentScreen: string | null;
}

const initialState: IApplicationState = {
  locale: ELOCALE.ENGLISH,
  lockingMethod: 'none',
  lastLocked: 0,
  locked: false,
  currentScreen: null,
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
    setLocked(state, action: PayloadAction<boolean>) {
      state.locked = action.payload;
      state.lastLocked = Date.now();
    },
    setCurrentScreen: (state, action: PayloadAction<string | null>) => {
      state.currentScreen = action.payload;
    },
    setLastLocked: (
      state: IApplicationState,
      action: PayloadAction<number>,
    ) => {
      state.lastLocked = action.payload;
    },
    reset: state => {
      state.currentScreen = null;
      // state.locale = ELOCALE.ENGLISH;
      state.lockingMethod = 'none';
      state.locked = false;
    },
  },
});

export const {
  setLocale,
  setCurrentScreen,
  setLocked,
  setUnlockingMethod,
  setLastLocked,
} = applicationSlice.actions;

export default applicationSlice.reducer;
