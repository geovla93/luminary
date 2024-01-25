// import {Blockchain} from '../../types/blockchain';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IToken, SortTokenBy} from '@itypes/token';

interface ITokenIds {
  [key: string]: string[];
}

interface ITokenIdsPayload {
  walletKey: string;
  tokenIds: string[];
}

export interface ITokensState {
  loading: boolean;
  search: string;
  sortBy: SortTokenBy;
  tokens: any;
  tokenPrices: any;
  tokenIds: ITokenIds;
}

interface ITokenPrice {
  walletKey: string;
  tokens: IToken[];
}

interface IWalletTokenPayload {
  walletKey: string;
  tokens: IToken[];
}

const initialState: ITokensState = {
  loading: true,
  search: '',
  sortBy: 'price',
  tokens: {} as any,
  tokenPrices: {} as any,
  tokenIds: {} as ITokenIds,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokenLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTokenIds(state, action: PayloadAction<ITokenIdsPayload>) {
      state.tokenIds[action.payload.walletKey] = action.payload.tokenIds;
    },
    setTokenSort(state, action: PayloadAction<SortTokenBy>) {
      state.sortBy = action.payload;
    },
    setTokenSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setTokens(state, action: PayloadAction<IWalletTokenPayload>) {
      const newTokens = action.payload.tokens;
      const existingTokens = state.tokens[action.payload.walletKey];
      if (!existingTokens) {
        state.tokens[action.payload.walletKey] = [];
      }
      for (const token of newTokens) {
        const tokenIndex = state.tokens[action.payload.walletKey].findIndex(
          (t: any) => t.symbol === token.symbol,
        );

        if (!state.tokens[action.payload.walletKey]) {
          state.tokens[action.payload.walletKey] = [];
        }
        if (tokenIndex === -1) {
          state.tokens[action.payload.walletKey].push(token);
        } else {
          state.tokens[action.payload.walletKey][tokenIndex] = {
            ...state.tokens[tokenIndex],
            ...token,
          };
        }
      }
    },
    setTokenPrices(state, action: PayloadAction<ITokenPrice>) {
      const tokens: any = action.payload;
      state.tokenPrices = tokens;
    },
    resetTokens(state) {
      state.loading = true;
      state.tokens = {} as any;
      state.tokenPrices = {} as any;
      state.tokenIds = {} as ITokenIds;
      state.search = '';
      state.sortBy = 'price';
    },
  },
});

export const {
  setTokenLoading,
  setTokens,
  setTokenPrices,
  setTokenIds,
  resetTokens,
  setTokenSort,
  setTokenSearch,
} = tokensSlice.actions;

export default tokensSlice.reducer;
