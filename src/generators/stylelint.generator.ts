import path from 'path';
import fse from 'fs-extra';

import CONSTANTS from '@constants';
import isUsingSCSS from '@utils/isUsingSCSS';

export default async function stylelintConfigGenerator() {
  console.log('Stylelint start');
  /* Install
  - stylelint
  - Sass stylelint-config-standard-scss
  - CSS stylelint-config-standard
  */
  const isSCSS = await isUsingSCSS();

  const configurationPath = path.join(
    CONSTANTS.configFolder,
    isSCSS ? 'stylelint-scss.json' : 'stylelint-css.json',
  );

  const stylelintConfiguration = await fse.readJSON(configurationPath);

  await fse.writeJSON('.stylelintrc.json', stylelintConfiguration, {
    spaces: 2,
  });

  console.log('Stylelint end');
}
