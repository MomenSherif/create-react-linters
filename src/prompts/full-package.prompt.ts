import { prompt } from 'enquirer';

import {
  onCancel, prefix, styles, primaryColor,
} from '@prompts/shared';

export default async function fullPackagePrompt() {
  const { isFullPackage } = await prompt<{ isFullPackage: boolean }>({
    name: 'isFullPackage',
    type: 'toggle',
    message: primaryColor('Do you want to integrate all linters?'),
    initial: true,
    onCancel,
    // @ts-ignore | enquirer lack ok types, but it's cool :D
    prefix,
    styles,
    enabled: 'Yes',
    disabled: 'No',
  });

  return isFullPackage;
}
