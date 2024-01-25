import React, {useMemo, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ToastProvider} from 'react-native-toast-notifications';
import {useAppTheme} from '@ui/core/components/theme-provider';
import TabNavigator from './Wallet';
import AuthNavigatorStack from './Auth';
import {SCREENS} from './screens';
import {setCurrentScreen} from '@redux/slices/application.slice';

import MessengerFlowStack from './Wallet/Messenger';
import SwitchNetworkScreen from './Wallet/SwitchNetworkScreen';
import ProfileScreens from './Wallet/ProfileScreen';
import TokenScreen from './Wallet/TokenScreen';
import SendCryptoScreen from './Wallet/SendCryptoScreen';
import ReceiveCryptoScreen from './Wallet/ReceiveCryptoScreen';
import WebScreen from './Wallet/WebScreen';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import NotificationsScreen from '@screens/Wallet/NotificationsScreen';
import ManageTokensScreen from './Wallet/ManageTokensScreen';
import SwitchWalletScreen from './Wallet/SwitchWalletScreen';
import SelectCurrencyScreen from './Wallet/SelectCurrencyScreen';
import EarnScreen from './Wallet/EarnScreen';
import WalletContextProvider from '@hooks/useWalletContext';
import BackupWalletNavigator from './Wallet/BackupWalletScreen';
import NftPreviewScreen from '@screens/Wallet/NftPreviewScreen';
import InvestScreen from '@screens/Wallet/InvestScreen';
import CollectionNftsScreen from './Wallet/CollectionNftsScreen';
import {PricesContextProvider} from '@hooks/useTokens';
import WalletAsUserProvider from '@hooks/useWalletAsUser';
import CreateUsernameScreen from './Wallet/CreateUsernameScreen';
// import SplashScreen from './SplashScreen';

const MainNavigator = createNativeStackNavigator();

const UserNavigator = createNativeStackNavigator();

const UserNavigatorStack = () => {
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
        name={SCREENS.APP_SELECT_CURRENCY_SCREEN}
        component={SelectCurrencyScreen}
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
      <UserNavigator.Screen
        name={SCREENS.APP_EARN_SCREEN}
        component={EarnScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_BACKUP_WALLET_SCREEN_ROOT}
        component={BackupWalletNavigator}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_NFT_SCREEN}
        component={NftPreviewScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_NFT_COLLECTION_SCREEN}
        component={CollectionNftsScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_INVEST_SCREEN}
        component={InvestScreen}
      />
      <UserNavigator.Screen
        name={SCREENS.APP_CREATE_USERNAME_SCREEN}
        component={CreateUsernameScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </UserNavigator.Navigator>
  );
};

const WrappedUserNavigatorStack = () => {
  return (
    <WalletContextProvider>
      <PricesContextProvider>
        <WalletAsUserProvider>
          <UserNavigatorStack />
        </WalletAsUserProvider>
      </PricesContextProvider>
    </WalletContextProvider>
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
      <NavigationContainer
        ref={navigationRef}
        onStateChange={async () => {
          // const previousRouteName = arouteNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          dispatch(setCurrentScreen(currentRouteName));
          routeNameRef.current = currentRouteName;
        }}
        onReady={() => {
          if (navigationRef.current) {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }
        }}
        theme={theme}>
        <MainNavigator.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {},
          }}>
          {/* <MainNavigator.Screen
            name={SCREENS.SPLASH_SCREEN}
            component={SplashScreen}
          /> */}
          {!hasWallet && (
            <MainNavigator.Screen
              name={SCREENS.AUTH_ROOT_SCREEN}
              component={AuthNavigatorStack}
            />
          )}
          {hasWallet && (
            <MainNavigator.Screen
              name={SCREENS.APPLICATION_SCREEN}
              component={WrappedUserNavigatorStack}
            />
          )}
        </MainNavigator.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default AppNavigator;
