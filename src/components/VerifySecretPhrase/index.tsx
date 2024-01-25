import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@ui/core/theme';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import {wordlists} from 'ethers';
import {randomNumbers, shuffle} from '@utils/functions';

const Word = ({
  word,
  index,
  onPress,
}: {
  word: string;
  index: number;
  onPress: (i: any) => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={styles.wordContainer}>
      <Typography variant="bodySmall" sx={{fontWeight: '300'}}>
        {formatMessage({id: 'word'})} {index + 1}: {word}
      </Typography>
      {word && (
        <Icon
          name="close"
          style={styles.closeIcon}
          size={12}
          color={colors.onSurface}
        />
      )}
    </TouchableOpacity>
  );
};

interface IOption {
  word: string;
  onPress: (word: string) => void;
}

const Option = ({word, onPress}: IOption) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(word)}
      style={styles.optionsContainer}>
      <Typography variant="bodySmall" sx={{fontWeight: '600', color: 'white'}}>
        {word}
      </Typography>
    </TouchableOpacity>
  );
};

const getRandomWords = (phraseWords: string[]) => {
  const randomNo = randomNumbers(2048, 3);

  const words = [];
  for (let i = 0; i < randomNo.length; i++) {
    words.push(wordlists.en.getWord(randomNo[i]));
  }

  const merged = [...phraseWords, ...words];
  const shuffled = shuffle(merged);
  return shuffled;
};

const VerifySecretPhrase = ({
  phrase,
  setSelected,
  selected,
  selectedWords,
  error,
}: any) => {
  // const {formatMessage} = useIntl();

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(
      getRandomWords([
        phrase[selectedWords[0]],
        phrase[selectedWords[1]],
        phrase[selectedWords[2]],
      ]),
    );
  }, [selectedWords]);

  const handleWordPress = (word: string) => {
    const copy = [...selected];
    const index = copy.findIndex(
      w => w === null || w === undefined || w === '',
    );
    copy[index] = word;
    setSelected(copy);
  };

  const handleRemove = (index: number) => {
    const copy = [...selected];
    copy[index] = null;
    setSelected(copy);
  };

  return (
    <View style={styles.root}>
      <View
        style={[
          {
            backgroundColor: '#100E09',
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 20,
          },
        ]}>
        <View style={styles.phraseContainer}>
          <Word
            onPress={() => handleRemove(0)}
            word={selected[0] || ''}
            index={selectedWords[0]}
          />
          <Word
            onPress={() => handleRemove(1)}
            word={selected[1] || ''}
            index={selectedWords[1]}
          />
          <Word
            onPress={() => handleRemove(2)}
            word={selected[2] || ''}
            index={selectedWords[2]}
          />
        </View>
      </View>
      {!!error && (
        <View style={{marginVertical: 10}}>
          <Typography color="red">{error}</Typography>
        </View>
      )}
      <View style={styles.options}>
        {options.map((word, index) => (
          <Option
            onPress={() => handleWordPress(word)}
            word={word}
            key={`${index}-option`}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    flex: 1,
  },
  phraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  wordContainer: {
    backgroundColor: '#1E1B16',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  optionsContainer: {
    backgroundColor: '#1E1B16',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '28%',
  },
  closeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default VerifySecretPhrase;
