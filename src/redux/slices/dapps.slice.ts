// import {Blockchain} from '../../types/blockchain';
import {IDapp} from '@itypes/dapps';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IDappsState {
  loading: boolean;
  favorite: number[];
  featured: IDapp[];
  hot: IDapp[];
  dapps: IDapp[];
}

interface IAllDapps {
  featured: IDapp[];
  hot: IDapp[];
  dapps: IDapp[];
}

const initialState: IDappsState = {
  loading: true,
  favorite: [],
  hot: [],
  featured: [],
  dapps: [],
};

const dappsSlice = createSlice({
  name: 'dapps',
  initialState,
  reducers: {
    setDappsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    _setDapps(state, action: PayloadAction<IDapp[]>) {
      state.dapps = action.payload;
      state.loading = false;
    },
    _setFeatured(state, action: PayloadAction<IDapp[]>) {
      state.featured = action.payload;
    },
    _setHot(state, action: PayloadAction<IDapp[]>) {
      state.hot = action.payload;
    },
    _setAll(state, action: PayloadAction<IAllDapps>) {
      state.featured = action.payload.featured;
      state.hot = action.payload.hot;
      state.dapps = action.payload.dapps;
      state.loading = false;
    },
    resetDapps(state) {
      state.loading = true;
      state.featured = [];
      state.dapps = [];
      state.favorite = [];
      state.hot = [];
    },
  },
});

export const {
  _setDapps,
  _setFeatured,
  setDappsLoading,
  _setAll,
  _setHot,
  resetDapps,
} = dappsSlice.actions;

export default dappsSlice.reducer;
