import {Platform, NativeModules} from 'react-native';
export enum ELOCALE {
  ROMANIAN = 'ro-RO',
  TURKISH = 'tr',
  ENGLISH = 'en',
  GERMAN = 'de-DE',
  SPANISH = 'es-ES',
  FRENCH = 'fr-FR',
  ITALIAN = 'it-IT',
  PORTUGUESE = 'pt-BR',
  CHINESE = 'zh-CN',
}

export const detectLanguage = () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  const language = deviceLanguage.substring(0, 2).toLowerCase();
  switch (language) {
    case 'ro':
      return ELOCALE.ROMANIAN;
    case 'tr':
      return ELOCALE.TURKISH;
    case 'en':
      return ELOCALE.ENGLISH;
    case 'de':
      return ELOCALE.GERMAN;
    case 'es':
      return ELOCALE.SPANISH;
    case 'fr':
      return ELOCALE.FRENCH;
    case 'it':
      return ELOCALE.ITALIAN;
    case 'pt':
      return ELOCALE.PORTUGUESE;
    case 'zh':
      return ELOCALE.CHINESE;
    default:
      return ELOCALE.ENGLISH;
  }
};
