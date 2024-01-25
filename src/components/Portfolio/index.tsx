import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {useIntl} from 'react-intl';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useTokens from '@hooks/useTokens';
import TokenItem from './components/TokenItem';
import TextField from '@ui/core/components/TextField';
import ProfileCard from '@components/ProfileCard';
import NewsSlider from '@components/NewsSlider';
import useNews from '@hooks/useNews';
import {colors} from '@ui/core/theme';
import EmptyState from '@components/EmptyState';
import {useAssetsToolbox} from '@components/TokenToolbox';

const Portfolio = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  const {filteredTokens, changeTokenSearch, setShowTokenToolbox} =
    useAssetsToolbox();
  const {tokenPrices, refreshPrices} = useTokens();
  const {featured, getFeaturedNews} = useNews();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getFeaturedNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refreshPrices();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={{marginHorizontal: 20, position: 'relative'}}>
      <ProfileCard />
      {featured.length > 0 && <NewsSlider items={featured} />}

      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.searchContainer}>
            <TextField
              placeholderTextColor={'#49454F'}
              sx={{color: colors.primary}}
              placeholder={formatMessage({id: 'search'})}
              onChangeText={(value: string) => changeTokenSearch(value)}
            />
          </View>
          <IconButton
            onPress={() => setShowTokenToolbox(true)}
            icon="dots-vertical"
            style={styles.more}
          />
        </View>

        <View style={styles.content}>
          {!filteredTokens || Object.keys(filteredTokens)?.length === 0 ? (
            <EmptyState
              title={formatMessage({id: 'search_no_tokens'})}
              description={formatMessage({id: 'search_no_tokens_description'})}
            />
          ) : (
            <FlatList
              style={{}}
              data={filteredTokens}
              keyExtractor={_item => _item.id}
              renderItem={val => (
                <TokenItem
                  key={val.index}
                  item={val.item}
                  tokenPrices={tokenPrices}
                  navigation={navigation}
                />
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderRadius: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  content: {
    marginTop: 10,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  more: {
    backgroundColor: '#1E1C1A',
    borderRadius: 15,
  },
});

export default Portfolio;
