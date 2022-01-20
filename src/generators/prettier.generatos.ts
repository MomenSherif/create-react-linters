import path from 'path';
import fse from 'fs-extra';

import CONSTANTS from '@constants';

export default async function prettierConfigGenerator() {
  // install prettier

  console.log('Start Prettier');

  const file = await fse.readJSON(
    path.join(CONSTANTS.configFolder, 'prettier.json'),
  );

  await fse.writeJSON('.prettierrc.json', file, { spaces: 2 });

  const hasEslintConfiguration = await fse.pathExists('.eslintrc.json');
  const hasStylelintConfiguration = await fse.pathExists('.stylelintrc.json');

  if (hasEslintConfiguration) await integratePrettierWithEslint();
  if (hasStylelintConfiguration) await integreatePrettierWithStylelint();

  console.log('End Prettier');
}

async function integratePrettierWithEslint() {
  // Install prettier config & plugin

  const eslintConfig = await fse.readJSON('.eslintrc.json');
  // extend eslint-config-prettier
  if (!eslintConfig.extends.some((config: string) => config === 'prettier'))
    eslintConfig.extends.push('prettier');

  // add eslint-plugin-prettier
  if (!eslintConfig.plugins.some((config: string) => config === 'prettier'))
    eslintConfig.plugins.push('prettier');

  eslintConfig.rules['prettier/prettier'] = 'error';

  await fse.writeJSON('.eslintrc.json', eslintConfig, { spaces: 2 });
}

async function integreatePrettierWithStylelint() {
  const stylelintConfig = await fse.readJSON('.stylelintrc.json');

  if (stylelintConfig.extends.includes('stylelint-config-prettier')) return;

  // install stylelint-config-prettier stylelint-prettier [plugin]

  stylelintConfig.extends.push('stylelint-config-prettier');

  stylelintConfig.plugins = stylelintConfig.plugins
    ? stylelintConfig.plugins.concat('stylelint-prettier')
    : ['stylelint-prettier'];

  stylelintConfig.rules['prettier/prettier'] = true;

  await fse.writeJSON('.stylelintrc.json', stylelintConfig, { spaces: 2 });
}
