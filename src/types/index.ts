export type ConfigValues =
  | 'Eslint'
  | 'Stylelint'
  | 'Prettier'
  | 'EditorConfig'
  | 'Commitlint'
  | 'Commitizen';

export type ConfigGenerator = (...args: any[]) => Promise<void> | void;

export type Packages =
  // eslint
  | 'eslint'
  | 'eslint-config-airbnb'
  | 'eslint-config-airbnb-typescript'
  | '@typescript-eslint/eslint-plugin'
  | '@typescript-eslint/parser'
  | 'eslint-plugin-import'
  | 'eslint-plugin-jsx-a11y'
  | 'eslint-plugin-react'
  | 'eslint-plugin-react-hooks'
  | 'eslint-plugin-jest'
  | 'eslint-plugin-jest-dom'
  | 'eslint-plugin-testing-library'
  // stylelint
  | 'stylelint'
  | 'stylelint-config-standard'
  | 'stylelint-config-standard-scss'
  // commitlint
  | '@commitlint/cli'
  | '@commitlint/config-conventional'
  // prettier
  | 'prettier'
  | 'eslint-config-prettier'
  | 'eslint-plugin-prettier'
  | 'stylelint-config-prettier'
  | 'stylelint-prettier'
  // commitizen
  | 'commitizen'
  | 'cz-conventional-changelog'
  // husky & lint-staged
  | 'cross-env'
  | 'husky'
  | 'is-ci'
  | 'lint-staged';
