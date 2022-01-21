import path from 'path';
import fse from 'fs-extra';
import c from 'ansi-colors';

import CONSTANTS from '@constants';

export default async function editorConfigGenerator() {
  console.log(c.blue('\nConfiguring EditorConfig 🔨 🔨\n'));

  const file = await fse.readFile(
    path.join(CONSTANTS.configFolder, '.editorconfig'),
  );

  await fse.writeFile('.editorconfig', file);

  console.log(c.blue('EditorConfig successfully configured 🎉 🎉'));
}
