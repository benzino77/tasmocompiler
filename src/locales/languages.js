import localeEN from '../locales/en.json';
import localeES from '../locales/es.json';
import localeIT from '../locales/it.json';
import localePL from '../locales/pl.json';
import localeCS from '../locales/cs.json';
import localeHU from '../locales/hu.json';

const allMessages = {
  en: localeEN,
  es: localeES,
  it: localeIT,
  pl: localePL,
  cs: localeCS,
  hu: localeHU,
};

function fillMessages(locale) {
  const messages = allMessages[locale];
  for (var key in allMessages['en']) {
    if (allMessages['en'].hasOwnProperty(key)) {
      if (Object.prototype.toString.call(allMessages['en'][key]) === '[object Object]') {
        if (!messages.hasOwnProperty(key)) {
          messages[key] = {};
        }
        fillMessages(allMessages['en'][key], messages[key]);
      } else {
        if (!messages.hasOwnProperty(key)) {
          console.log('Missing translation: %s:%s', locale, key);
          messages[key] = allMessages['en'][key];
        }
      }
    }
  }
}

for (const [locale] of Object.entries(allMessages)) {
  if (locale !== 'en') {
    fillMessages(locale);
  }
}

export { allMessages };
