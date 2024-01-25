import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import applicationSlice from './slices/application.slice';
import walletSlice from './slices/wallet.slice';
import onboardingSlice from './slices/onboarding.slice';
import tokensSlice from './slices/tokens.slice';
import newsSlice from './slices/news.slice';
import userSlice from './slices/user.slice';
import dappsSlice from './slices/dapps.slice';
import contactsSlice from './slices/contacts.slice';
import bregSlice from '@redux/slices/breg.slice';

export const rootReducer = combineReducers({
  application: applicationSlice,
  onboarding: onboardingSlice,
  wallet: walletSlice,
  news: newsSlice,
  tokens: tokensSlice,
  user: userSlice,
  dapps: dappsSlice,
  contacts: contactsSlice,
  breg: bregSlice,
});

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
