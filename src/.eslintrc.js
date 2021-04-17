module.exports = {
    extends: [
      'react-app',
      'airbnb',
    ],
    rules: {
      'react/jsx-filename-extension': [
        1,
        {
          extensions: [
            '.js',
            '.jsx',
          ]
        }
      ],
      'no-param-reassign': [ 'error', {
          'props': false
        }],
      'indent': ['error', 2],
      'no-unused-vars': 'error',
      'prefer-template': 'error',
      'no-unneeded-ternary': 'error',
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'always'],
      'no-console': ['warn', {
          'allow': ['warn',
            'error',
          ]},
      ],
      'operator-linebreak': [
        'error',
        'after',
        {
          'overrides': {
            '?': 'before',
            ':': 'before'
          }
        },
      ],
      'comma-spacing': ['error', {
        'before': false,
        'after': true
       }],
      'comma-dangle': [
        'error', {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
          'functions': 'never'
        }
      ],
      'object-curly-newline': [
        'error', {
          'ObjectExpression': {'multiline': true},
          'ObjectPattern': {'multiline': true},
          'ImportDeclaration': 'never',
          'ExportDeclaration': {'multiline': true}
        }
      ],      
      'prefer-const': [
        'error', {
          'ignoreReadBeforeAssign': false,
          'destructuring': 'any'
        }
      ],
      'react/jsx-tag-spacing': [
        'error', {
          'closingSlash': 'never',
          'beforeSelfClosing': 'always',
          'afterOpening': 'never',
          'beforeClosing': 'allow'
        }
      ],      
    }
  }
