import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import OnboardingHeader from '@components/OnboardingHeader';
import {useIntl} from 'react-intl';
import {Button} from '@ui/core/components';
import SeedPhrasePreview from '@components/SeedPhrasePreview';
import {SCREENS} from '@screens/screens';
import {useTemporaryWallet} from '@hooks/useTemporaryWallet';

const InsertPassPhraseScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const {recoverWallet} = useTemporaryWallet();
  const [seedPhrase, setSeedPhrase] = React.useState('');

  const handleRecover = async () => {
    recoverWallet(seedPhrase)
      .then(() => {
        navigation.navigate(SCREENS.SECURE_RECOVERED_SCREEN);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleChange = (e: any) => {
    const text = e.nativeEvent.text;
    const regex = /^[a-zA-Z\s]+$/;
    if (regex.test(text) || text === '' || text === ' ') {
      setSeedPhrase(text);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.wrapper}>
        <OnboardingHeader
          title={'enter_seed'}
          subtitle="enter_seed_subtitle"
          info="enter_seed_info"
        />
        <View style={styles.contentContainer}>
          <SeedPhrasePreview phrase={seedPhrase} />
          <View style={styles.passPhraseContainer}>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              value={seedPhrase}
              onChange={handleChange}
              label={formatMessage({
                id: 'pass_phrase_label',
              })}
              style={styles.passPhrase}
              multiline
              mode="outlined"
            />
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Button
            disabled={seedPhrase.split(' ').length !== 12}
            variant="contained"
            onPress={handleRecover}
            sx={{marginTop: 20}}>
            {formatMessage({
              id: 'continue',
            })}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  actionContainer: {
    //
  },
  passPhraseContainer: {},
  passPhrase: {},
});

export default InsertPassPhraseScreen;
