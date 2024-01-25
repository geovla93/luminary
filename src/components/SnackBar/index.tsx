import {Typography} from '@ui/core/components';
import React, {useEffect, useRef} from 'react';

import {Image, StyleSheet, View, Animated} from 'react-native';
import {IconButton} from 'react-native-paper';

interface SnackBarProps {
  title: string;
  image: any;
  subtitle?: string;
  bgColor?: string;
  textColor?: string;
  onDismiss?: () => void;
}

const SnackBar = ({
  title,
  image,
  subtitle,
  bgColor,
  textColor,
  onDismiss,
}: SnackBarProps): JSX.Element => {
  const animation = useRef(new Animated.Value(0));
  useEffect(() => {
    animation.current = new Animated.Value(0);
    Animated.spring(animation.current, {
      toValue: 1,
      useNativeDriver: true,
      speed: 5,
      bounciness: 10,
    }).start();
  }, [title]);

  // Interpolate the scale value
  const scale = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Start from scale 0 and grow to scale 1
  });

  const animatedStyles = {
    transform: [{scale}],
  };
  return (
    <Animated.View
      style={[styles.root, {backgroundColor: bgColor}, animatedStyles]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Typography sx={styles.title} color={textColor}>
          {title}
        </Typography>
        {subtitle && <Typography sx={styles.subtitle}>{subtitle}</Typography>}
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          icon="close"
          iconColor={textColor}
          size={20}
          onPress={onDismiss}
          style={styles.icon}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  imageContainer: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  icon: {},
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  iconContainer: {
    marginTop: -40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgb(0, 0, 0)',
  },
});

export default SnackBar;
