import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Image from '@components/Image';
import {Typography} from '@ui/core/components';
import {getRelativeTime} from '@utils/functions';
import {useIntl} from 'react-intl';
import Sentiment from './components/Sentiment';

const NewsCard = ({item, onPress, translatedTitle, isOpened}: any) => {
  const {formatMessage} = useIntl();
  const time = getRelativeTime(item.date);
  return (
    <TouchableOpacity
      style={isOpened ? styles.opened : {}}
      onPress={() => onPress(item.news_url, item.id)}>
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.image_url,
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Typography
            variant="bodySmall"
            sx={{fontFamily: 'Roboto-Bold', fontSize: 15}}>
            {translatedTitle(item).slice(0, 100)}
          </Typography>
          <View style={styles.tickers}>
            {item.tickers.map((ticker: any, index: number) => (
              <View key={index} style={styles.chip}>
                <Typography variant="bodySmall" sx={{fontSize: 12}}>
                  {ticker.ticker}
                </Typography>
              </View>
            ))}
          </View>
          <View style={styles.newsFooter}>
            <View style={styles.sentiment}>
              <Sentiment sentiment={item.sentiment} />
            </View>
            <Typography
              variant="bodySmall"
              sx={{fontFamily: 'Roboto-Medium', fontSize: 12}}>
              {item.source_name}
            </Typography>

            <Typography
              sx={{marginLeft: 10, fontFamily: 'Roboto-Medium', fontSize: 12}}
              variant="bodySmall">
              {' '}
              {formatMessage(
                {
                  id: time.unit,
                },
                {
                  value: time.value,
                },
              )}
            </Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 80,
    aspectRatio: 1,
    borderRadius: 12,
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  newsFooter: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    backgroundColor: 'rgba(76, 70, 57, 1)',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 8,
    marginRight: 5,
  },
  opened: {
    opacity: 0.6,
  },
  tickers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  sentiment: {
    marginRight: 5,
  },
});

export default NewsCard;
