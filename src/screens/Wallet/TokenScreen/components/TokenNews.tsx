import React, {useCallback, useState} from 'react';
import {RefreshControl, StyleSheet, View, VirtualizedList} from 'react-native';
import NewsCard from '@components/NewsCard';
import useNews from '@hooks/useNews';
import {useFocusEffect} from '@react-navigation/native';
import {NewsItem} from '@itypes/news';
import {useAudioManager} from '@components/AudioManager';

const TokenNews = ({symbol}: {symbol: string}) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const {openNews, getTokenNews} = useNews();
  const {translatedTitle} = useNews();
  const [refreshing, setRefreshing] = useState(false);
  const {playRefreshSound} = useAudioManager();

  // when the screen is focused, we are going to fetch the news
  useFocusEffect(
    useCallback(() => {
      getTokenNews(symbol).then(newsCallback);
    }, []),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    getTokenNews(symbol).then(newsCallback);
    playRefreshSound();
  };

  const newsCallback = useCallback((res: any) => {
    setRefreshing(false);
    setNews(res.data);
  }, []);

  return (
    <View style={styles.container}>
      <VirtualizedList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={styles.newsList}
        getItemCount={data => data.length}
        showsVerticalScrollIndicator={false}
        getItem={(data, index) => data[index]}
        renderItem={({item}: {item: any}) => (
          <NewsCard
            translatedTitle={translatedTitle}
            onPress={(url: string, id: number) => openNews(url, id)}
            item={item}
          />
        )}
        data={news}
        keyExtractor={(item, _index) => item?.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  screenTitle: {},
  searchInput: {
    flex: 1,
    height: 40,

    marginBottom: 10,
    borderRadius: 15,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  newsList: {
    marginBottom: 60,
  },
  newsPercentage: {
    marginVertical: 10,
  },
});

export default TokenNews;
