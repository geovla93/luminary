import {ELOCALE} from '@itypes/locale';

// since react-native does not support dynamic imports, we have to use this workaround
const audioFilesMap: any = {
  en: {
    welcome: require('@assets/onaudio/en/welcome.mp3'),
    create_wallet: require('@assets/onaudio/en/create.mp3'),
    backup: require('@assets/onaudio/en/backup.mp3'),
    recover: require('@assets/onaudio/en/recover.mp3'),
    seedphrase: require('@assets/onaudio/en/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/en/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/en/recoverypin.mp3'),
  },
  fr: {
    welcome: require('@assets/onaudio/fr/welcome.mp3'),
    create_wallet: require('@assets/onaudio/fr/create.mp3'),
    backup: require('@assets/onaudio/fr/backup.mp3'),
    recover: require('@assets/onaudio/fr/recover.mp3'),
    seedphrase: require('@assets/onaudio/fr/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/fr/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/fr/recoverypin.mp3'),
  },
  de: {
    welcome: require('@assets/onaudio/de/welcome.mp3'),
    create_wallet: require('@assets/onaudio/de/create.mp3'),
    backup: require('@assets/onaudio/de/backup.mp3'),
    recover: require('@assets/onaudio/de/recover.mp3'),
    seedphrase: require('@assets/onaudio/de/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/de/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/de/recoverypin.mp3'),
  },
  es: {
    welcome: require('@assets/onaudio/es/welcome.mp3'),
    create_wallet: require('@assets/onaudio/es/create.mp3'),
    backup: require('@assets/onaudio/es/backup.mp3'),
    recover: require('@assets/onaudio/es/recover.mp3'),
    seedphrase: require('@assets/onaudio/es/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/es/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/es/recoverypin.mp3'),
  },
  it: {
    welcome: require('@assets/onaudio/it/welcome.mp3'),
    create_wallet: require('@assets/onaudio/it/create.mp3'),
    backup: require('@assets/onaudio/it/backup.mp3'),
    recover: require('@assets/onaudio/it/recover.mp3'),
    seedphrase: require('@assets/onaudio/it/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/it/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/it/recoverypin.mp3'),
  },
  pt: {
    welcome: require('@assets/onaudio/pt/welcome.mp3'),
    create_wallet: require('@assets/onaudio/pt/create.mp3'),
    backup: require('@assets/onaudio/pt/backup.mp3'),
    recover: require('@assets/onaudio/pt/recover.mp3'),
    seedphrase: require('@assets/onaudio/pt/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/pt/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/pt/recoverypin.mp3'),
  },
  ro: {
    welcome: require('@assets/onaudio/ro/welcome.mp3'),
    create_wallet: require('@assets/onaudio/ro/create.mp3'),
    backup: require('@assets/onaudio/ro/backup.mp3'),
    recover: require('@assets/onaudio/ro/recover.mp3'),
    seedphrase: require('@assets/onaudio/ro/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/ro/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/ro/recoverypin.mp3'),
  },
  tr: {
    welcome: require('@assets/onaudio/tr/welcome.mp3'),
    create_wallet: require('@assets/onaudio/tr/create.mp3'),
    backup: require('@assets/onaudio/tr/backup.mp3'),
    recover: require('@assets/onaudio/tr/recover.mp3'),
    seedphrase: require('@assets/onaudio/tr/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/tr/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/tr/recoverypin.mp3'),
  },
  zh: {
    welcome: require('@assets/onaudio/zh/welcome.mp3'),
    create_wallet: require('@assets/onaudio/zh/create.mp3'),
    backup: require('@assets/onaudio/zh/backup.mp3'),
    recover: require('@assets/onaudio/zh/recover.mp3'),
    seedphrase: require('@assets/onaudio/zh/seedphrase.mp3'),
    selecthd: require('@assets/onaudio/zh/selecthd.mp3'),
    recoverypin: require('@assets/onaudio/zh/recoverypin.mp3'),
  },
};

export const getFilesByLocale = (locale: ELOCALE) => {
  const language = locale.substring(0, 2).toLowerCase();
  // check if the language is supported
  if (Object.keys(audioFilesMap).includes(language)) {
    return audioFilesMap[language];
  }
  return audioFilesMap['en'];
};
