import React from 'react';
import {useIntl} from 'react-intl';
import {Typography} from '@ui/core/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {colors} from '@ui/core/theme';
import {openLink} from '@utils/inAppBrowser';
import {links} from '@utils/config';

const AgreementCheckbox = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) => {
  const {formatMessage} = useIntl();

  return (
    <View style={styles.footerContainer}>
      <Checkbox.Android
        status={checked ? 'checked' : 'unchecked'}
        uncheckedColor={colors.primary}
        onPress={onPress}
      />
      <Typography sx={styles.agreement} variant="bodySmall">
        {formatMessage({
          id: 'agreement',
        })}
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => openLink(links.terms)}>
          <Typography
            variant="bodySmall"
            sx={[styles.agreement, {color: colors.primary}]}>
            {formatMessage({
              id: 'terms',
            })}
          </Typography>
        </TouchableOpacity>
        {formatMessage({
          id: 'and',
        })}
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => openLink(links.privacy)}>
          <Typography
            variant="bodySmall"
            sx={[styles.agreement, {color: colors.primary}]}>
            {formatMessage({
              id: 'privacy',
            })}
          </Typography>
        </TouchableOpacity>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pressable: {
    paddingTop: 4,
  },
  agreement: {
    fontSize: 10,
    textAlign: 'center',
  },
});

export default AgreementCheckbox;
