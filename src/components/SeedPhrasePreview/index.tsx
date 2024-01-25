import React, {useEffect} from 'react';
import {Typography} from '@ui/core/components';
import {View, StyleSheet} from 'react-native';
import {colors} from '@ui/core/theme';
import {wordlists} from 'ethers';

interface SeedPhrasePreviewProps {
  phrase: string;
}

const replace = '...........';

const Word = ({
  word,
  pos,
  isValid,
}: {
  word: string;
  pos: number;
  isValid: boolean;
}) => {
  return (
    <View style={styles.wordContainer}>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: '700',
          color: word === replace || isValid ? colors.onBackground : 'red',
        }}
        variant="bodySmall">
        {`${pos}. `}
        {word ? `${word}` : replace}
      </Typography>
    </View>
  );
};

const SeedPhrasePreview = ({phrase}: SeedPhrasePreviewProps) => {
  const words = phrase.trim().split(' ');
  const [validWords, setValidWords] = React.useState<string[]>([]);
  const totalWords = 12;
  const missingWords = totalWords - words.length;
  const paddedWords = words.concat(Array(missingWords).fill(replace));
  const isValidWord = (word: string) => {
    return wordlists.en.getWordIndex(word) !== -1;
  };
  useEffect(() => {
    const _validWords = words.filter(isValidWord);
    setValidWords(_validWords);
  }, [phrase]);
  return (
    <View style={styles.root}>
      <View style={styles.wordsGroup}>
        {paddedWords.slice(0, 4).map((word, index) => (
          <Word
            pos={index + 1}
            isValid={validWords.includes(word)}
            key={index}
            word={word}
          />
        ))}
      </View>
      <View style={styles.wordsGroup}>
        {paddedWords.slice(4, 8).map((word, index) => (
          <Word
            pos={index + 5}
            isValid={validWords.includes(word)}
            key={index + 5}
            word={word}
          />
        ))}
      </View>
      <View style={styles.wordsGroup}>
        {paddedWords.slice(8, 12).map((word, index) => (
          <Word
            pos={index + 9}
            isValid={validWords.includes(word)}
            key={index + 9}
            word={word}
          />
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
