import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import ProfileMainScreen from './ProfileMainScreen';
import {SCREENS} from '@screens/screens';
import LanguageScreen from './LanguageScreen';
import NotificationsSettingsScreen from '@screens/Wallet/ProfileScreen/NotificationsSettingsScreen';
import RecoveryPhraseBackupScreen from '@screens/Wallet/ProfileScreen/RecoveryPhraseBackupScreen';
import SecuritySettingsScreen from '@screens/Wallet/ProfileScreen/SecuritySettingsScreen';
import WalletConnectScreen from '@screens/Wallet/ProfileScreen/WalletConnectScreen';
import DisconnectWalletScreen from '../DisconnectWalletScreen';
import HelpScreen from '@screens/Wallet/ProfileScreen/HelpScreen';
import Intercom from '@intercom/intercom-react-native';
import {useWalletContext} from '@hooks/useWalletContext';
import useApplication from '@hooks/useApplication';
import ChangePinScreen from '@screens/Wallet/ProfileScreen/ChangePinScreen';

const ProfileStackNavigator = createNativeStackNavigator();

const ProfileScreens = () => {
  const {wallet} = useWalletContext();
  const {setHelpLogin, helpCenterLogin} = useApplication();

  useEffect(() => {
    if (wallet.address && !helpCenterLogin) {
      Intercom.loginUserWithUserAttributes({
        email: wallet.address,
      });
      setHelpLogin(true);
    }
  }, [wallet.address, helpCenterLogin]);

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
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_RECOVERY_BACKUP}
        component={RecoveryPhraseBackupScreen}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_SECURITY}
        component={SecuritySettingsScreen}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_SETTINGS_WALLET_CONNECT}
        component={WalletConnectScreen}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_DISCONNECT_WALLET_SCREEN}
        component={DisconnectWalletScreen}
      />
      <ProfileStackNavigator.Screen
        name={SCREENS.APP_HELP_SCREEN}
        component={HelpScreen}
      />

      <ProfileStackNavigator.Screen
        name={SCREENS.APP_CHANGE_PIN_SCREEN}
        component={ChangePinScreen}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileScreens;
