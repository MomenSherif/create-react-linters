import fse from 'fs-extra';
import c from 'ansi-colors';
import pkgManager from '@utils/pkgManager';

export default async function commitizenConfigGenerator() {
  console.log(c.blue('\nConfiguring Commitizen 🔨 🔨'));

  await pkgManager.addDevDeps(['commitizen', 'cz-conventional-changelog']);

  await pkgManager.update({
    config: {
      commitizen: {
        path: 'cz-conventional-changelog',
      },
    },
  });

  await pkgManager.addScripts({
    commit: 'cz',
  });

  console.log(c.blue('\nCommtizien successfully configured 🎉 🎉'));
}
