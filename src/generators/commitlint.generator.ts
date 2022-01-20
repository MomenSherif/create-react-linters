import fse from 'fs-extra';

export default async function commitlintConfigGenerator() {
  console.log('Commitlint start');

  await fse.writeJSON(
    '.commitlintrc.json',
    {
      extends: ['@commitlint/config-conventional'],
    },
    { spaces: 2 },
  );

  console.log('Commitlint end');
}
