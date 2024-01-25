import {colors} from '@ui/core/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

const AboutToken = ({token}: {token: any}) => {
  const {formatMessage} = useIntl();

  return (
    <View style={styles.root}>
      {token?.description ? (
        <Typography
          variant={'bodySmall'}
          sx={{marginBottom: 10, fontFamily: 'Roboto-Regular'}}>
          {token?.description}
        </Typography>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography
            variant={'titleMedium'}
            sx={{fontFamily: 'Roboto-Medium'}}>
            {formatMessage({id: 'missing_token_info'})}
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    display: 'flex',
    flexDirection: 'column',
  },
  webViewStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.backdrop,
    borderRadius: 20,
  },
});
export default AboutToken;
