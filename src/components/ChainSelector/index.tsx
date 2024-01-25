import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List} from 'react-native-paper';
import {useWalletContext} from '@hooks/useWalletContext';
import {formatAddress} from '@utils/functions';
import {IBlockchain} from '@itypes/blockchain';

type IChainSelector = {
  chain: IBlockchain;
  onPress?: () => void;
};

const ChainSelector = ({onPress, chain}: IChainSelector) => {
  const {wallet} = useWalletContext();
  return (
    <List.Section>
      <List.Item
        onPress={onPress}
        style={styles.root}
        title={chain?.name}
        description={formatAddress(wallet.address)}
        left={() => <Image style={styles.chainImage} source={chain.image} />}
        right={() => (
          <View style={styles.arrowContainer}>
            <Icon name="keyboard-arrow-down" size={20} color="white" />
          </View>
        )}
      />
    </List.Section>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#221F1A',
    padding: 10,
    borderRadius: 15,
  },
  chainImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChainSelector;
