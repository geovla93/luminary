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
        <Pressable
          style={styles.pressable}
          onPress={() => openLink(links.terms)}>
          <Typography
            variant="bodySmall"
            sx={[styles.agreement, {color: colors.primary}]}>
            {formatMessage({
              id: 'terms',
            })}
          </Typography>
        </Pressable>
        {formatMessage({
          id: 'and',
        })}
        <Pressable
          style={styles.pressable}
          onPress={() => openLink(links.privacy)}>
          <Typography
            variant="bodySmall"
            sx={[styles.agreement, {color: colors.primary}]}>
            {formatMessage({
              id: 'privacy',
            })}
          </Typography>
        </Pressable>
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  agreement: {
    fontSize: 10,
    textAlign: 'center',
  },
  pressable: {
    paddingTop: 4,
  },
});

export default AuthFooter;
