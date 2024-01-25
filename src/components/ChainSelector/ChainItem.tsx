import {IBlockchain} from '@itypes/blockchain';
import {Typography} from '@ui/core/components';
import {formatAddress} from '@utils/functions';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

interface IChainItem {
  item: IBlockchain;
  onPress: (chain: IBlockchain) => void;
}

const ChainItem = ({item, onPress}: IChainItem) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(item)}>
      <View style={styles.imageContainer}>
        <Image style={styles.chainImage} source={item.image} />
      </View>
      <View style={styles.chainInfo}>
        <Typography variant="bodyLarge">{item.name}</Typography>
        <Typography variant="bodyMedium">
          {formatAddress(item.address as string)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

ChainItem.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  imageContainer: {},
  chainInfo: {
    marginLeft: 10,
    flexGrow: 1,
  },
  chainImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
});

export default ChainItem;
