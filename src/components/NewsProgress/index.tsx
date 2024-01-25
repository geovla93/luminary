import React, {useState, useEffect} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

interface NewsProgressBarProps {
  positivePercent: number;
  negativePercent: number;
}

const NewsProgressBar: React.FC<NewsProgressBarProps> = ({
  positivePercent,
  negativePercent,
}) => {
  const [positiveWidth] = useState(new Animated.Value(0));
  const [negativeWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(positiveWidth, {
      toValue: positivePercent,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(negativeWidth, {
      toValue: negativePercent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [positivePercent, negativePercent]);

  const positiveInterpolatedWidth = positiveWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const negativeInterpolatedWidth = negativeWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {backgroundColor: '#00C853', width: positiveInterpolatedWidth},
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {backgroundColor: '#D50000', width: negativeInterpolatedWidth},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
});

export default NewsProgressBar;
