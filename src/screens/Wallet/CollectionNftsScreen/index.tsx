import React, {useEffect, useCallback} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  // View,
} from 'react-native';
import useNfts from '@hooks/useNfts';
import NftItem from '@components/NftItem';
import HeaderComponent from '@components/HeaderComponent';
import {SCREENS} from '@screens/screens';
import {ActivityIndicator} from 'react-native-paper';
import EmptyCollection from './components/EmptyCollection';
import {
  clearTimeout,
  setTimeout,
} from '@testing-library/react-native/build/helpers/timers';

const CollectionNftsScreen = ({navigation, route}: any) => {
  const {collection} = route.params;
  const {getAddressNfts, getCollectionNfts, getCollectionBalance} = useNfts();
  const [balance, setBalance] = React.useState<any>(0);
  const [preview, setPreview] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [nfts, setNfts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const _balance = await getCollectionBalance(collection.sc_address);
      setBalance(Number(_balance));
    };
    fetchBalance();
  }, []);

  const fetchNfts = async () => {
    setLoading(true);
    if (preview) {
      getCollectionNfts(collection.sc_address, page, 10)
        .then((res: any) => {
          setNfts([...nfts, ...res]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      getAddressNfts(collection.sc_address, page, 10)
        .then((res: any) => {
          setNfts([...nfts, ...res]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    let loadingTimeout: any = null;
    if (balance > 0 || preview) {
      fetchNfts();
    } else {
      loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 300);
    }
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [page, preview, balance]);

  const handleNextPage = useCallback(() => {
    if (!loading) {
      setPage(page + 1);
    }
  }, [page, loading]);

  const handlePress = (nft: any) => {
    navigation.navigate(SCREENS.APP_NFT_SCREEN, {
      nft,
      collection,
      preview,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.flex}>
        <HeaderComponent
          onBack={() => navigation.goBack()}
          text={collection.name}
        />
        {balance === 0 && !preview && !loading ? (
          <EmptyCollection onViewCollection={() => setPreview(true)} />
        ) : (
          <FlatList
            numColumns={2}
            data={nfts}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              loading ? <ActivityIndicator style={{marginTop: 150}} /> : null
            }
            onEndReached={handleNextPage}
            renderItem={({item}) => (
              <NftItem onPress={() => handlePress(item)} nft={item} />
            )}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  list: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default CollectionNftsScreen;
