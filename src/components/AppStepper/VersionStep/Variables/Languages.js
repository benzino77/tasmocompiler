// nativeName: https://www.internationalphoneticalphabet.org/languages/language-names-in-native-language/

const tasmotaGUILanguages = [
  {
    name: 'Afrikaans',
    value: 'af_AF',
    nativeName: 'Afrikaans',
    flag: 'flags/af.png',
    browserLang: ['af', 'af-af'],
  },
  {
    name: 'English',
    value: 'en_GB',
    nativeName: 'English',
    flag: 'flags/gb.png',
    browserLang: ['en', 'en-us', 'en-gb'],
  },
  {
    name: 'Bulgarian',
    value: 'bg_BG',
    nativeName: 'Български',
    flag: 'flags/bg.png',
    browserLang: ['bg', 'bg-bg'],
  },
  {
    name: 'Czech',
    value: 'cs_CZ',
    nativeName: 'Čeština',
    flag: 'flags/cz.png',
    browserLang: ['cs', 'cs-cz'],
  },
  {
    name: 'German',
    value: 'de_DE',
    nativeName: 'Deutsch',
    flag: 'flags/de.png',
    browserLang: ['de', 'de-de'],
  },
  {
    name: 'Greek',
    value: 'el_GR',
    nativeName: 'Ελληνικά',
    flag: 'flags/gr.png',
    browserLang: ['el', 'el-gr'],
  },
  {
    name: 'Spanish',
    value: 'es_ES',
    nativeName: 'Español',
    flag: 'flags/es.png',
    browserLang: ['es', 'es-es'],
  },
  {
    name: 'French',
    value: 'fr_FR',
    nativeName: 'Français',
    flag: 'flags/fr.png',
    browserLang: ['fr', 'fr-fr'],
  },
  {
    name: 'Hebrew',
    value: 'he_HE',
    nativeName: 'עִבְרִית',
    flag: 'flags/he.png',
    browserLang: ['he', 'he-he'],
  },
  {
    name: 'Hungarian',
    value: 'hu_HU',
    nativeName: 'Magyar',
    flag: 'flags/hu.png',
    browserLang: ['hu', 'hu-hu'],
  },
  {
    name: 'Italian',
    value: 'it_IT',
    nativeName: 'Italiano',
    flag: 'flags/it.png',
    browserLang: ['it', 'it-it'],
  },
  {
    name: 'Korean',
    value: 'ko_KO',
    nativeName: '한국어',
    flag: 'flags/ko.png',
    browserLang: ['ko', 'ko-kr'],
  },
  {
    name: 'Dutch',
    value: 'nl_NL',
    nativeName: 'Nederlands',
    flag: 'flags/nl.png',
    browserLang: ['nl'],
  },
  {
    name: 'Polish',
    value: 'pl_PL',
    nativeName: 'Polski',
    flag: 'flags/pl.png',
    browserLang: ['pl', 'pl-pl'],
  },
  {
    name: 'Portuguese (Brazil)',
    value: 'pt_BR',
    nativeName: 'Português (Brasileiro)',
    flag: 'flags/br.png',
    browserLang: ['pt-br'],
  },
  {
    name: 'Portuguese',
    value: 'pt_PT',
    nativeName: 'Português',
    flag: 'flags/pt.png',
    browserLang: ['pt', 'pt-pt'],
  },
  {
    name: 'Romanian',
    value: 'ro_RO',
    nativeName: 'Română',
    flag: 'flags/ro.png',
    browserLang: ['ro', 'ro-ro'],
  },
  {
    name: 'Russian',
    value: 'ru_RU',
    nativeName: 'Русский',
    flag: 'flags/ru.png',
    browserLang: ['ru', 'ru-ru'],
  },
  {
    name: 'Slovak',
    value: 'sk_SK',
    nativeName: 'Slovenčina',
    flag: 'flags/sk.png',
    browserLang: ['sk', 'sk-sk'],
  },
  {
    name: 'Swedish',
    value: 'sv_SE',
    nativeName: 'Svenska',
    flag: 'flags/se.png',
    browserLang: ['se', 'sv-se'],
  },
  {
    name: 'Turkish',
    value: 'tr_TR',
    nativeName: 'Türkçe',
    flag: 'flags/tr.png',
    browserLang: ['tr'],
  },
  {
    name: 'Ukrainian',
    value: 'uk_UA',
    nativeName: 'Українська',
    flag: 'flags/ua.png',
    browserLang: ['uk', 'uk-ua'],
  },
  {
    name: 'Vietnam',
    value: 'vi_VN',
    nativeName: 'Tiếng việt',
    flag: 'flags/vn.png',
    browserLang: ['vi', 'vi-vn'],
  },
  {
    name: 'Chinese (Simplified)',
    value: 'zh_CN',
    nativeName: '汉语',
    flag: 'flags/cn.png',
    browserLang: ['zh-cn'],
  },
  {
    name: 'Chinese (Traditional)',
    value: 'zh_TW',
    nativeName: '漢語',
    flag: 'flags/tw.png',
    browserLang: ['zh-tw'],
  },
  {
    name: 'Frisian',
    value: 'fy_NL',
    nativeName: 'Frysk',
    flag: 'flags/nl.png',
    browserLang: ['fy', 'fy-nl'],
  },
];

// What default language should be selected for Tasmota GUI
// it is based on user browser language setting
const browserLanguage = navigator.language.toLocaleLowerCase();

let languageIndex = tasmotaGUILanguages.findIndex((element) =>
  element.browserLang.includes(browserLanguage)
);

// Set English as default
if (languageIndex === -1) {
  languageIndex = tasmotaGUILanguages.findIndex((element) =>
    element.value.includes('en_GB')
  );
}

const preselectedTasmotaGUILanguage = tasmotaGUILanguages[languageIndex].value;

export { tasmotaGUILanguages, preselectedTasmotaGUILanguage };
