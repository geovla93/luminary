import React, {useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import useNfts from '@hooks/useNfts';
import NftChainPicker from './components/NftChainPicker';
import {IBlockchain} from '@itypes/blockchain';
import NftCollectionItem from './components/NftCollectionItem';
import EmptyListComponent from './components/ListEmpty';
import {useWalletContext} from '@hooks/useWalletContext';
import {useWalletAsUser} from '@hooks/useWalletAsUser';

const DigitalCollectibles = () => {
  const styles = useStyles();
  const {current} = useWalletContext();
  const {user} = useWalletAsUser();
  const {
    collections,
    blockchain,
    nftChains,
    getUserNfts,
    getChainCollection,
    switchChain,
  } = useNfts();
  const [userCollections, setUserCollections] = React.useState<any[]>([]);
  useEffect(() => {
    if (current && user.token) {
      getUserNfts();
    }
  }, [current, user.token]);

  useEffect(() => {
    const cols = getChainCollection();
    setUserCollections(cols);
  }, [collections, blockchain]);

  const handlePress = (chain: IBlockchain) => {
    switchChain(chain.shortName);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : undefined}>
        <NftChainPicker
          nftChains={nftChains}
          onPress={handlePress}
          selected={blockchain}
        />
        <View style={styles.content}>
          <FlatList
            data={userCollections}
            numColumns={2}
            ListEmptyComponent={EmptyListComponent}
            style={{
              width: '100%',
              minHeight: '100%',
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <NftCollectionItem collection={item} />}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 10,
    },
    content: {
      marginVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
    },
    item: {
      borderRadius: 10,
      marginVertical: 5,
      padding: 0,
      position: 'relative',
      backgroundColor: 'rgba(34, 31, 26, 1)',
      width: '48%',
    },
    shadow: {
      elevation: 2,
      shadowColor: 'rgba(236, 194, 72, 1)',
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      shadowOpacity: 0.3,
      backgroundColor: 'rgba(34, 31, 26, 1)',
    },
    fakeShadow: {
      elevation: 2,
      shadowColor: 'rgba(247, 230, 150, 1)',
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      shadowOpacity: 0.12,
    },
    itemImage: {
      width: '100%',
      height: 150,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      objectFit: 'cover',
    },
    chip: {
      position: 'absolute',
      top: 10,
      left: 10,
      borderRadius: 40,
      padding: 0,
      margin: 0,
      height: 25,
      backgroundColor: 'rgba(236, 194, 72, 1)',
    },
    chipText: {
      fontSize: 10,
      fontFamily: 'Roboto-Medium',
      lineHeight: 12,
      margin: 0,
      padding: 0,
    },
  });

export default DigitalCollectibles;
