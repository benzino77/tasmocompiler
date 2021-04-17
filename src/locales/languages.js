import localeEN from './en.json';
import localeES from './es.json';
import localeIT from './it.json';
import localePL from './pl.json';
import localeCS from './cs.json';
import localeHU from './hu.json';
import localePT from './pt.json';

const allMessages = {
  en: localeEN,
  es: localeES,
  it: localeIT,
  pl: localePL,
  pt: localePT,
  cs: localeCS,
  hu: localeHU,
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

export { allMessages };
