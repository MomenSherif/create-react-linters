import path from 'path';
import fse from 'fs-extra';
import c from 'ansi-colors';

import pkgManager from '@utils/pkgManager';
import CONSTANTS from '@constants';

export default async function prettierConfigGenerator() {
  console.log(c.blue('\nConfiguring Prettier 🔨 🔨'));

  await pkgManager.addDevDeps(['prettier']);

  const file = await fse.readJSON(
    path.join(CONSTANTS.configFolder, 'prettier.json'),
  );

  await fse.writeJSON('.prettierrc.json', file, { spaces: 2 });

  const [hasEslintConfiguration, hasStylelintConfiguration] = await Promise.all(
    [fse.pathExists('.eslintrc.json'), fse.pathExists('.stylelintrc.json')],
  );

  if (hasEslintConfiguration) await integratePrettierWithEslint();
  if (hasStylelintConfiguration) await integreatePrettierWithStylelint();

  await addScripts();

  console.log(c.blue('\nPrettier successfully configured 🎉 🎉'));
}

async function integratePrettierWithEslint() {
  await pkgManager.addDevDeps([
    'eslint-config-prettier',
    'eslint-plugin-prettier',
  ]);

  const eslintConfig = await fse.readJSON('.eslintrc.json');
  // extend eslint-config-prettier
  if (!eslintConfig.extends.some((config: string) => config === 'prettier')) {
    eslintConfig.extends.push('prettier');
  }

  // add eslint-plugin-prettier
  if (!eslintConfig.plugins.some((config: string) => config === 'prettier')) {
    eslintConfig.plugins.push('prettier');
  }

  eslintConfig.rules['prettier/prettier'] = 'error';

  await fse.writeJSON('.eslintrc.json', eslintConfig, { spaces: 2 });
}

async function integreatePrettierWithStylelint() {
  await pkgManager.addDevDeps([
    'stylelint-config-prettier',
    'stylelint-prettier',
  ]);

  const stylelintConfig = await fse.readJSON('.stylelintrc.json');

  if (!stylelintConfig.extends.includes('stylelint-config-prettier')) {
    stylelintConfig.extends.push('stylelint-config-prettier');
  }

  stylelintConfig.plugins = stylelintConfig.plugins
    ? stylelintConfig.plugins.concat('stylelint-prettier')
    : ['stylelint-prettier'];

  stylelintConfig.rules['prettier/prettier'] = true;

  await fse.writeJSON('.stylelintrc.json', stylelintConfig, { spaces: 2 });
}

async function addScripts() {
  await pkgManager.addScripts({
    'prettier:check': 'prettier . --check --ignore-unknown',
    'prettier:fix': 'prettier . --write --ignore-unknown',
  });
}
