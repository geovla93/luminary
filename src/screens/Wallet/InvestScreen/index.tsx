import React from 'react';
import {Image, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import {Button, Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

const InvestScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Platform.select({
          ios: 0,
          android: 10,
        }),
      }}>
      <View style={styles.root}>
        <View style={styles.header}>
          <SquareButton onPress={() => navigation.goBack()} />
          <Typography variant={'titleMedium'} sx={styles.pageTitle}>
            {formatMessage({id: 'invest_title', defaultMessage: 'Invest'})}
          </Typography>
        </View>
        <View>
          <Image source={require('@assets/invest.png')} />
        </View>
        <View>
          <Typography variant={'titleLarge'} sx={styles.bigTitle}>
            {formatMessage({
              id: 'invest_title_large',
              defaultMessage: 'Coming soon!',
            })}
          </Typography>
          <Typography variant={'titleLarge'} sx={styles.subtitle}>
            {formatMessage({
              id: 'invest_subtitle',
              defaultMessage: 'Get Ready for the Future of Crypto Investment',
            })}
          </Typography>
        </View>
        <Button sx={styles.button}>
          {formatMessage({id: 'stay_updated', defaultMessage: 'Stay Updated'})}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default InvestScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {},
  title: {},
  pageTitle: {
    marginLeft: 10,
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bigTitle: {
    fontSize: 45,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 50,
  },
  subtitle: {fontSize: 24, fontFamily: 'Roboto-Regular', color: '#fff'},
  button: {marginBottom: 20},
});
