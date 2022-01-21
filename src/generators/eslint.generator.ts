import path from 'path';
import fse from 'fs-extra';
import c from 'ansi-colors';

import CONSTANTS from '@constants';
import isUsingTS from '@utils/isUsingTS';
import pkgManager from '@utils/pkgManager';

export default async function eslintConfigGenerator() {
  console.log(c.blue('\nConfiguring Eslint 🔨 🔨'));

  const packagesMap = await fetchEslintPackagesInfo();
  const eslintPackages = Object.entries(packagesMap).map(
    // get latest version ex: '^7.8.2 || ^8.2.4'
    ([pkg, version]) => `${pkg}@${version.split('||').pop()?.trim()}`,
  );

  // extend airbnb configuration
  eslintPackages.unshift('eslint-config-airbnb');

  // testing
  eslintPackages.push(
    'eslint-plugin-jest',
    'eslint-plugin-testing-library',
    'eslint-plugin-jest-dom',
  );

  const isTypeScript = await isUsingTS();
  if (isTypeScript)
    eslintPackages.push(
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      'eslint-config-airbnb-typescript',
    );

  await pkgManager.install(eslintPackages);

  const configurationPath = path.join(
    CONSTANTS.configFolder,
    isTypeScript ? 'eslint-react-ts.json' : 'eslint-react-js.json',
  );

  const eslintConfiguration = await fse.readJSON(configurationPath);

  await fse.writeJSON('.eslintrc.json', eslintConfiguration, { spaces: 2 });

  await addScripts();

  console.log(c.blue('Eslint successfully configured 🎉 🎉'));
}

// detect all peerDependencies required versions for eslint-config-airbnb
async function fetchEslintPackagesInfo(): Promise<Record<string, string>> {
  const eslintPackagesString = await pkgManager.runCommand(
    'npm info "eslint-config-airbnb@latest" peerDependencies',
  );

  return JSON.parse(
    eslintPackagesString.replace(/'/g, '"').replace('eslint', '"eslint"'),
  );
}

async function addScripts() {
  await Promise.all([
    pkgManager.runCommand(
      'npm set-script eslint:check "eslint . --ext .js,.jsx,.ts,.tsx --ignore-path .gitignore --report-unused-disable-directives --max-warnings 0"',
    ),
    pkgManager.runCommand(
      'npm set-script eslint:fix "eslint . --fix --ext .js,.jsx,.ts,.tsx --ignore-path .gitignore --report-unused-disable-directives --max-warnings 0"',
    ),
  ]);
}
