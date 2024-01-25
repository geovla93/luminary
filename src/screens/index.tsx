import React, {useEffect, useMemo, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppState} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ToastProvider} from 'react-native-toast-notifications';
import {useAppTheme} from '@ui/core/components/theme-provider';
import TabNavigator from './Wallet';
import AuthNavigatorStack from './Auth';
import {SCREENS} from './screens';

import MessengerFlowStack from './Wallet/Messenger';
import SwitchNetworkScreen from './Wallet/SwitchNetworkScreen';
import ProfileScreens from './Wallet/ProfileScreen';
import TokenScreen from './Wallet/TokenScreen';
import SendCryptoScreen from './Wallet/SendCryptoScreen';
import ReceiveCryptoScreen from './Wallet/ReceiveCryptoScreen';
import WebScreen from './Wallet/WebScreen';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {setCurrentScreen} from '@redux/slices/application.slice';
import AudioManager from '@components/AudioManager';
import NotificationsScreen from '@screens/Wallet/NotificationsScreen';
import useApplication from '@hooks/useApplication';
import {usePinManager} from '@components/PinManagerProvider';
import PinManagerProvider from '@components/PinManagerProvider';
import ManageTokensScreen from './Wallet/ManageTokensScreen';
import SwitchWalletScreen from './Wallet/SwitchWalletScreen';
// import Testing from './Testing';

const MainNavigator = createNativeStackNavigator();

const UserNavigator = createNativeStackNavigator();

const UserNavigatorStack = () => {
  const appState = useRef('inactive');
  const {lastLocked} = useApplication();
  const {lockTheApp} = usePinManager();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
      if (nextAppState === 'active' && Date.now() - lastLocked > 1000 * 5) {
        // this is locking the wallet when the app was in background
        lockTheApp(() => {});
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [lastLocked]);

  return (
    <UserNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <UserNavigator.Screen
        name={SCREENS.APP_HOME_SCREEN}
        component={TabNavigator}
      />
      <UserNavigator.Screen
        name={SCREENS.SWITCH_NETWORK_SCREEN}
        component={SwitchNetworkScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_NOTIFICATIONS_SCREEN}
        component={NotificationsScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_MESSENGER_ROOT_SCREEN}
        component={MessengerFlowStack}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_PROFILE_ROOT_SCREEN}
        component={ProfileScreens}
        options={{
          headerShown: false,
          // gestureDirection: 'vertical',
        }}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_SEND_CRYPTO_SCREEN}
        component={SendCryptoScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_RECEIVE_CRYPTO_SCREEN}
        component={ReceiveCryptoScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_WEBVIEW_SCREEN}
        component={WebScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_TOKEN_SCREEN}
        component={TokenScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_MANAGE_TOKENS_SCREEN}
        component={ManageTokensScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_SELECT_WALLET_SCREEN}
        component={SwitchWalletScreen}
      />
    </UserNavigator.Navigator>
  );
};

const AppNavigator = () => {
  const {theme} = useAppTheme();
  const dispatch = useAppDispatch();
  const {current} = useAppSelector(state => state.wallet);
  const hasWallet = useMemo(() => !!current, [current]);
  const navigationRef = useRef<any>();
  const routeNameRef = useRef<any>();

  return (
    <ToastProvider>
      <AudioManager>
        <PinManagerProvider>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={async () => {
              // const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;
              dispatch(setCurrentScreen(currentRouteName));
              routeNameRef.current = currentRouteName;
            }}
            onReady={() => {
              if (navigationRef.current) {
                routeNameRef.current =
                  navigationRef.current.getCurrentRoute().name;
              }
            }}
            theme={theme}>
            <MainNavigator.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {},
              }}>
              {!hasWallet && (
                <MainNavigator.Screen
                  name={SCREENS.AUTH_ROOT_SCREEN}
                  component={AuthNavigatorStack}
                />
              )}
              {hasWallet && (
                <MainNavigator.Screen
                  name={SCREENS.APPLICATION_SCREEN}
                  component={UserNavigatorStack}
                />
              )}
            </MainNavigator.Navigator>
          </NavigationContainer>
        </PinManagerProvider>
      </AudioManager>
    </ToastProvider>
  );
};

export default AppNavigator;
