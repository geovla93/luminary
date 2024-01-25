import {Typography} from '@ui/core/components';
import SquareButton from '@ui/core/components/SquareButton';
import React from 'react';
import {useIntl} from 'react-intl';
import {StyleSheet, View} from 'react-native';

interface IHeaderComponentProps {
  onBack?: () => void;
  onClose?: () => void;
  title?: string;
  text?: string;
}

const HeaderComponent = ({
  onBack,
  onClose,
  title,
  text,
}: IHeaderComponentProps) => {
  const {formatMessage} = useIntl();
  const hasClose = typeof onClose === 'function';
  const hasBack = typeof onBack === 'function';
  return (
    <View
      style={[
        styles.root,
        {justifyContent: !hasClose ? 'flex-start' : 'space-between'},
      ]}>
      {hasBack ? <SquareButton onPress={() => onBack()} /> : <View />}
      <Typography sx={styles.text} fontWeight="bold" variant="titleMedium">
        {title &&
          formatMessage({
            id: title,
            defaultMessage: 'Add translation for ' + title,
          })}
        {!title && text ? text : ''}
      </Typography>
      {hasClose && <SquareButton icon="close" onPress={() => onClose()} />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {marginLeft: 20},
});

export default HeaderComponent;
