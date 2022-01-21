import path from 'path';
import fse from 'fs-extra';
import c from 'ansi-colors';

import CONSTANTS from '@constants';
import isUsingSCSS from '@utils/isUsingSCSS';
import pkgManager from '@utils/pkgManager';

export default async function stylelintConfigGenerator() {
  console.log(c.blue('\nConfiguring Stylelint 🔨 🔨'));

  const isSCSS = await isUsingSCSS();

  const packages = [
    'stylelint',
    isSCSS ? 'stylelint-config-standard-scss' : 'stylelint-config-standard',
  ];

  await pkgManager.install(packages);

  const configurationPath = path.join(
    CONSTANTS.configFolder,
    isSCSS ? 'stylelint-scss.json' : 'stylelint-css.json',
  );

  const stylelintConfiguration = await fse.readJSON(configurationPath);

  await fse.writeJSON('.stylelintrc.json', stylelintConfiguration, {
    spaces: 2,
  });

  await addScripts();

  console.log(c.blue('Stylelint successfully configured 🎉 🎉'));
}

async function addScripts() {
  await Promise.all([
    pkgManager.runCommand(
      'npm set-script stylelint:check "stylelint **/*.{css,scss,sass} --ignore-path .gitignore --max-warnings 0"',
    ),
    pkgManager.runCommand(
      'npm set-script stylelint:fix "stylelint **/*.{css,scss,sass} --fix --ignore-path .gitignore --max-warnings 0"',
    ),
  ]);
}
