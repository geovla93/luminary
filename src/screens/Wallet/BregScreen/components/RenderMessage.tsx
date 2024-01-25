import React, {useMemo} from 'react';
import {Typography} from '@ui/core/components';
import {StyleSheet, View} from 'react-native';
import {colors} from '@ui/core/theme';

const RenderMessage = ({
  message,
}: {
  message: {text: string; kind: string; type: string};
}) => {
  const isSent = useMemo(() => message.type === 'sent', [message.type]);
  return (
    <View style={[styles.container, isSent ? styles.sent : styles.received]}>
      <Typography
        variant={'labelLarge'}
        sx={isSent ? styles.sentText : styles.receivedText}>
        {message.text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
  },
  sent: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  received: {
    backgroundColor: '#221F1A',
    alignSelf: 'flex-start',
  },
  sentText: {
    color: 'black',
  },
  receivedText: {
    color: 'white',
  },
});

export default RenderMessage;
