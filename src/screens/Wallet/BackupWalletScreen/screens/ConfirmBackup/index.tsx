import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {SCREENS} from '@screens/screens';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from '@ui/core/components';
import VerifySecretPhrase from '@components/VerifySecretPhrase';
import {randomNumbers} from '@utils/functions';
import OnboardingSteps from '@components/OnboardingSteps';
import OnboardingHeader from '@components/OnboardingHeader';
import {useWalletContext} from '@hooks/useWalletContext';

const VerifyBackupScreen = ({navigation, route}: any) => {
  const {formatMessage} = useIntl();
  const [mnemonic] = useState<string>(route.params.mnemonic);
  const {setCurrentWalletBackedUp} = useWalletContext();
  const [selected, setSelected] = useState<any[]>(['', '', '']);
  const [selectedWords, setSelectedWords] = useState<number[] | null>(null);
  const [tries, setTries] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const setMnemonicPhrase = async () => {
      const randomWordsIndex = randomNumbers(12);
      setSelectedWords(randomWordsIndex);
    };
    setMnemonicPhrase();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 1000);
    }
  }, [error]);

  const onConfirm = () => {
    setCurrentWalletBackedUp();
    navigation.navigate(SCREENS.APP_HOME_SCREEN, {
      screen: 'Home Stack',
    });
  };

  const validate = () => {
    const mnemonicArray = mnemonic.split(' ');
    if (selected.length === 3 && selectedWords) {
      if (
        selected[0] === mnemonicArray[selectedWords[0]] &&
        selected[1] === mnemonicArray[selectedWords[1]] &&
        selected[2] === mnemonicArray[selectedWords[2]]
      ) {
        // handle success
        onConfirm();
      } else {
        setTries(tries + 1);
        setSelected(['', '', '']);
        setError('verify_phrase_error');
        setSelectedWords(randomNumbers(12));
        if (tries === 2) {
          navigation.goBack();
        }
      }
    }
  };

  if (!selectedWords) {
    return null;
  }

  const canSubmit = selected.every(
    (w: any) => w !== null && w !== undefined && w !== '',
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <ScrollView>
          <OnboardingSteps
            total={2}
            fill={2}
            onBack={() => navigation.goBack()}
            showBack={true}
          />
          <OnboardingHeader
            title={'verify_phrase'}
            subtitle="verify_phrase_subtitle"
            info="verify_phrase_info"
          />
          <VerifySecretPhrase
            setSelected={setSelected}
            selected={selected}
            phrase={mnemonic.split(' ')}
            selectedWords={selectedWords}
            error={error ? formatMessage({id: error}) : ''}
          />
        </ScrollView>
        <View style={styles.bottom}>
          <Button
            onPress={validate}
            disabled={!canSubmit}
            variant="contained"
            sx={{marginTop: 20}}>
            {formatMessage({
              id: 'continue',
            })}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default VerifyBackupScreen;
