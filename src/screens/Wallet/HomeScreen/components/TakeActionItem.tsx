import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CheckerIcon = ({checked = true}: {checked?: boolean}) => {
  return (
    <View
      style={[
        styles.checkIcon,
        {
          backgroundColor: checked ? colors.primary : colors.onPrimary,
        },
      ]}>
      {checked ? (
        <Icon name="check" size={22} color={'black'} />
      ) : (
        <Icon name="exclamation" size={22} color={colors.primary} />
      )}
    </View>
  );
};

const TakeActionItem = ({
  text,
  completed,
  content,
  onPress,
}: {
  text?: string;
  content?: React.ReactNode;
  completed: boolean;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={() => !completed && onPress && onPress()}
      style={[
        styles.item,
        {
          backgroundColor: completed ? colors.onPrimary : '#221F1A',
        },
      ]}>
      <CheckerIcon checked={completed} />
      {content ? content : null}
      {text && (
        <Typography
          variant={'bodyLarge'}
          color={completed ? colors.primary : colors.onSurface}
          sx={styles.itemText}>
          {text}
        </Typography>
      )}
      {!completed && !content && (
        <Icon
          name="chevron-right"
          size={22}
          color={completed ? colors.primary : colors.onSurface}
        />
      )}
    </Pressable>
  );
};

export default TakeActionItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 6,
  },
  itemText: {
    paddingLeft: 25,
    flexGrow: 1,
  },
  checkIcon: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 32,
    height: 32,
  },
});
