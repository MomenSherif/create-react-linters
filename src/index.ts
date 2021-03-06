#!/usr/bin/env node

import c from 'ansi-colors';
import prettyMilliseconds from 'pretty-ms';

import { availableConfigs } from '@configurations';
import configListPrompt from '@prompts/config-list.prompt';
import fullPackagePrompt from '@prompts/full-package.prompt';
import huskyLintStagedConfigGenerator from '@generators/husky-lintstaged.generator';
import { ConfigValues } from '@types';

async function app() {
  console.log(
    c.yellow(
      `🚀 Setup all linters you like and don't let 💩 slip into your code base!
    🎯 Eslint
    ✨ Stylelint
    🛑 Commitlint
    💄 Prettier
    📃 EditorConfig
    💻 Commitizen

     ${c.italic.blue('Will run against')}

          👇

    😍 Husky & Lint-Staged 😍
  `,
    ),
  );

  let configs: ConfigValues[];

  const isFullPackage = await fullPackagePrompt();

  if (isFullPackage) {
    configs = Object.keys(availableConfigs) as ConfigValues[];
  } else {
    configs = await configListPrompt();
  }

  const start = performance.now();

  for (const config of configs) {
    const configGenerator = availableConfigs[config];
    await configGenerator();
  }

  await huskyLintStagedConfigGenerator(configs);

  const end = performance.now();

  console.log(
    `${c.yellow(
      `${c.bold('TA-DAAA')} in ${prettyMilliseconds(
        end - start,
      )} 🎉 Enjoy Coding 👋`,
    )}`,
  );

  console.log(c.blue('\nRun npm install'));
}

app().catch(e => {
  console.log(e);

  if (e) console.log(c.red('Something went wrong!! 😢'));
});
