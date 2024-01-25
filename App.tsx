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
import * as Sentry from '@sentry/react-native';
import AppMiddleware from '@components/AppMiddleware';
import PinManagerProvider from '@components/PinManagerProvider';
import AudioManager from '@components/AudioManager';
import OnboardingProvider from '@hooks/useOnboarding';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://57765d983ab6407c63e62d6eff14b801@o4506519534698496.ingest.sentry.io/4506519536271360',
    tracesSampleRate: 1.0,
  });
}

const AppWithLocale = () => {
  const {locale} = useAppSelector(state => state.application);

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={languages[locale]}>
      <AudioManager>
        <OnboardingProvider>
          <PinManagerProvider>
            <AppMiddleware>
              <AppNavigator />
            </AppMiddleware>
          </PinManagerProvider>
        </OnboardingProvider>
      </AudioManager>
    </IntlProvider>
  );
};

function App(): ReactElement {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <AppWithLocale />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
