import {Typography} from '@ui/core/components';
import React from 'react';
import {useIntl} from 'react-intl';
import {View, Image, StyleSheet} from 'react-native';
const RecentTransactions = () => {
  const {formatMessage} = useIntl();
  return (
    <View style={style.root}>
      <Image source={require('../../assets/contacts.png')} />
      <Typography variant="bodyMedium" textAlign="center" fontWeight="bold">
        {formatMessage({id: 'no_recent_transfers'})}
      </Typography>
    </View>
  );
};

const style = StyleSheet.create({
  root: {},
});

export default RecentTransactions;
