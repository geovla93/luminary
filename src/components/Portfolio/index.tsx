import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useTokens from '@hooks/useTokens';
import TokenItem from './components/TokenItem';
import useNews from '@hooks/useNews';
import EmptyState from '@components/EmptyState';
import {useAssetsToolbox} from '@components/TokenToolbox';

import PortfolioSummary from './components/PortfolioSummary';
import {useAudioManager} from '@components/AudioManager';

const Portfolio = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  const {filteredTokens} = useAssetsToolbox();
  const [search, setSearch] = useState('');
  const [displayTokens, setDisplayTokens] = useState(filteredTokens);
  const {tokenPrices, refreshPrices, refreshBalances} = useTokens();
  const {getFeaturedNews} = useNews();
  const [refreshing, setRefreshing] = useState(false);
  const {playRefreshSound} = useAudioManager();

  useEffect(() => {
    getFeaturedNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refreshPrices();
    refreshBalances();
    playRefreshSound();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    if (search.length > 0) {
      const _tokens = filteredTokens.filter(
        token =>
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase()),
      );
      setDisplayTokens(_tokens);
    } else {
      setDisplayTokens(filteredTokens);
    }
  }, [search, filteredTokens]);

  return (
    <View style={styles.content}>
      <FlatList
        style={{minHeight: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={displayTokens}
        keyExtractor={_item => _item.id + _item.contractAddress + _item.chainId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <PortfolioSummary search={search} setSearch={setSearch} />
        }
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <EmptyState
            title={formatMessage({id: 'search_no_tokens'})}
            description={formatMessage({
              id: 'search_no_tokens_description',
            })}
          />
        )}
        renderItem={val => (
          <TokenItem
            key={val.index}
            item={val.item}
            tokenPrices={tokenPrices}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
  },
});

export default Portfolio;
