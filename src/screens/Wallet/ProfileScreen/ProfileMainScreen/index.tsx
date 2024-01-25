/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Typography} from '@ui/core/components';
import SquareButton from 'src/ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import {Avatar, IconButton, List, useTheme} from 'react-native-paper';
import Paper from '@components/Paper';
import DisconnectWallet from '@components/DisconnectWallet';
import useDisconnect from '@hooks/useDisconnect';
import {SCREENS} from '@screens/screens';
import {useIntl} from 'react-intl';
import HelpIcon from '@ui/core/Icons/HelpIcon';
import InfoIcon from '@ui/core/Icons/InfoIcon';
import WalletConnectIcon from '@ui/core/Icons/WalletConnectIcon';
import LanguageIcon from '@ui/core/Icons/LanguageIcon';
import SecurityPhraseIcon from '@ui/core/Icons/RecoveryPhraseIcon';
import SecurityIcon from '@ui/core/Icons/SecurityIcon';
import NotificationsIcon from '@ui/core/Icons/NotificationsIcon';
import LogoutIcon from '@ui/core/Icons/LogoutIcon';
import XTwitterIcon from '@ui/core/Icons/XTwitterIcon';
import TelegramIcon from '@ui/core/Icons/TelegramIcon';
import YoutubeIcon from '@ui/core/Icons/YoutubeIcon';
import InstagramIcon from 'src/ui/core/Icons/InstagramIcon';
import LinkedInIcon from '@ui/core/Icons/LinkedInIcon';
import {colors} from '@ui/core/theme';

const ProfileMainScreen = () => {
  const navigation = useNavigation<any>();
  const disconnect = useDisconnect();
  const {formatMessage} = useIntl();
  const [disconnecting, setDisconnecting] = useState(false);
  const theme = useTheme();

  const handleDisconnect = async () => {
    await disconnect();
    setDisconnecting(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={80}
            style={{backgroundColor: theme.colors.tertiary}}
            source={require('./logo.png')}
          />
          <View style={styles.hero}>
            <Typography variant="titleMedium">@iluminary</Typography>
            <IconButton
              onPress={() => console.log('Edit herotag')}
              icon="pencil"
              size={18}
            />
          </View>
        </View>
        <View style={styles.infoContent}>
          <Paper sx={styles.card}>
            <Image
              source={require('@assets/card-icon.png')}
              style={{width: 49, height: 49}}
            />
            <Typography
              sx={{
                fontWeight: 'bold',
                marginTop: 5,
                color: 'white',
                fontSize: 16,
              }}>
              {formatMessage({id: 'protected'})}
            </Typography>
            <Typography
              sx={{
                marginTop: 5,
                color: '#CFC5B4',
                fontSize: 12,
                fontFamily: 'Roboto-Medium',
              }}>
              {formatMessage({id: 'protected_description'})}
            </Typography>
          </Paper>
          <Paper sx={styles.card}>
            <Image
              source={require('@assets/qr-icon.png')}
              style={{width: 49, height: 49}}
            />
            <Typography sx={{fontWeight: 'bold', marginTop: 10}}>
              {formatMessage({id: 'invite_friends'})}
            </Typography>
            <Typography sx={{marginTop: 5, color: '#CFC5B4', fontSize: 12}}>
              {formatMessage({id: 'invite_description'})}
            </Typography>
          </Paper>
        </View>
        <View style={styles.privacy}>
          <Paper sx={styles.card}>
            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              title={formatMessage({id: 'help'})}
              onPress={() => console.log('help')}
              left={() => <HelpIcon />}
            />
            <List.Item
              style={{paddingLeft: 5}}
              title={formatMessage({id: 'about'})}
              onPress={() => console.log('about')}
              left={() => <InfoIcon />}
            />
            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              onPress={() =>
                navigation.navigate(SCREENS.APP_SETTINGS_WALLET_CONNECT)
              }
              title={formatMessage({id: 'wallet_connect'})}
              left={() => <WalletConnectIcon />}
            />
            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              title={formatMessage({id: 'language'})}
              onPress={() => navigation.navigate(SCREENS.APP_SETTINGS_LANGUAGE)}
              left={() => <LanguageIcon />}
            />
          </Paper>
        </View>
        <View style={styles.privacy}>
          <Paper sx={styles.card}>
            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              title={formatMessage({id: 'security_and_privacy'})}
              onPress={() => navigation.navigate(SCREENS.APP_SETTINGS_SECURITY)}
              left={() => <SecurityIcon />}
            />
            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              title={formatMessage({id: 'recovery_phrase_backup'})}
              onPress={() =>
                navigation.navigate(SCREENS.APP_SETTINGS_RECOVERY_BACKUP)
              }
              left={() => <SecurityPhraseIcon />}
            />
            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              onPress={() =>
                navigation.navigate(SCREENS.APP_SETTINGS_NOTIFICATIONS)
              }
              title={formatMessage({id: 'notifications'})}
              left={() => <NotificationsIcon />}
            />

            <List.Item
              style={{paddingLeft: 5}}
              titleStyle={styles.itemTitle}
              title={formatMessage({id: 'disconnect_wallet'})}
              onPress={() => setDisconnecting(true)}
              left={() => <LogoutIcon />}
            />
          </Paper>
        </View>
        <DisconnectWallet
          visible={disconnecting}
          hideDialog={() => setDisconnecting(false)}
          onConfirm={handleDisconnect}
        />

        <View style={styles.socialWrapper}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://twitter.com/iLuminaryAI')}>
            <XTwitterIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://t.me/iLuminaryAI/1')}>
            <TelegramIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() =>
              Linking.openURL('https://www.youtube.com/@iluminaryai')
            }>
            <YoutubeIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() =>
              Linking.openURL('https://www.instagram.com/iluminaryai/')
            }>
            <InstagramIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() =>
              Linking.openURL('https://www.linkedin.com/company/iluminaryai/')
            }>
            <LinkedInIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoContent: {
    marginTop: 20,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
  },
  privacy: {
    marginTop: 20,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  socialWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  socialButton: {
    backgroundColor: '#1E1B16',
    padding: 10,
    borderRadius: 12,
  },
});

export default ProfileMainScreen;
