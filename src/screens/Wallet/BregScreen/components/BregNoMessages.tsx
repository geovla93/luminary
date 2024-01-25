import Typography from '@ui/core/components/Typography';
import {colors} from '@ui/core/theme';
import React from 'react';
import {useIntl} from 'react-intl';
import {ImageBackground, StyleSheet} from 'react-native';

const BregNoMessages = () => {
  const {formatMessage} = useIntl();
  return (
    <ImageBackground
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
      }}
      source={require('@assets/breg_background.png')}
      imageStyle={{resizeMode: 'contain', opacity: 0.8, marginTop: 100}}>
      <Typography
        sx={{
          color: colors.primary,
          fontFamily: 'Roboto-Medium',
          fontSize: 16,
        }}>
        {formatMessage(
          {
            id: 'hello_user',
          },
          {
            name: '@iluminary', // change here
          },
        )}
      </Typography>
      <Typography variant={'titleLarge'} sx={styles.chatTitle}>
        {formatMessage({
          id: 'how_i_can_help_you',
        })}
      </Typography>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  chatTitle: {
    fontSize: 32,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
    lineHeight: 40,
  },
});

export default BregNoMessages;
