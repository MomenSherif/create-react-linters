import commitizenConfigGenerator from '@generators/commitizen.generator';
import commitlintConfigGenerator from '@generators/commitlint.generator';
import editorConfigGenerator from '@generators/editorconfig.generator';
import eslintConfigGenerator from '@generators/eslint.generator';
import prettierConfigGenerator from '@generators/prettier.generatos';
import stylelintConfigGenerator from '@generators/stylelint.generator';

import { ConfigGenerator, ConfigValues } from '@types';

export const availableConfigs: Record<ConfigValues, ConfigGenerator> = {
  Eslint: eslintConfigGenerator,
  Stylelint: stylelintConfigGenerator,
  Commitlint: commitlintConfigGenerator,
  Prettier: prettierConfigGenerator,
  EditorConfig: editorConfigGenerator,
  Commitizen: commitizenConfigGenerator,
};
