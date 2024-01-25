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
      <View style={{flexWrap: 'wrap', flexDirection: 'row', marginLeft: 20}}>
        <Typography sx={styles.agreement} variant="bodySmall">
          {formatMessage({
            id: 'agreement',
          })}
        </Typography>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => openLink(links.terms)}>
          <Typography
            variant="bodySmall"
            color={colors.primary}
            sx={styles.agreement}>
            {formatMessage({
              id: 'terms',
            })}
          </Typography>
        </TouchableOpacity>
        <Typography sx={styles.agreement} variant="bodySmall">
          {formatMessage({
            id: 'and',
          })}
        </Typography>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => openLink(links.privacy)}>
          <Typography
            variant="bodySmall"
            color={colors.primary}
            sx={styles.agreement}>
            {formatMessage({
              id: 'privacy',
            })}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pressable: {},
  agreement: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AgreementCheckbox;
