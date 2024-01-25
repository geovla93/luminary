/* eslint-disable react/no-unstable-nested-components */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import SquareButton from '@ui/core/components/SquareButton';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Input from '@ui/core/components/Input';
import {List} from 'react-native-paper';
import {languagesList} from '../../../../i18n';
import {useIntl} from 'react-intl';
import {colors} from '@ui/core/theme';
import useApplication from '@hooks/useApplication';
import {ELOCALE} from '@itypes/locale';

const LanguageScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();

  const {locale, setAppLocale} = useApplication();
  const [langs, setLanguages] = useState(languagesList); // languagesList[
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (filter) {
      const _languages = languagesList.filter(lang =>
        formatMessage({id: lang.textKey}).includes(filter),
      );
      setLanguages(_languages);
    } else {
      setLanguages(languagesList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSetLocale = (_locale: ELOCALE) => {
    setAppLocale(_locale);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.content}>
          <View>
            <Input
              left={<Input.Icon icon="magnify" />}
              right={
                filter && (
                  <Input.Icon icon="close" onPress={() => setFilter('')} />
                )
              }
              placeholder={formatMessage({id: 'search_language'})}
              value={filter}
              onChangeText={(text: string) => setFilter(text)}
            />
          </View>
          <View style={styles.list}>
            <List.Section>
              {langs.map(lang => (
                <List.Item
                  onPress={() => handleSetLocale(lang.value)}
                  key={lang.value}
                  title={formatMessage({id: lang.textKey})}
                  left={() => <Image style={styles.img} source={lang.image} />}
                  right={() =>
                    locale === lang.value ? <List.Icon icon="check" /> : null
                  }
                />
              ))}
            </List.Section>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 20,

    borderWidth: 1,
    borderColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  list: {},
});

export default LanguageScreen;
