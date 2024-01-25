import {colors} from '@ui/core/theme';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {verticalScale, scale} from 'react-native-size-matters';
import xcolors from '@ui/core/theme/colors';

interface Props {
  total: number;
  fill: number;
  showBack?: boolean;
  onBack?: () => void;
}

const OnboardingSteps = ({total, fill, showBack, onBack}: Props) => {
  return (
    <View style={styles.root}>
      {showBack && (
        <View style={styles.backIcon}>
          <IconButton
            onPress={() => (typeof onBack === 'function' ? onBack() : {})}
            containerColor={xcolors['N-12']}
            iconColor={colors.primary}
            size={scale(20)}
            style={{borderRadius: 16, elevation: 2}}
            mode="contained"
            icon="arrow-left"
          />
        </View>
      )}
      <View style={styles.steps}>
        {Array(total)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[styles.step, {opacity: index < fill ? 1 : 0.2}]}
            />
          ))}
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
    paddingTop: verticalScale(10),
    height: verticalScale(40),
  },
  step: {
    width: scale(Dimensions.get('screen').width / 11),
    height: verticalScale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(5),
    backgroundColor: colors.primary,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    top: 0,
    left: 0,
  },
});

export default OnboardingSteps;
