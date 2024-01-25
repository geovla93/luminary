import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWallet, IWalletPair} from '@itypes/wallet';

export interface IWalletState {
  state: 'initial' | 'ready';
  signature: string;
  current: string;
  mainWalletAddress: string;
  walletPairs: IWalletPair;
  processing: boolean;
}

const initialState: IWalletState = {
  state: 'initial',
  signature: '',
  current: '',
  mainWalletAddress: '',
  processing: false,
  walletPairs: {} as IWalletPair,
};

interface ISetWalletData {
  index: number;
  key: string;
  address: string;
  wallet: IWallet;
  signature: string;
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet(state, action: PayloadAction<ISetWalletData>) {
      state.state = 'ready';
      state.current = action.payload.key;
      if (Object.keys(state.walletPairs).length === 0) {
        state.mainWalletAddress = action.payload.address;
        action.payload.wallet.isMain = true;
        if (!action.payload.wallet.name) {
          action.payload.wallet.name = 'Main Wallet';
        }
        if (action.payload.signature) {
          state.signature = action.payload.signature;
        }
      }
      state.walletPairs[action.payload.key] = action.payload.wallet;
      state.processing = false;
    },
    setProcessing(state, action: PayloadAction<boolean>) {
      state.processing = action.payload;
    },
    setSignature(state, action: PayloadAction<string>) {
      state.signature = action.payload;
    },
    setTotals(state, action: PayloadAction<any>) {
      state.walletPairs[state.current].balance = action.payload;
    },
    setBackedUp(state, action: PayloadAction<boolean>) {
      state.walletPairs[state.current].backedUp = action.payload;
    },
    resetWallet(state) {
      state.state = 'initial';
      state.current = '';
      state.mainWalletAddress = '';
      state.signature = '';
      state.walletPairs = {};
    },
  },
});

export const {
  resetWallet,
  setSignature,
  addWallet,
  setProcessing,
  setTotals,
  setBackedUp,
} = walletSlice.actions;

export default walletSlice.reducer;
