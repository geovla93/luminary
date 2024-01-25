import {ELOCALE} from '../types/locale';
import ro from './ro';
import en from './en';
import de from './de';
import fr from './fr';
import es from './es';
import it from './it';
import tr from './tr';
import pt from './pt';
import zh from './zh';

export const languages = {
  [ELOCALE.ROMANIAN]: ro,
  [ELOCALE.ENGLISH]: en,
  [ELOCALE.GERMAN]: de,
  [ELOCALE.FRENCH]: fr,
  [ELOCALE.SPANISH]: es,
  [ELOCALE.ITALIAN]: it,
  [ELOCALE.PORTUGUESE]: pt,
  [ELOCALE.TURKISH]: tr,
  [ELOCALE.CHINESE]: zh,
};

export const googleTranslateLanguages: {[key in ELOCALE]: string} = {
  [ELOCALE.ROMANIAN]: 'ro',
  [ELOCALE.ENGLISH]: 'en',
  [ELOCALE.GERMAN]: 'de',
  [ELOCALE.FRENCH]: 'fr',
  [ELOCALE.SPANISH]: 'es',
  [ELOCALE.ITALIAN]: 'it',
  [ELOCALE.PORTUGUESE]: 'pt',
  [ELOCALE.TURKISH]: 'tr',
  [ELOCALE.CHINESE]: 'zh',
};

export const languagesList = [
  {
    textKey: 'english',
    value: ELOCALE.ENGLISH,
    image: require('../assets/flags/en.jpg'),
  },
  {
    textKey: 'romanian',
    value: ELOCALE.ROMANIAN,
    image: require('../assets/flags/ro-RO.jpg'),
  },
  {
    textKey: 'german',
    value: ELOCALE.GERMAN,
    image: require('../assets/flags/de-DE.jpg'),
  },
  {
    textKey: 'french',
    value: ELOCALE.FRENCH,
    image: require('../assets/flags/fr-FR.jpeg'),
  },
  {
    textKey: 'spanish',
    value: ELOCALE.SPANISH,
    image: require('../assets/flags/es-ES.jpg'),
  },
  {
    textKey: 'italian',
    value: ELOCALE.ITALIAN,
    image: require('../assets/flags/it-IT.jpeg'),
  },
  {
    textKey: 'portuguese',
    value: ELOCALE.PORTUGUESE,
    image: require('../assets/flags/pt-BR.jpeg'),
  },
  {
    textKey: 'turkish',
    value: ELOCALE.TURKISH,
    image: require('../assets/flags/tr.jpg'),
  },
  {
    textKey: 'chinese',
    value: ELOCALE.CHINESE,
    image: require(`../assets/flags/zh-CN.jpeg`),
  },
];
