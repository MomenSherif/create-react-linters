import path from 'path';
import fse from 'fs-extra';

import CONSTANTS from '@constants';

export default async function editorConfigGenerator() {
  console.log('Start EditorConfig');

  const file = await fse.readFile(
    path.join(CONSTANTS.configFolder, '.editorconfig'),
  );

  await fse.writeFile('.editorconfig', file);

  console.log('End EditorConfig');
}
