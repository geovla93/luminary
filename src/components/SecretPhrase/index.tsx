import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {colors} from '@ui/core/theme';
import {Button, Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

const Preview = ({onPress}: any) => {
  const {formatMessage} = useIntl();

  return (
    <View style={styles.hidden}>
      <Typography
        variant="bodyMedium"
        sx={{fontWeight: '700', marginBottom: 10}}>
        {formatMessage({id: 'tap_to_reveal'})}
      </Typography>
      <Typography
        variant="bodyMedium"
        sx={{fontWeight: '400', color: colors.onSurface}}>
        {formatMessage({id: 'make_sure_no_one_is'})}
      </Typography>
      <Button
        icon="eye-outline"
        onPress={onPress}
        variant="contained-tonal"
        size="medium"
        textColor={colors.primary}
        sx={{marginTop: 20, backgroundColor: colors.surface}}>
        {formatMessage({id: 'view'})}
      </Button>
    </View>
  );
};

const Word = ({word, index}: {word: string; index: number}) => {
  return (
    <View style={styles.wordContainer}>
      <Typography variant="bodySmall" sx={{fontWeight: '300'}}>
        {index + 1}. {word}
      </Typography>
    </View>
  );
};

const SecretPhrase = ({phrase}: {phrase: string[]}) => {
  // const {formatMessage} = useIntl();
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <View
      style={[
        styles.root,
        {backgroundColor: hidden ? '#38342E' : 'transparent'},
      ]}>
      {hidden && <Preview onPress={() => setHidden(false)} />}
      {!hidden && (
        <View style={styles.phraseContainer}>
          {phrase.map((word, index) => (
            <Word word={word} key={index} index={index} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  phraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordContainer: {
    backgroundColor: '#1E1B16',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '32%',
  },
  hidden: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SecretPhrase;
