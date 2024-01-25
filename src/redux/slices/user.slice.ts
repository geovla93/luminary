import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IUserState {
  alias: string | null;
  token: string | null;
  image: string | null;
  critical_notif: boolean;
  non_critical_notif: boolean;
  mode: 'created' | 'recovered' | 'none';
}
type NotifType = 'critical_notif' | 'non_critical_notif';

interface ISetNotif {
  type: NotifType;
  value: boolean;
}

const initialState: IUserState = {
  alias: null,
  token: null,
  image: null,
  critical_notif: true,
  non_critical_notif: true,
  mode: 'none',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserData(state, action: PayloadAction<IUserState>) {
      state.alias = action.payload.alias;
      state.image = action.payload.image;
      state.critical_notif = action.payload.critical_notif;
      state.non_critical_notif = action.payload.non_critical_notif;
    },
    setAlias(state, action: PayloadAction<string>) {
      state.alias = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setNotif(state, action: PayloadAction<ISetNotif>) {
      state[action.payload.type] = action.payload.value;
    },
    resetUser(state) {
      state.alias = null;
      state.token = null;
      state.image = null;
      state.critical_notif = true;
      state.non_critical_notif = true;
      state.mode = 'none';
    },
  },
});

export const {setToken, setAlias, setImage, setNotif, setUserData, resetUser} =
  userSlice.actions;

export default userSlice.reducer;
