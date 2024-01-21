module.exports = {
  'env': {
    'browser': true, // Разрешить запуск кода в браузере
    'commonjs': true,// Разрешить commonJS
    'es6': true, // Включает синтаксис ES6 автоматически
    'node': true
  },
  'extends': ['airbnb-base', 'prettier', 'eslint:recommended'],
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'import/extensions': 'off',
    'no-var': 'error',// Require let or const instead of var
    'prefer-const': 'error',// Require const declarations for variables that are never reassigned after declared
    'quotes': [
      'error',
      'single',
      { 'allowTemplateLiterals': true }
    ],
    'semi': [
      'error',
      'always'
    ],
    'space-infix-ops': [
      'error',
      { 'int32Hint': false }
    ],// Требовать пробелы вокруг инфиксных операторов =/+/-
    'key-spacing': [
      'error',
      { 'afterColon': true }
    ],
    'no-multi-spaces': 'error',// Disallow multiple spaces
    'space-in-parens': 'error',// Enforce consistent spacing inside parentheses
    'no-multiple-empty-lines': 'error',// Disallow multiple empty lines
  }
};
