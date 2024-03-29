import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ChartType from '@ui/core/Icons/ChartType';
import SvgIconBtn from '@ui/core/components/SvgIconBtn';
import WebView from 'react-native-webview';
import {useIntl} from 'react-intl';
import useApplication from '@hooks/useApplication';
import {colors} from '@ui/core/theme';

const TokenChart = ({token}: any) => {
  const {formatNumber, formatMessage} = useIntl();
  const {priceDisplay} = useApplication();

  const growing = token?.price?.usd_24h_change >= 0;
  if (!token) {
    return null;
  }

  const onShouldStartLoad = () => true;

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.chartHeader}>
        <Typography
          variant="headlineMedium"
          fontWeight="bold"
          sx={{marginBottom: 10}}>
          {priceDisplay(token.price.usd, {showCurrency: true})}
        </Typography>
        <SvgIconBtn icon={<ChartType />} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Typography variant="bodyMedium" fontWeight="bold">
          {formatNumber(token.balance, {
            maximumFractionDigits: 3,
          })}{' '}
          {token.symbol.toUpperCase()}
        </Typography>
        <View
          style={[
            styles.grow,
            {backgroundColor: growing ? 'green' : '#D32F2F'},
          ]}>
          <Typography variant="bodySmall">
            <Icon name={growing ? 'arrow-up' : 'arrow-down'} />{' '}
            {formatNumber(token?.price?.usd_24h_change, {
              maximumFractionDigits: 2,
            })}
            %
          </Typography>
        </View>
      </View>
      <View style={styles.webviewContainer}>
        <WebView
          containerStyle={{borderRadius: 10}}
          allowFileAccessFromFileURLs={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist={['*']}
          automaticallyAdjustContentInsets
          onShouldStartLoadWithRequest={onShouldStartLoad}
          source={{
            uri: `https://api.iluminary.app/services/trading-view?symbol=${token.symbol.toUpperCase()}USDT&interval=D&locale=ro`,
          }}
        />
      </View>
      <Typography
        variant="bodySmall"
        textAlign="center"
        sx={{marginVertical: 20, paddingHorizontal: 10}}>
        {formatMessage({id: 'under_chart_text'})}
      </Typography>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  grow: {
    color: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webviewContainer: {
    marginTop: 10,
    height: 200,
  },
  scrollViewStyle: {
    backgroundColor: colors.backdrop,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
  },
});

export default TokenChart;
