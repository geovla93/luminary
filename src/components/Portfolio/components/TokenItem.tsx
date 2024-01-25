import {SCREENS} from '@screens/screens';
import {Typography} from '@ui/core/components';
import React from 'react';
import {useIntl} from 'react-intl';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const TokenItem = ({item, tokenPrices, navigation}: any) => {
  const {formatNumber} = useIntl();
  const priceData = tokenPrices[item.id] || {};
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(SCREENS.APP_TOKEN_SCREEN, {
          token: item,
        })
      }
      style={styles.itemContainer}>
      <View style={styles.itemName}>
        <View style={styles.logoContainer}>
          <Image source={{uri: item.image}} style={styles.logo} />
          {item.type !== 'NATIVE' && (
            <Image source={{uri: item.chainImage}} style={styles.chainLogo} />
          )}
        </View>
        <View style={styles.tokenData}>
          <View style={styles.titleAndChange}>
            <Typography sx={{fontWeight: 'bold', fontFamily: 'Roboto-Medium'}}>
              {item.symbol.toUpperCase()}
            </Typography>
            <View style={styles.change}>
              <Typography
                sx={{
                  color: priceData?.usd_24h_change >= 0 ? '#4DEF7A' : '#e25241',
                  fontWeight: '600',
                  textAlign: 'right',
                  fontSize: 11,
                }}>
                {priceData?.usd_24h_change >= 0 ? '+' : ''}
                {priceData?.usd_24h_change?.toFixed(2)}%
              </Typography>
            </View>
          </View>
          <Typography variant="titleSmall" sx={styles.currentPrice}>
            {formatNumber(priceData?.usd, {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            })}
          </Typography>
        </View>
      </View>

      <View style={styles.itemHoldings}>
        <Typography sx={styles.price}>
          {formatNumber(item.balance * priceData.usd, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            textAlign: 'right',
            fontSize: 12,
          }}>
          {formatNumber(item.balance, {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemHoldings: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  itemName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  titleAndChange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  change: {
    backgroundColor: '#1E1C1A',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 10,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },
  chainLogo: {
    width: 20,
    height: 20,
    right: -5,
    bottom: -5,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  tokenData: {
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  price: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 16,
  },
  currentPrice: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default TokenItem;
