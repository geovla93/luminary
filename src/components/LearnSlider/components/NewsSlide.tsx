import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Typography} from '@ui/core/components';

import React from 'react';
import {NewsItem} from '@itypes/news';
import {openLink} from '@utils/inAppBrowser';
import {IconButton} from 'react-native-paper';

const NewsSlide = ({
  item,
  translatedTitle,
  dismissNews,
}: {
  item: NewsItem;
  translatedTitle: (item: NewsItem) => string;
  dismissNews: (id: number) => void;
}) => {
  const renderTickers = (tickers: any) => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 3}}>
        {tickers.map((ticker: any) => (
          <View key={ticker.ticker} style={styles.button}>
            <Typography
              variant={'bodySmall'}
              sx={{
                fontSize: 12,
                color: 'rgba(204, 198, 189, 1)',
                fontFamily: 'Roboto-Medium',
              }}>
              {ticker.ticker}
            </Typography>
          </View>
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={() => openLink(item.news_url)}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item.image_url}} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Typography
              variant={'bodySmall'}
              sx={{
                fontSize: 14,
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Roboto-Medium',
              }}>
              {translatedTitle(item).slice(0, 90)}
            </Typography>
            {renderTickers(item.tickers)}
            <Typography
              variant={'bodySmall'}
              sx={{
                fontSize: 12,
                color: 'rgba(204, 198, 189, 1)',
                fontFamily: 'Roboto-Medium',
              }}>
              {item.source_name}
            </Typography>
          </View>
          <IconButton
            size={10}
            style={styles.dismissButton}
            icon="close"
            onPress={() => dismissNews(item.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsSlide;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(34, 31, 26, 1)',
    borderRadius: 15,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    // height: 104,
    width: Dimensions.get('window').width - 50,
    marginRight: 15,
  },
  dismissButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    // backgroundColor: 'rgba(76, 70, 57, .4)',
    borderRadius: 15,
    padding: 1,
  },

  imageContainer: {
    width: '35%',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '65%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(76, 70, 57, 1)',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 5,
    marginRight: 5,
  },
});
