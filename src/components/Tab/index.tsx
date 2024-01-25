import React from 'react';
import {Typography} from '@ui/core/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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

  return (
    <TouchableOpacity onPress={() => onPress(index)} style={styles.tab}>
      <Typography variant="bodyLarge" sx={[styles.text, labelStyle]}>
        {formatMessage({id: label})}
      </Typography>
      {active && (
        <View style={roundedActive ? styles.roundedActive : styles.active} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
  tab: {
    paddingHorizontal: 10,

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
    fontWeight: 'bold',
  },
});

Tab.defaultProps = {
  roundedActive: false,
};

export default Tab;
