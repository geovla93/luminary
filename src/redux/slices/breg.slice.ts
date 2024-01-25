import {IMessage} from '@itypes/breg';
import {createSlice} from '@reduxjs/toolkit';
// {text: res.data.message, kind: 'text', type: 'received'},

export interface IBregState {
  displayBregSplash: boolean;
  messages: IMessage[];
}

const initialState: IBregState = {
  displayBregSplash: true,
  messages: [],
};

const bregSlice = createSlice({
  name: 'breg',
  initialState,
  reducers: {
    setDisplayBregSplash(state, action) {
      state.displayBregSplash = action.payload;
    },
    _addMessage(state, action) {
      if (!state.messages) {
        state.messages = [];
      }
      state.messages.push(action.payload);
    },
    resetBreg(state) {
      state.messages = [];
      state.displayBregSplash = true;
    },
  },
});

export const {setDisplayBregSplash, _addMessage, resetBreg} = bregSlice.actions;
export default bregSlice.reducer;
