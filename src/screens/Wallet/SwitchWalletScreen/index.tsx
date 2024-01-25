import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import SquareButton from 'src/ui/core/components/SquareButton';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import {useWalletContext} from '@hooks/useWalletContext';
import {FlatList} from 'react-native';
import WalletItem from './components/WalletItem';

const SwitchWalletScreen = () => {
  const {formatMessage} = useIntl();
  const navigation = useNavigation<any>();
  const {walletPairs, current} = useWalletContext();

  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    if (walletPairs) {
      // wallets array
      const _wallets = Object.keys(walletPairs).map((key: string) => {
        return walletPairs[key];
      });
      setWallets(_wallets);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.title}>
          <View />
          <Typography variant={'titleLarge'} sx={styles.text}>
            {formatMessage({id: 'select_wallet'})}
          </Typography>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.content}>
          <FlatList
            data={wallets}
            renderItem={({item}) => (
              <WalletItem item={item} onPress={() => {}} />
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SwitchWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.inverseOnSurface,
  },
  title: {
    backgroundColor: colors.inverseOnSurface,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    shadowColor: 'black',
    shadowOffset: {height: -3, width: 3},
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 22,
  },
});
