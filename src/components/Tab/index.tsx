import React, {useEffect, useRef} from 'react';
import {Typography} from '@ui/core/components';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useIntl} from 'react-intl';
import {colors} from '@ui/core/theme';

interface ITab {
  active: boolean;
  label: string;
  index: number;
  onPress: (index: number) => void;
  labelStyle?: any;
  roundedActive?: boolean;
}

const Tab = ({
  active,
  label,
  index,
  onPress,
  labelStyle,
  roundedActive,
}: ITab) => {
  const {formatMessage} = useIntl();
  const activeAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(activeAnim, {
      toValue: active ? 1 : 0,
      duration: 300, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, [active, activeAnim]);

  const activeStyle = activeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Adjust these values based on the style changes
  });

  return (
    <TouchableOpacity onPress={() => onPress(index)} style={styles.tab}>
      <Typography
        variant="bodyLarge"
        textAlign="center"
        pl={10}
        pr={10}
        sx={{...styles.text, ...labelStyle}}>
        {formatMessage({id: label})}
      </Typography>
      <Animated.View
        style={[
          roundedActive ? styles.roundedActive : styles.active,
          {opacity: activeStyle}, // Apply animated style here
        ]}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  root: {},
  tab: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 30,
  },
  active: {
    height: 5,
    backgroundColor: colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 10,
  },
  roundedActive: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 8,
  },
  text: {
    textTransform: 'uppercase',
  },
});

Tab.defaultProps = {
  roundedActive: false,
};

export default Tab;
