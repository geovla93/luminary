import {Typography} from '@ui/core/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';

const Description = ({item}: any) => {
  return (
    <View style={styles.desc}>
      <View style={styles.walletKind}>
        <Typography variant="bodySmall">{item.type}</Typography>
      </View>
      <View style={styles.walletKind}>
        <Typography variant="bodySmall">
          {item.balance.balance.toFixed(2)} USD
        </Typography>
      </View>
    </View>
  );
};

const WalletItem = ({item, onPress}: any) => {
  console.log('item', item);
  return (
    <List.Item
      style={styles.root}
      title={`${item.name} - ${item.isMain ? 'PRIMARY' : ''}`}
      titleStyle={{fontWeight: 'bold'}}
      description={<Description item={item} />}
      onPress={onPress}
      left={props => <List.Icon {...props} icon="wallet" />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#15130E',
    borderRadius: 20,
  },
  walletKind: {
    backgroundColor: '#1E1B18',
    borderRadius: 20,
    marginTop: 15,
    padding: 5,
  },
  desc: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default WalletItem;
