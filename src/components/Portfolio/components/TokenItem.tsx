import React from 'react';
import useApplication from '@hooks/useApplication';
import {SCREENS} from '@screens/screens';
import {Typography} from '@ui/core/components';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

const TokenItem = ({item, tokenPrices, navigation}: any) => {
  const {priceDisplay, balanceDisplay, currency} = useApplication();
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
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.logo}
          />
          {/* {item.type !== 'NATIVE' && ( */}
          <Image source={{uri: item.chainImage}} style={styles.chainLogo} />
          {/* )} */}
        </View>
        <View style={styles.tokenData}>
          <View style={styles.titleAndChange}>
            <Typography sx={{fontWeight: 'bold', fontFamily: 'Roboto-Medium'}}>
              {item.symbol.toUpperCase()}
            </Typography>
            {priceData?.usd_24h_change !== undefined && (
              <View style={styles.change}>
                <Typography
                  sx={{
                    color:
                      priceData?.usd_24h_change >= 0 ? '#4DEF7A' : '#e25241',
                    fontWeight: '600',
                    textAlign: 'right',
                    fontSize: 11,
                  }}>
                  {priceData?.usd_24h_change >= 0 ? '+' : ''}
                  {priceData?.usd_24h_change?.toFixed(2)}%
                </Typography>
              </View>
            )}
          </View>
          <Typography variant="titleSmall" sx={styles.currentPrice}>
            {priceDisplay(priceData[currency], {showCurrency: true})}
          </Typography>
        </View>
      </View>

      <View style={styles.itemHoldings}>
        <Typography sx={styles.price}>
          {priceDisplay(item.balance * priceData.usd)}
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            textAlign: 'right',
            fontSize: 12,
          }}>
          {balanceDisplay(item.balance, {
            maxFractionDigits: 3,
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
    marginVertical: 5,
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
    width: 15,
    height: 15,
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
