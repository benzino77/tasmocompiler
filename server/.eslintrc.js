module.exports = {
    env: {
      es6: true,
      node: true,
      browser: true,
      mocha: true,
    },
    extends: 'airbnb',
    root: true,
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': false }]
    },
};
