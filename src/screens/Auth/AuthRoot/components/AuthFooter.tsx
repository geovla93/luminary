import React from 'react';
import {useIntl} from 'react-intl';
import {Typography} from '@ui/core/components';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '@ui/core/theme';
import {openLink} from '@utils/inAppBrowser';
import {links} from '@utils/config';

const AuthFooter = () => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.footerContainer}>
      <Typography sx={styles.agreement} variant="bodySmall">
        {formatMessage({
          id: 'agreement',
        })}
      </Typography>
      <Pressable style={styles.pressable} onPress={() => openLink(links.terms)}>
        <Typography
          variant="bodySmall"
          color={colors.primary}
          sx={styles.agreement}>
          {formatMessage({
            id: 'terms',
          })}
        </Typography>
      </Pressable>
      <Typography sx={styles.agreement} variant="bodySmall">
        {formatMessage({
          id: 'and',
        })}
      </Typography>
      <Pressable
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
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  agreement: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
  pressable: {},
});

export default AuthFooter;
