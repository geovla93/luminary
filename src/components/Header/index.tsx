import React from 'react';
import {Typography} from '@ui/core/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, MD3Theme, useTheme} from 'react-native-paper';
import SendMessage from '@ui/core/Icons/SendMessage';
import BellIcon from '@ui/core/Icons/BellIcon';
import ScanQrIcon from '@ui/core/Icons/ScanQrIcon';
import {SCREENS} from '@screens/screens';
import {useNavigation} from '@react-navigation/native';
// import {useIntl} from 'react-intl';
import {useWalletContext} from '@hooks/useWalletContext';

const Header = () => {
  const theme = useTheme();
  // const {formatMessage} = useIntl();
  const styles = useStyles(theme);
  const navigation = useNavigation<any>();
  const {wallet} = useWalletContext();
  const [username] = React.useState('iluminary');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.APP_PROFILE_ROOT_SCREEN)}
        style={styles.avatarContainer}>
        <Avatar.Image
          size={40}
          style={{backgroundColor: theme.colors.tertiary}}
          source={require('./logo.png')}
        />
      </TouchableOpacity>
      <View style={styles.addressContainer}>
        <Pressable
          onPress={() => navigation.navigate(SCREENS.APP_SELECT_WALLET_SCREEN)}
          style={styles.networkContainer}>
          <Typography sx={styles.title} variant="titleMedium">
            @{username}
          </Typography>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            style={{color: 'white', marginLeft: 5}}
          />
        </Pressable>
        <View style={styles.networkContainer}>
          <View style={styles.dot} />
          <Typography sx={{marginTop: 2}} variant="bodySmall">
            {wallet?.name}
          </Typography>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <ScanQrIcon size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate(SCREENS.APP_NOTIFICATIONS_SCREEN)}>
          <BellIcon size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate(SCREENS.APP_MESSENGER_ROOT_SCREEN)
          }>
          <SendMessage size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginHorizontal: 20,
      paddingBottom: 10,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
    },
    avatarContainer: {
      flex: 1,
    },
    addressContainer: {
      flex: 4,
    },
    networkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      display: 'flex',
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 10,
      backgroundColor: '#1062DD',
      marginRight: 5,
    },
    title: {
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionButton: {
      width: 30,
      height: 30,
      backgroundColor: theme.colors.tertiary,
      borderRadius: 12,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
    },
  });

export default Header;
