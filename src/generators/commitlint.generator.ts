import fse from 'fs-extra';
import c from 'ansi-colors';
import pkgManager from '@utils/pkgManager';

export default async function commitlintConfigGenerator() {
  console.log(c.blue('\nConfiguring Commitlint 🔨 🔨'));

  await pkgManager.addDevDeps([
    '@commitlint/cli',
    '@commitlint/config-conventional',
  ]);

  await fse.writeJSON(
    '.commitlintrc.json',
    {
      extends: ['@commitlint/config-conventional'],
    },
    { spaces: 2 },
  );

  console.log(c.blue('\nCommitlint successfully configured 🎉 🎉'));
}
