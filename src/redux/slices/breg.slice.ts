import {createSlice} from '@reduxjs/toolkit';

export interface IBregState {
  displayBregSplash: boolean;
}

const initialState: IBregState = {
  displayBregSplash: true,
};

const bregSlice = createSlice({
  name: 'breg',
  initialState,
  reducers: {
    setDisplayBregSplash(state, action) {
      state.displayBregSplash = action.payload;
    },
  },
});

export const {setDisplayBregSplash} = bregSlice.actions;
export default bregSlice.reducer;
