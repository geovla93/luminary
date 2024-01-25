// import {Blockchain} from '../../types/blockchain';
import {IContact} from '@itypes/contacts';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IContactsSlice {
  contacts: IContact[];
}

const initialState: IContactsSlice = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<IContact>) {
      state.contacts.push(action.payload);
    },
  },
});

export const {addContact} = contactsSlice.actions;

export default contactsSlice.reducer;
