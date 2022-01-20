import path from 'path';
import fse from 'fs-extra';

import CONSTANTS from '@constants';
import isUsingTS from '@utils/isUsingTS';

export default async function eslintConfigGenerator() {
  console.log('Start Eslint');

  const isTypeScript = await isUsingTS();

  const configurationPath = path.join(
    CONSTANTS.configFolder,
    isTypeScript ? 'eslint-react-ts.json' : 'eslint-react-js.json',
  );

  const eslintConfiguration = await fse.readJSON(configurationPath);

  await fse.writeJSON('.eslintrc.json', eslintConfiguration, { spaces: 2 });

  console.log('End Eslint');
}
