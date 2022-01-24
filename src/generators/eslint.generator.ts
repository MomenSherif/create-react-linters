import path from 'path';
import fse from 'fs-extra';
import c from 'ansi-colors';

import CONSTANTS from '@constants';
import isUsingTS from '@utils/isUsingTS';
import pkgManager from '@utils/pkgManager';
import { Packages } from '@types';

export default async function eslintConfigGenerator() {
  console.log(c.blue('\nConfiguring Eslint 🔨 🔨'));

  const isTypeScript = await isUsingTS();

  const packages: Packages[] = [
    'eslint',
    'eslint-config-airbnb',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jest',
    'eslint-plugin-testing-library',
    'eslint-plugin-jest-dom',
    ...((isTypeScript
      ? [
          '@typescript-eslint/parser',
          '@typescript-eslint/eslint-plugin',
          'eslint-config-airbnb-typescript',
        ]
      : []) as Packages[]),
  ];

  await pkgManager.addDevDeps(packages);

  const configurationPath = path.join(
    CONSTANTS.configFolder,
    isTypeScript ? 'eslint-react-ts.json' : 'eslint-react-js.json',
  );

  const eslintConfiguration = await fse.readJSON(configurationPath);

  await fse.writeJSON('.eslintrc.json', eslintConfiguration, { spaces: 2 });

  await addScripts();

  console.log(c.blue('\nEslint successfully configured 🎉 🎉'));
}

async function addScripts() {
  await pkgManager.addScripts({
    'eslint:check':
      'eslint . --ext .js,.jsx,.ts,.tsx --ignore-path .gitignore --report-unused-disable-directives --max-warnings 0',

    'eslint:fix':
      'eslint . --fix --ext .js,.jsx,.ts,.tsx --ignore-path .gitignore --report-unused-disable-directives --max-warnings 0',
  });
}
