import c from 'ansi-colors';

import { availableConfigs } from '@configurations';
import configListPrompt from '@prompts/config-list.prompt';
import fullPackagePrompt from '@prompts/full-package.prompt';

async function app() {
  const isFullPackage = await fullPackagePrompt();

  if (isFullPackage) return console.log('installing all');

  const configs = await configListPrompt();

  for (const config of configs) {
    const configGenerator = availableConfigs[config];
    await configGenerator();
  }
}

app().catch(e => {
  console.log(e);

  if (e) console.log(c.red('Something went wrong!! 😢'));
});
