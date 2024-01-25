import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileMainScreen from './ProfileMainScreen';
import {SCREENS} from '@screens/screens';
import LanguageScreen from './LanguageScreen';
import NotificationsSettingsScreen from '@screens/Wallet/ProfileScreen/NotificationsSettingsScreen';
import RecoveryPhraseBackupScreen from '@screens/Wallet/ProfileScreen/RecoveryPhraseBackupScreen';
import SecuritySettingsScreen from '@screens/Wallet/ProfileScreen/SecuritySettingsScreen';
import WalletConnectScreen from '@screens/Wallet/ProfileScreen/WalletConnectScreen';

const ProfileStackNavigator = createNativeStackNavigator();

const ProfileScreens = () => {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_PROFILE_SCREEN}
        component={ProfileMainScreen}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_LANGUAGE}
        component={LanguageScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_NOTIFICATIONS}
        component={NotificationsSettingsScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_RECOVERY_BACKUP}
        component={RecoveryPhraseBackupScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_SECURITY}
        component={SecuritySettingsScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_WALLET_CONNECT}
        component={WalletConnectScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileScreens;
