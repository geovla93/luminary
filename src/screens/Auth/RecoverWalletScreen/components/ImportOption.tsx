import xcolors from '@ui/core/theme/colors';
import {Typography} from '@ui/core/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';

const ImportOption = ({option, selected, disabled, onPress}: any) => {
  const {formatMessage} = useIntl();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.root,
        selected ? styles.selected : {},
        disabled ? styles.disabled : {},
      ]}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          <Image style={styles.image} source={option.icon} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Typography
          sx={{fontWeight: '800', marginBottom: 5}}
          variant="labelLarge">
          {formatMessage({id: option.title})}
        </Typography>
        <Typography sx={{color: colors.onSurface}} variant="labelSmall">
          {formatMessage({id: option.description})}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

ImportOption.defaultProps = {
  selected: false,
  disabled: false,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
  },
  iconWrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: xcolors['N-20'],
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.3,
  },
  textContainer: {
    flex: 0.7,
    padding: 10,
    justifyContent: 'center',
  },
});

export default ImportOption;
