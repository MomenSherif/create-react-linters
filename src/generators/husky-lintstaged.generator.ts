import fse from 'fs-extra';
import c from 'ansi-colors';

import pkgManager from '@utils/pkgManager';
import { ConfigValues } from '@types';

export default async function huskyLintStagedConfigGenerator(
  installedPackages: ConfigValues[],
) {
  console.log(c.blue('\nConfiguring Husky & Lint-Staged 🔨 🔨'));

  await pkgManager.addDevDeps(['husky', 'lint-staged', 'is-ci', 'cross-env']);

  await pkgManager.runCommand('npx husky install');

  await pkgManager.addScripts({
    prepare: 'is-ci || husky install',
  });

  // lint-staged configuration
  const hasPrettier = installedPackages.includes('Prettier');
  const hasEslint = installedPackages.includes('Eslint');
  const hasStylelint = installedPackages.includes('Stylelint');
  const hasCommitizen = installedPackages.includes('Commitizen');

  await fse.writeJSON(
    '.lintstagedrc.json',
    {
      '*.{js,js,ts,tsx}': [
        hasEslint && 'eslint --fix --max-warnings 0',
        hasPrettier && 'prettier --write',
        'cross-env CI=true npm run test --if-present  -- --findRelatedTests --bail',
      ].filter(Boolean),
      '*.{css,scss,sass}': [
        hasStylelint && 'stylelint --fix --max-warnings 0',
        hasPrettier && 'prettier --write',
      ].filter(Boolean),
      '*.{html,json,md,mdx,yml,yaml}': [
        hasPrettier && 'prettier --write',
      ].filter(Boolean),
    },
    { spaces: 2 },
  );

  // Add husky hooks 🐶
  await pkgManager.runCommand(
    'npx husky set .husky/pre-commit "npx lint-staged"',
  );

  if (installedPackages.includes('Commitlint')) {
    await pkgManager.runCommand(
      'npx husky set .husky/commit-msg "npx --no -- commitlint --edit $1"',
    );
  }

  console.log(
    c.bold.blue('\nHusky & Lint-Staged successfully configured 🎉 🎉\n'),
  );

  if (hasEslint || hasStylelint || hasPrettier || hasCommitizen) {
    console.log(
      c.bold.cyan(
        `We added scripts for ${[
          hasCommitizen && 'commit (to use commitizen)',
          hasEslint && 'eslint',
          hasStylelint && 'stylelint',
          hasPrettier && 'prettier',
        ]
          .filter(Boolean)
          .join(', ')} [check] & [fix] to use locally and in CI\n`,
      ),
    );
  }
}
