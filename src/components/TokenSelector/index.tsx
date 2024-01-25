import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List} from 'react-native-paper';
import {IToken} from '@itypes/token';

type ITokenSelector = {
  token: IToken;
  onPress?: () => void;
};

const TokenSelector = ({onPress, token}: ITokenSelector) => {
  return (
    <List.Section style={styles.content}>
      <List.Item
        onPress={onPress}
        style={styles.root}
        titleStyle={styles.tokenTitle}
        title={token?.name}
        description={token?.symbol?.toUpperCase()}
        left={() => (
          <Image
            style={styles.tokenImage}
            source={{uri: token?.image} ?? require('./unknown.webp')}
          />
        )}
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
    padding: 5,
    borderRadius: 15,
  },
  content: {
    flex: 1,
    flexGrow: 1,
  },
  tokenImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tokenTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TokenSelector;
