import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Typography} from '@ui/core/components';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import NewsCard from '@components/NewsCard';
import {useIntl} from 'react-intl';
import {TextInput} from 'react-native-paper';
import useNews from '@hooks/useNews';
import {useFocusEffect} from '@react-navigation/native';
import {NewsItem} from '@itypes/news';
import {useAudioManager} from '@components/AudioManager';
import SnackBar from '@components/SnackBar';

const NewsScreen = () => {
  const {formatMessage} = useIntl();
  const {news, opened, overview, openNews, getNewsData, dismissOverview} =
    useNews();
  const {translatedTitle} = useNews();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const timeoutRef = useRef<any>(null);
  const {playRefreshSound} = useAudioManager();

  // when the screen is focused, we are going to fetch the news
  useFocusEffect(
    useCallback(() => {
      handleSearch();
    }, [search]),
  );

  const handleSearch = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      getNewsData(search);
    }, 700);
  };

  useEffect(() => {
    handleSearch();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search]);

  const handleRefresh = () => {
    setRefreshing(true);
    getNewsData(search).then((_news: NewsItem[]) => {
      setRefreshing(false);
    });
    playRefreshSound();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.screenTitle}>
          <Typography sx={{marginBottom: 10}} variant="headlineMedium">
            {formatMessage({id: 'news'})}
          </Typography>
        </View>
        <View style={styles.header}>
          <TextInput
            left={<TextInput.Icon icon="magnify" />}
            right={
              search && (
                <TextInput.Icon icon="close" onPress={() => setSearch('')} />
              )
            }
            onChangeText={text => setSearch(text)}
            style={styles.searchInput}
            value={search}
            placeholder={formatMessage({id: 'search_news'})}
            mode="outlined"
            outlineStyle={{borderRadius: 40}}
          />
        </View>
        <View style={styles.newsPercentage}>
          {overview && (
            <SnackBar
              title={formatMessage({id: overview.text})}
              image={overview.icon}
              bgColor={overview.bgColor}
              textColor={overview.textColor}
              onDismiss={() => dismissOverview()}
            />
          )}
        </View>

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
              isOpened={opened?.includes(item.id)}
              translatedTitle={translatedTitle}
              onPress={(url: string, id: number) => openNews(url, id)}
              item={item}
            />
          )}
          data={news}
          keyExtractor={(item, _index) => item?.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    margin: 16,
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

export default NewsScreen;
