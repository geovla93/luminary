import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThemeProvider from '@ui/core/components/theme-provider';
import AppNavigator from './src/screens';
import {useAppSelector} from './src/redux/hook';
import {persistor, store} from './src/redux/store';
import {languages} from './src/i18n';
import WalletContextProvider from '@hooks/useWalletContext';
import WalletAsUserProvider from '@hooks/useWalletAsUser';

const AppWithLocale = () => {
  const {locale} = useAppSelector(state => state.application);

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={languages[locale]}>
      <AppNavigator />
    </IntlProvider>
  );
};

function App(): ReactElement {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WalletContextProvider>
            <ThemeProvider>
              <WalletAsUserProvider>
                <AppWithLocale />
              </WalletAsUserProvider>
            </ThemeProvider>
          </WalletContextProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
