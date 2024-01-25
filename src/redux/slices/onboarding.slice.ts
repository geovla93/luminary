import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type IOnboardingStateTypes = 'initial' | 'backedUp' | 'secured';

export interface IOnboardingState {
  state: IOnboardingStateTypes;
  completed: boolean;
}

const initialState: IOnboardingState = {
  state: 'initial',
  completed: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<IOnboardingStateTypes>) {
      state.state = action.payload;
    },

    setCompleted(state, action: PayloadAction<boolean>) {
      state.completed = action.payload;
    },
    resetOnboarding(state) {
      state.state = 'initial';
      state.completed = false;
    },
  },
});

export const {setState, setCompleted, resetOnboarding} =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
