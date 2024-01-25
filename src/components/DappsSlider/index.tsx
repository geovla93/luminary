import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, VirtualizedList} from 'react-native';

import Paginator from '@screens/Auth/AuthRoot/components/Paginator';

import DappSlide from './components/DappSlide';

const DappsSlider = ({items}: any) => {
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    let timer: any;
    const goToNextSlide = () => {
      if (activeIndex < items.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
      timer = setTimeout(goToNextSlide, 8000);
    };
    if (items?.length > 0) {
      timer = setTimeout(goToNextSlide, 8000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [items?.length, activeIndex]);

  useEffect(() => {
    if (slidesRef.current && activeIndex !== null) {
      // @ts-ignore
      slidesRef.current.scrollToIndex({index: activeIndex, animated: true});
    }
  }, [activeIndex]);

  if (!items) {
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
        renderItem={({item}: {item: any}) => <DappSlide item={item} />}
        data={items}
        keyExtractor={(item, _index) => item?.id.toString()}
      />
      <View style={styles.pagination}>
        <Paginator size="small" data={items} scrollX={scrollX} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  pagination: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DappsSlider;
