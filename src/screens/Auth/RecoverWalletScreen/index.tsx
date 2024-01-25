import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../../screens/screens';
import RecoverWalletScreen from './ChooseRecovery';
import SecurityTipsScreen from '../common/SecurityTipsScreen';
import InsertPassPhraseScreen from './InsertPassPhrase';
import SecureWalletScreen from '../common/SecureWallet';
import SuccessScreen from '../common/SuccessScreen';

const RecoverWalletStack = createNativeStackNavigator();

const RecoverWalletFlow = () => {
  return (
    <RecoverWalletStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RecoverWalletStack.Screen
        name={SCREENS.SECURITY_TIPS_SCREEN}
        component={SecurityTipsScreen}
      />
      <RecoverWalletStack.Screen
        name={SCREENS.RECOVER_WALLET_SCREEN}
        component={RecoverWalletScreen}
      />
      <RecoverWalletStack.Screen
        name={SCREENS.INSERT_PASSPHRASE_SCREEN}
        component={InsertPassPhraseScreen}
      />
      <RecoverWalletStack.Screen
        name={SCREENS.SECURE_RECOVERED_SCREEN}
        component={SecureWalletScreen}
      />
      <RecoverWalletStack.Screen
        name={SCREENS.COMPLETED_RECOVERY_SCREEN}
        component={SuccessScreen}
      />
    </RecoverWalletStack.Navigator>
  );
};

export default RecoverWalletFlow;
