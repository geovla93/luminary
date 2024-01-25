import React, {useState, useEffect} from 'react';
import {View, ViewStyle, TextStyle, StyleProp} from 'react-native';
import {DEFAULT, millisToMinutesAndSeconds} from '../common';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';

const Countdown = ({
  duration = DEFAULT.Options.lockDuration || 60000,
  onFinish,
}: {
  duration?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onFinish: () => void;
}) => {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    const id = setTimeout(() => {
      if (remaining > 1000) {
        setRemaining(remaining - 1000);
      } else {
        onFinish();
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [remaining]);

  return (
    <View style={[DEFAULT.Styles.locked?.countdown]}>
      <Typography
        variant="displayMedium"
        color={colors.primary}
        fontWeight="500">
        {millisToMinutesAndSeconds(remaining)}
      </Typography>
    </View>
  );
};

export default Countdown;
