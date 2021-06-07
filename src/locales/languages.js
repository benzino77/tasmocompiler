import localeDE from './de.json';
import localeEN from './en.json';
import localeES from './es.json';
import localeIT from './it.json';
import localePL from './pl.json';
import localeCS from './cs.json';
import localeHU from './hu.json';
import localePT from './pt.json';

// nativeName: Language native name https://www.internationalphoneticalphabet.org/languages/language-names-in-native-language/
// flag: PNG 24px width proportional icon name from public/flags folder for most typical country of this language
const allMessages = {
  de: {
    source: localeDE,
    nativeName: 'Deutsch',
    flag: 'flags/de.png',
    browserLang: ['de', 'de-de'],
  },
  en: {
    source: localeEN,
    nativeName: 'English',
    flag: 'flags/gb.png',
    browserLang: ['en', 'en-gb', 'en-us'],
  },
  es: {
    source: localeES,
    nativeName: 'Español',
    flag: 'flags/es.png',
    browserLang: ['es', 'es-es'],
  },
  it: {
    source: localeIT,
    nativeName: 'Italiano',
    flag: 'flags/it.png',
    browserLang: ['it', 'it-it'],
  },
  pl: {
    source: localePL,
    nativeName: 'Polski',
    flag: 'flags/pl.png',
    browserLang: ['pl', 'pl-pl'],
  },
  pt: {
    source: localePT,
    nativeName: 'Português',
    flag: 'flags/pt.png',
    browserLang: ['pt', 'pt-pt'],
  },
  cs: {
    source: localeCS,
    nativeName: 'Čeština',
    flag: 'flags/cz.png',
    browserLang: ['cs', 'cs-cz'],
  },
  hu: {
    source: localeHU,
    nativeName: 'Magyar',
    flag: 'flags/hu.png',
    browserLang: ['hu', 'hu-hu'],
  },
};

// source of truth
const baseTranslation = 'en';

// get all defined translations other then source of truth
const translations = Object.keys(allMessages).filter(
  (l) => l !== baseTranslation
);

// if particular translation does not have some translation, add the translation from baseTranslation
Object.keys(allMessages[baseTranslation].source).forEach((e) => {
  translations.forEach((t) => {
    if (!allMessages[t].source.hasOwnProperty(e)) {
      allMessages[t].source[e] = allMessages[baseTranslation].source[e];
    }
  });
});

const defaultLanguage = baseTranslation;
export { allMessages, defaultLanguage };
