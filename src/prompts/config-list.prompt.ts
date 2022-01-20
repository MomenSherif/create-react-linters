import { prompt } from 'enquirer';
import c from 'ansi-colors';

import { ConfigValues } from '@types';
import { availableConfigs } from '@configurations';
import { onCancel, prefix, styles, primaryColor } from '@prompts/shared';

export default async function configListPrompt() {
  const { configs } = await prompt<{
    configs: ConfigValues[];
  }>({
    name: 'configs',
    type: 'multiselect',
    message: primaryColor('Select linters you like to inegrate with!'),
    hint: '(Use <space> to select, <a> to toggle select/deselect all, <return> to submit)',
    choices: Object.keys(availableConfigs),
    validate: value =>
      value.length === 0 ? c.red('Choose at least one 🙄') : true,
    // @ts-ignore
    prefix,
    symbols: {
      indicator: function () {
        return {
          on: primaryColor(c.symbols.check),
          off: c.gray(c.symbols.check),
        };
      },
    },
    styles,
    onCancel,
  });

  return configs;
}
