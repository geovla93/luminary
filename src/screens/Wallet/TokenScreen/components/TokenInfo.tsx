import React from 'react';
import useApplication from '@hooks/useApplication';
import {Typography} from '@ui/core/components';
import {View, Image, StyleSheet} from 'react-native';
import {colors} from '@ui/core/theme';

const TokenInfo = ({token}: any) => {
  const {balanceDisplay} = useApplication();
  return (
    <View style={styles.root}>
      <View style={styles.tokenNameContainer}>
        <Typography variant="titleLarge" sx={{fontWeight: 'bold'}}>
          {token.symbol.toUpperCase()}
        </Typography>
        <Typography variant="bodySmall" sx={{marginTop: 10}}>
          {balanceDisplay(token.balance)} {token.symbol.toUpperCase()}
        </Typography>
      </View>
      <View style={styles.tokenImageContainer}>
        <Image
          style={styles.tokenLogo}
          source={{
            uri: token.image,
          }}
        />
        <Image source={{uri: token.chainImage}} style={styles.chainLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  tokenNameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tokenImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chainLogo: {
    width: 15,
    height: 15,
    right: -3,
    bottom: -3,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: colors.backdrop,
  },
});

export default TokenInfo;
