import Path from 'path';

import { Packages } from '@types';

type Constants = {
  configFolder: string;
  packages: Record<Packages, string>;
};

const CONSTANTS: Constants = {
  configFolder: Path.join(__dirname, './configurations'),
  packages: {
    // eslint
    eslint: '^8.7.0',
    'eslint-config-airbnb': '^19.0.4',
    'eslint-config-airbnb-typescript': '^16.1.0',
    '@typescript-eslint/eslint-plugin': '^5.10.0',
    '@typescript-eslint/parser': '^5.10.0',
    'eslint-plugin-import': '^2.25.4',
    'eslint-plugin-jsx-a11y': '^6.5.1',
    'eslint-plugin-react': '^7.28.0',
    'eslint-plugin-react-hooks': '^4.3.0',
    'eslint-plugin-jest': '^26.0.0',
    'eslint-plugin-jest-dom': '^4.0.1',
    'eslint-plugin-testing-library': '^5.0.4',
    // stylelint
    stylelint: '^14.3.0',
    'stylelint-config-standard': '^24.0.0',
    'stylelint-config-standard-scss': '^3.0.0',
    //commitlint
    '@commitlint/cli': '^16.1.0',
    '@commitlint/config-conventional': '^16.0.0',
    // prettier
    prettier: '2.5.1',
    'eslint-config-prettier': '^8.3.0',
    'eslint-plugin-prettier': '^4.0.0',
    'stylelint-config-prettier': '^9.0.3',
    'stylelint-prettier': '^2.0.0',
    // commitizen
    commitizen: '^4.2.4',
    'cz-conventional-changelog': '^3.3.0',
    // husky & lint-staged
    'cross-env': '^7.0.3',
    husky: '^7.0.4',
    'is-ci': '^3.0.1',
    'lint-staged': '^12.3.1',
  },
};

export default CONSTANTS;
