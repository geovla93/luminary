import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BackupWalletScreen from './screens/BackupWallet';
import VerifyBackupScreen from './screens/ConfirmBackup';
import {SCREENS} from '@screens/screens';

const BackupWalletStack = createNativeStackNavigator();

const BackupWalletNavigator = () => {
  return (
    <BackupWalletStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BackupWalletStack.Screen
        name={SCREENS.APP_BACKUP_WALLET_SCREEN}
        component={BackupWalletScreen}
      />
      <BackupWalletStack.Screen
        name={SCREENS.APP_BACKUP_WALLET_VALIDATION}
        component={VerifyBackupScreen}
      />
    </BackupWalletStack.Navigator>
  );
};

export default BackupWalletNavigator;
