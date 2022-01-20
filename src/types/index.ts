export type ConfigValues =
  | 'Eslint'
  | 'Stylelint'
  | 'Prettier'
  | 'EditorConfig'
  | 'Commitlint'
  | 'Commitizen';

export type ConfigGenerator = (...args: any[]) => Promise<void> | void;
