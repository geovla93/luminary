import React from 'react';
import {Typography} from '@ui/core/components';
import {View, StyleSheet} from 'react-native';
import {colors} from '@ui/core/theme';

interface SeedPhrasePreviewProps {
  phrase: string;
}

const replace = '...........';

const Word = ({word, pos}: {word: string; pos: number}) => {
  return (
    <View style={styles.wordContainer}>
      <Typography
        sx={{textAlign: 'center', fontWeight: '700'}}
        variant="bodySmall">
        {`${pos}. `}
        {word ? `${word}` : replace}
      </Typography>
    </View>
  );
};

const SeedPhrasePreview = ({phrase}: SeedPhrasePreviewProps) => {
  const words = phrase.trim().split(' ');
  const totalWords = 12;
  const missingWords = totalWords - words.length;
  const paddedWords = words.concat(Array(missingWords).fill(replace));

  return (
    <View style={styles.root}>
      <View style={styles.wordsGroup}>
        {paddedWords.slice(0, 4).map((word, index) => (
          <Word pos={index + 1} key={index} word={word} />
        ))}
      </View>
      <View style={styles.wordsGroup}>
        {paddedWords.slice(4, 8).map((word, index) => (
          <Word pos={index + 5} key={index + 5} word={word} />
        ))}
      </View>
      <View style={styles.wordsGroup}>
        {paddedWords.slice(8, 12).map((word, index) => (
          <Word pos={index + 9} key={index + 9} word={word} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    padding: 10,
    marginVertical: 30,
  },
  wordsGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center',
  },
  wordContainer: {
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
});

export default SeedPhrasePreview;
