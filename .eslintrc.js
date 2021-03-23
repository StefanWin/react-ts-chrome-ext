module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeaturs: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript/base',
  ],

  rules: {
    // disable rules that are currently bugged
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/space-infix-ops': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
  },
};
