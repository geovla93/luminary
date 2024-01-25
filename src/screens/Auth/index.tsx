import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateWalletFlow from './CreateWalletFlow';
import AuthRootScreen from './AuthRoot';
import {SCREENS} from '../screens';
import RecoverWalletFlow from './RecoverWalletScreen';
import TemporaryWalletProvider from '@hooks/useTemporaryWallet';

const AuthNavigator = createNativeStackNavigator();

const AuthNavigatorStack = () => {
  return (
    <TemporaryWalletProvider>
      <AuthNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthNavigator.Screen
          name={SCREENS.ONBOARDING_SCREEN}
          component={AuthRootScreen}
        />
        <AuthNavigator.Screen
          name={SCREENS.RECOVER_WALLET_ROOT_SCREEN}
          component={RecoverWalletFlow}
        />
        <AuthNavigator.Screen
          name={SCREENS.CREATE_WALLET_FLOW}
          component={CreateWalletFlow}
        />
      </AuthNavigator.Navigator>
    </TemporaryWalletProvider>
  );
};

export default AuthNavigatorStack;
