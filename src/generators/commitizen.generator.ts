import fse from 'fs-extra';

export default async function commitizenConfigGenerator() {
  console.log('Commitizen start');
  // npm i -D commitizen cz-conventional-changelog

  const packageJson = await fse.readJSON('package.json');

  packageJson.config = {
    commitizen: {
      path: 'cz-conventional-changelog',
    },
  };

  await fse.writeJSON('package.json', packageJson, { spaces: 2 });

  console.log('Commitizen end');
}
