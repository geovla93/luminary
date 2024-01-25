import React, {useEffect, useState} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import NetworkItem from '@components/NetworksList/NetworkItem';
import {useNavigation} from '@react-navigation/native';
import SquareButton from 'src/ui/core/components/SquareButton';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import {useWalletContext} from '@hooks/useWalletContext';
import {Blockchain, IBlockchain} from '@itypes/blockchain';
import blockchains from 'src/blockchain';

const SwitchNetworkScreen = () => {
  const navigation = useNavigation<any>();
  const [chains, setChains] = useState<IBlockchain[]>([]);
  const {wallet, switchChain} = useWalletContext();
  const {formatMessage} = useIntl();

  useEffect(() => {
    if (wallet.chains && wallet.chains.length > 0) {
      const _chains = wallet.chains.map((c: Blockchain) => blockchains[c]);

      setChains(_chains);
    }
  }, [wallet.chains]);

  const handleSelectChain = (chain: Blockchain) => {
    // do some stuff
    switchChain(chain);
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          <Typography variant={'titleLarge'} sx={styles.text}>
            {formatMessage({id: 'switch_network'})}
          </Typography>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.networksContainer}>
          <VirtualizedList
            data={chains}
            getItem={(data, index) => data[index]}
            keyExtractor={(item, index) => index.toString()}
            getItemCount={coins => coins.length}
            renderItem={val => (
              <NetworkItem
                item={val.item}
                index={val.index}
                address={wallet.address}
                onPress={() => handleSelectChain(val.item.shortName)}
                selected={val.item.shortName === wallet.blockchain}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

export default SwitchNetworkScreen;

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
  networksContainer: {
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 22,
  },
});
