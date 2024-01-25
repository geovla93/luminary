import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackupWalletScreen from './BackupWalletScreen';
import {SCREENS} from '../../../screens/screens';
import SuccessScreen from '../common/SuccessScreen';
import SecurityTipsScreen from '../common/SecurityTipsScreen';
import VerifyBackupScreen from './VerifyBackupScreen';
import SecureWalletScreen from '../common/SecureWallet';

const CreateWalletStack = createNativeStackNavigator();

const CreateWalletFlow = () => {
  return (
    <CreateWalletStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CreateWalletStack.Screen
        name={SCREENS.SECURITY_TIPS_CREATE_SCREEN}
        component={SecurityTipsScreen}
      />
      <CreateWalletStack.Screen
        name={SCREENS.BACKUP_WALLET_SCREEN}
        component={BackupWalletScreen}
      />
      <CreateWalletStack.Screen
        name={SCREENS.VERIFY_BACKUP_SCREEN}
        component={VerifyBackupScreen}
      />
      <CreateWalletStack.Screen
        name={SCREENS.SECURE_CREATED_SCREEN}
        component={SecureWalletScreen}
      />
      <CreateWalletStack.Screen
        name={SCREENS.COMPLETED_WALLET_SCREEN}
        component={SuccessScreen}
      />
    </CreateWalletStack.Navigator>
  );
};

export default CreateWalletFlow;
