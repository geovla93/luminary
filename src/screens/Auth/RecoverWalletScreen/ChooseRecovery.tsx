import React, {useMemo, useState} from 'react';
import {Button} from '@ui/core/components';
import OnboardingHeader from '../../../components/OnboardingHeader';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {useAppSelector} from '../../../redux/hook';
import ImportOption from './components/ImportOption';
import {SCREENS} from '@screens/screens';

const RecoverWalletScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const locale = useAppSelector(state => state.application.locale);
  const [selected, setSelected] = useState('secret_phrase');

  const handleContinue = () => {
    if (selected === 'secret_phrase') {
      navigation.navigate(SCREENS.INSERT_PASSPHRASE_SCREEN);
    }
  };

  const options = useMemo(() => {
    return [
      {
        id: 'secret_phrase',
        icon: require('./assets/secret_phrase.png'),
        title: 'secret_phrase',
        description: 'secret_phrase_subtitle',
        disabled: false,
      },
      {
        id: 'icloud',
        icon: require('./assets/cloud.png'),
        title: 'icloud_backup',
        description: 'icloud_backup_subtitle',
        disabled: true,
      },
      {
        id: 'private_key',
        icon: require('./assets/private_key.png'),
        title: 'private_key',
        description: 'private_key_subtitle',
        disabled: true,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <OnboardingHeader
          onBack={() => navigation.goBack()}
          title={'import_wallet'}
          subtitle="import_wallet_subtitle"
        />
        <View style={styles.importOptions}>
          {options.map((option, index) => (
            <ImportOption
              option={option}
              disabled={option.disabled}
              selected={option.id === selected}
              key={`${index}-option`}
              onPress={() => setSelected(option.id)}
            />
          ))}
        </View>
        <View>
          <Button
            variant="contained"
            onPress={handleContinue}
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
  importOptions: {
    flex: 1,
    marginTop: 20,
  },
});

export default RecoverWalletScreen;
