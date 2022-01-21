import fse from 'fs-extra';
import c from 'ansi-colors';
import pkgManager from '@utils/pkgManager';

export default async function commitizenConfigGenerator() {
  console.log(c.blue('\nConfiguring Commitizen 🔨 🔨'));

  await pkgManager.install(['commitizen', 'cz-conventional-changelog']);

  const packageJson = await fse.readJSON('package.json');

  packageJson.config = {
    commitizen: {
      path: 'cz-conventional-changelog',
    },
  };

  await fse.writeJSON('package.json', packageJson, { spaces: 2 });

  await pkgManager.runCommand('npm set-script commit "cz"');

  console.log(c.blue('Commtizien successfully configured 🎉 🎉'));
}
