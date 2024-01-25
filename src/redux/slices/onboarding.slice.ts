import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type IOnboardingStateTypes =
  | 'initial'
  | 'creating'
  | 'loading'
  | 'recovering'
  | 'created'
  | 'recovered';

export interface IOnboardingState {
  state: IOnboardingStateTypes;
  backedUp: boolean;
  secured: boolean;
  completed: boolean;
}

const initialState: IOnboardingState = {
  state: 'initial',
  backedUp: false,
  secured: false,
  completed: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<IOnboardingStateTypes>) {
      state.state = action.payload;
    },
    setBackedUp(state, action: PayloadAction<boolean>) {
      state.backedUp = action.payload;
    },
    setSecured(state, action: PayloadAction<boolean>) {
      state.secured = action.payload;
    },
    setCompleted(state, action: PayloadAction<boolean>) {
      state.completed = action.payload;
    },
    resetOnboarding(state) {
      state.state = 'initial';
      state.backedUp = false;
      state.secured = false;
      state.completed = false;
    },
  },
});

export const {
  setState,
  setBackedUp,
  setSecured,
  setCompleted,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
