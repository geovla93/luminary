import React from 'react';
import {Typography} from '@ui/core/components';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {IToken} from '@itypes/token';
import {formatBalance} from '@utils/displayNumbers';

interface ITokenItem {
  item: IToken;
  onPress: (token: IToken) => void;
}

const TokenItem = ({item, onPress}: ITokenItem) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(item)}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.tokenImage}
          source={{uri: item.image} || require('@assets/logo.png')}
        />
      </View>
      <View style={styles.tokenInfo}>
        <Typography variant="bodyLarge">{item.name}</Typography>
        <Typography variant="bodyMedium">
          {formatBalance(item.balance, {
            maxFractionDigits: 4,
          })}{' '}
          {item.symbol.toUpperCase()}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

TokenItem.defaultProps = {
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
  tokenInfo: {
    marginLeft: 10,
    flexGrow: 1,
  },
  tokenImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
});

export default TokenItem;
