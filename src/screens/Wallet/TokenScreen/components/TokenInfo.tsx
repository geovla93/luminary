import {Typography} from '@ui/core/components';
import React from 'react';
import {useIntl} from 'react-intl';
import {View, Image, StyleSheet} from 'react-native';

const TokenInfo = ({token}: any) => {
  const {formatNumber} = useIntl();
  return (
    <View style={styles.root}>
      <View style={styles.tokenNameContainer}>
        <Typography variant="titleLarge" sx={{fontWeight: 'bold'}}>
          {token.symbol.toUpperCase()}
        </Typography>
        <Typography variant="bodySmall" sx={{marginTop: 10}}>
          {`${formatNumber(token.balance, {
            maximumFractionDigits: 3,
          })} ${token.symbol.toUpperCase()}`}
        </Typography>
      </View>
      <View style={styles.tokenImageContainer}>
        <Image
          style={{width: 40, height: 40}}
          source={{
            uri: token.image,
          }}
        />
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
  tokenImageContainer: {},
});

export default TokenInfo;
