import { allMessages, defaultLanguage } from '../languages';
const baseTranslationKeys = Object.keys(
  allMessages[defaultLanguage].source
).sort();

let translations = [];
Object.keys(allMessages).forEach((l) => {
  if (l !== defaultLanguage) {
    translations.push([l, defaultLanguage, '']);
  }
});

describe('locales test', () => {
  it.each(translations)(
    'transalation %s should have the same amount of keys as base translation (%s)',
    (trans, base, expected) => {
      let otherTranslationKeys = Object.keys(allMessages[trans].source).sort();

      expect(otherTranslationKeys.length).toBe(baseTranslationKeys.length);
    }
  );

  it.each(translations)(
    'transalation %s should have same translations as base translation (%s)',
    (trans, base, expected) => {
      let otherTranslationKeys = Object.keys(allMessages[trans].source).sort();

      expect(otherTranslationKeys).toEqual(
        expect.arrayContaining(baseTranslationKeys)
      );
    }
  );
});
