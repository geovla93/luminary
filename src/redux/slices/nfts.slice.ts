import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Blockchain} from '../../types/blockchain';
import {IBlockchainCollections} from '@itypes/nfts';

export interface INFTsState {
  loading: boolean;
  search: string;
  blockchain: Blockchain; // filter by blockchain
  collections: IBlockchainCollections;
}

const initialState: INFTsState = {
  loading: true,
  search: '',
  blockchain: Blockchain.BNB,
  collections: {} as IBlockchainCollections,
};

const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNFTLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setNFTSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setNFTBlockchain(state, action: PayloadAction<Blockchain>) {
      state.blockchain = action.payload;
    },
    setNFTCollections(state, action: PayloadAction<IBlockchainCollections>) {
      const chains = Object.keys(action.payload) as Blockchain[];
      const nftCollections: IBlockchainCollections = {
        ...state.collections,
      };
      for (const chain of chains) {
        if (!nftCollections[chain]) {
          nftCollections[chain] = [];
        }
        for (const collection of action.payload[chain]) {
          const existingCollection = nftCollections[chain].find(
            c => c.uuid === collection.uuid,
          );
          if (!existingCollection) {
            nftCollections[chain].push(collection);
          }
        }
      }
      state.collections = nftCollections;
    },
    resetNfts(state) {
      state.loading = true;
      state.search = '';
      state.blockchain = Blockchain.BNB;
      state.collections = {} as IBlockchainCollections;
    },
  },
});

export const {
  setNFTLoading,
  setNFTSearch,
  setNFTCollections,
  setNFTBlockchain,
  resetNfts,
} = nftsSlice.actions;

export default nftsSlice.reducer;
