#### How to prepare TasmoCompiler web interface translation

1. copy `src/locales/en.json` file to `<your_language_code>.json` (for example create `it.json` file to create Italian translation)
2. translate english text to your language:

##### before: 
```javascript
...
"stepWifiConfDesc": "Enter SSID and password for your WiFi network",
...
```

##### after:
```javascript
...
"stepWifiConfDesc": "YOUR TRANSLATION GOES HERE",
...
```


3. edit `src/locales/language.js` file and add your language

##### before:
```javascript
import localeEN from '../locales/en.json';
import localeES from '../locales/es.json';
import localeIT from '../locales/it.json';
import localePL from '../locales/pl.json';

export const allMessages = {
  en: localeEN,
  es: localeES,
  it: localeIT,
  pl: localesPL,
};
```

##### after:
```javascript
import localeEN from '../locales/en.json';
import localeES from '../locales/es.json';
import localesPL from '../locales/pl.json';
import localesIT from '../locales/it.json'; // add this line 

export const allMessages = {
  en: localeEN,
  es: localeES,
  pl: localesPL,
  it: localesIT, // add this line
};
```