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
  de: { source: localeDE, nativeName: 'Deutsch', flag: 'flags/de.png' },
  en: { source: localeEN, nativeName: 'English', flag: 'flags/gb.png' },
  es: { source: localeES, nativeName: 'Español', flag: 'flags/es.png' },
  it: { source: localeIT, nativeName: 'Italiano', flag: 'flags/it.png' },
  pl: { source: localePL, nativeName: 'Polski', flag: 'flags/pl.png' },
  pt: { source: localePT, nativeName: 'Português', flag: 'flags/pt.png' },
  cs: { source: localeCS, nativeName: 'Čeština', flag: 'flags/cz.png' },
  hu: { source: localeHU, nativeName: 'Magyar', flag: 'flags/hu.png' },
};

// source of truth
const baseTranslation = 'en';

// get all defined translations other then source of truth
const translations = Object.keys(allMessages).filter(
  (l) => l !== baseTranslation
);

// if particular translation does not have some translation, add the translation from baseTranslation
Object.keys(allMessages[baseTranslation]).forEach((e) => {
  translations.forEach((t) => {
    if (!allMessages[t].hasOwnProperty(e)) {
      allMessages[t][e] = allMessages[baseTranslation][e];
    }
  });
});

const defaultLanguage = baseTranslation;
export { allMessages, defaultLanguage };
