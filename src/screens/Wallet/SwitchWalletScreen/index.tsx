import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useWalletContext} from '@hooks/useWalletContext';
import {FlatList} from 'react-native';
import WalletItem from './components/WalletItem';
import HeaderComponent from '@components/HeaderComponent';

const SwitchWalletScreen = () => {
  const navigation = useNavigation<any>();
  const {walletPairs} = useWalletContext();

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
      <HeaderComponent
        title={'select_wallet'}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
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
  },
  title: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  content: {
    flex: 1,
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
