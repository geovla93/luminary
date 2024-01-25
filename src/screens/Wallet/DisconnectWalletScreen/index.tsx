import React from 'react';
import HeaderComponent from '@components/HeaderComponent';
import {Button, Typography} from '@ui/core/components';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {useIntl} from 'react-intl';
import useDisconnect from '@hooks/useDisconnect';
import {usePinManager} from '@components/PinManagerProvider';

const DisconnectWalletScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const disconnect = useDisconnect();
  const {lockForPin} = usePinManager();
  const handleDisconnect = () => {
    lockForPin(() => {
      disconnect();
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        onBack={() => navigation.goBack()}
        title={'disconnect_wallet'}
      />
      <View style={styles.container}>
        <View style={styles.iconSection}>
          <Image source={require('@assets/logo-text.png')} />
        </View>
        <View style={styles.messageSection}>
          <Typography mb={20} variant="headlineMedium">
            {formatMessage({id: 'disconnect_wallet'})}
          </Typography>
          <View style={styles.info}>
            <Typography pb={10} variant="bodySmall">
              {formatMessage({id: 'important_info'})}
            </Typography>
            <Typography variant="bodySmall">
              {formatMessage({id: 'important_info_2'})}
            </Typography>
          </View>
        </View>
        <View style={styles.actionSection}>
          <Button
            size="medium"
            variant="contained"
            onPress={() => handleDisconnect()}
            sx={{marginBottom: 20}}>
            {formatMessage({id: 'delete_my_wallet'})}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  iconSection: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  messageSection: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info: {
    backgroundColor: '#1E1B16',
    padding: 20,
    borderRadius: 20,
  },
  actionSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default DisconnectWalletScreen;
