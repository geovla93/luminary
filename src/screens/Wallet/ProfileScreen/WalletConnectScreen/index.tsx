import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import HeaderComponent from '@components/HeaderComponent';

const WalletConnectScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <HeaderComponent
          title="wallet_connect"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <Typography textAlign="center" mt={10} variant="titleMedium">
            {formatMessage({id: 'wallet_connect_no_connections'})}
          </Typography>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletConnectScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  headerText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
