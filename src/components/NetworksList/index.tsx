import React from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import NetworkItem from '@components/NetworksList/NetworkItem';

const networks = [
  {
    name: 'Ethereum Mainnet',
    address: '0x1234567890123456789012345678901234567890',
    image:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
  },
  {
    name: 'BnB Chain',
    address: '0x1234567890123456789012345678901234567890',
    image:
      'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
  },
  {
    name: 'Acria IntelliChain',
    address: '0x1234567890123456789012345678901234567890',
    image:
      'https://assets.coingecko.com/coins/images/28598/small/image002.png?1675131968',
  },
  {
    name: 'Polygon',
    address: '0x1234567890123456789012345678901234567890',
    image: 'https://iluminary.ai/wp-content/uploads/2023/08/logo_circle.png',
  },

  {
    name: 'Cardano',
    address: '0x1234567890123456789012345678901234567890',
    image:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
  },
];

const NetworksList = () => {
  return (
    <View style={styles.container}>
      <VirtualizedList
        data={networks}
        getItem={(data, index) => data[index]}
        keyExtractor={(item, index) => index.toString()}
        getItemCount={coins => coins.length}
        renderItem={val => <NetworkItem item={val.item} index={val.index} />}
      />
    </View>
  );
};

export default NetworksList;

const styles = StyleSheet.create({
  container: {},
});
