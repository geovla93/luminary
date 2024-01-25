import {Typography} from '@ui/core/components';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Platform} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import Image from '@components/Image';
import {useIntl} from 'react-intl';

const EarnScreen = () => {
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
            {formatMessage({id: 'earn', defaultMessage: 'Earn'})}
          </Typography>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Image source={require('@assets/transaction.png')} />
          <Typography variant={'titleLarge'} sx={styles.bigTitle}>
            {formatMessage({
              id: 'earn_title',
              defaultMessage: 'Coming soon!',
            })}
          </Typography>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EarnScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageTitle: {
    marginLeft: 10,
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    fontWeight: 'bold',
  },
  root: {
    paddingHorizontal: 15,
  },
  bigTitle: {
    fontSize: 45,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 50,
  },
  subtitle: {fontSize: 24, fontFamily: 'Roboto-Regular', color: '#fff'},
});
