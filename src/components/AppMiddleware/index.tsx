import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {AppState} from 'react-native';
import LoadingScreen from '@components/LoadingScreen';
import WarningComponent from '@components/WarningComponent';

import {canRunSecurely} from '@utils/functions';
import {AppStateStatus} from '@utils/config';
import useApplication from '@hooks/useApplication';
import {useAppSelector} from '@redux/hook';
import {usePinManager} from '@components/PinManagerProvider';

const AppMiddlewareContext = createContext({});

type IApplicationDisplayState = 'loading' | 'warning' | 'app';

function AppMiddleware({children}: {children: React.ReactNode}) {
  const [appBg, appBgState] = useState<AppStateStatus>(
    AppState.currentState as AppStateStatus,
  );
  const {current} = useAppSelector(state => state.wallet);
  const [isFirstSessionRun, setIsFirstSessionRun] = useState(
    current ? true : false,
  );
  const [applicationDisplayState, setApplicationDisplayState] =
    useState<IApplicationDisplayState>('loading');
  const {bgTimestamp, setBackgroundTimestamp} = useApplication();
  const {lockTheApp} = usePinManager();

  const shouldValidatePin = useMemo(() => !!current, [current]);

  const [securityChecks, setSecurityChecks] = useState({
    isSecure: false,
    message: '',
    loaded: false,
  });

  // handle app state change
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      appBgState(() => nextAppState);
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [bgTimestamp]);

  // Security checks
  useEffect(() => {
    const _isSecure = canRunSecurely();
    setSecurityChecks({
      isSecure: _isSecure === true,
      message: typeof _isSecure === 'string' ? _isSecure : '',
      loaded: true,
    });
  }, []);

  useEffect(() => {
    const setAppDisplayStateToApp = () => {
      setApplicationDisplayState('app');
      setIsFirstSessionRun(false);
    };

    const lockAppIfNeeded = () => {
      if (new Date().getTime() - bgTimestamp > 5000 || isFirstSessionRun) {
        lockTheApp(setAppDisplayStateToApp);
      } else {
        setAppDisplayStateToApp();
      }
    };

    const isAppInBackground = () =>
      appBg === AppStateStatus.INACTIVE || appBg === AppStateStatus.BACKGROUND;

    const handleAppForeground = () => {
      if (securityChecks.loaded) {
        if (securityChecks.isSecure || __DEV__) {
          determineIfShouldLock();
        } else {
          setApplicationDisplayState('warning');
        }
      } else {
        setApplicationDisplayState('loading');
      }
    };

    const determineIfShouldLock = () => {
      if (shouldValidatePin) {
        lockAppIfNeeded();
      } else {
        setAppDisplayStateToApp();
      }
    };

    if (isAppInBackground()) {
      setApplicationDisplayState('loading');
      setBackgroundTimestamp();
    } else {
      handleAppForeground();
    }
  }, [securityChecks.isSecure, securityChecks.loaded, appBg]);

  if (applicationDisplayState === 'warning' && !__DEV__) {
    return <WarningComponent reason={securityChecks.message} />;
  }

  return (
    <AppMiddlewareContext.Provider value={{}}>
      {children}
      {applicationDisplayState === 'loading' && <LoadingScreen />}
    </AppMiddlewareContext.Provider>
  );
}

export const useAppMiddleware = () => {
  const context = useContext(AppMiddlewareContext);
  if (!context) {
    throw new Error('useAppMiddleware must be used within AppMiddleware');
  }
  return context;
};

export default AppMiddleware;
