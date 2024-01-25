import React, {useRef} from 'react';
import {Animated, StyleSheet, View, VirtualizedList} from 'react-native';

import Paginator from '@screens/Auth/AuthRoot/components/Paginator';
import LearnSlide from '@components/LearnSlider/components/LearnSlide';

const mockData = [
  {
    id: 1,
    title: 'Binance Blockchain Week',
    description:
      'The two-day Binance Blockchain Week 2023 conference will run from Wednesday, November 8, to Thursday, November 9, in Istanbul. ',
    image:
      'https://cdn.vox-cdn.com/thumbor/ewMKn-mMWDx6VJ1vPC6-nkrqmsQ=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24545756/1247577382.jpg',
  },
  {
    id: 4,
    title: 'Add crypto to your portfolio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. ',
    image: 'https://picsum.photos/400',
  },
  {
    id: 6,
    title: 'Add crypto to your portfolio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. ',
    image: 'https://picsum.photos/400',
  },
];

const LearnSlider = () => {
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  if (!mockData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <VirtualizedList
        horizontal={true}
        ref={slidesRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        getItemCount={data => data.length}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        getItem={(data, index) => data[index]}
        renderItem={({item}: {item: any}) => <LearnSlide item={item} />}
        data={mockData}
        keyExtractor={(item, _index) => item?.id.toString()}
      />
      <View style={styles.pagination}>
        <Paginator size="small" data={mockData} scrollX={scrollX} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  pagination: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LearnSlider;
