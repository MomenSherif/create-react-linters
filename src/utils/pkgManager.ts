import { execSync } from 'child_process';
import c from 'ansi-colors';
import fse from 'fs-extra';

import { primaryColor } from '@prompts/shared';

interface InstallOptions {
  dev?: boolean;
  exact?: boolean;
}

const defaultInstallOptions: InstallOptions = {
  dev: true,
  exact: false,
};

class PackageManager {
  private isNpm = this.detectIsUsingNpm();

  async install(
    deps: string | string[],
    options: InstallOptions = defaultInstallOptions,
  ): Promise<void> {
    const { dev = true, exact = false } = options;
    const packages = typeof deps === 'string' ? deps : deps.join(' ');

    const isUsingNpm = await this.isNpm;

    let command: string;
    if (isUsingNpm) {
      command = [
        'npm install',
        dev && '--save-dev',
        exact && '--save-exact',
        packages,
      ]
        .filter(Boolean)
        .join(' ');
    } else {
      command = ['yarn add', dev && '--dev', exact && '--exact', packages]
        .filter(Boolean)
        .join(' ');
    }

    console.log(`\n🚀 ${primaryColor('Installing')} ${packages}\n`);

    await execSync(command, { stdio: 'inherit' });

    console.log(
      c.green(`\n✔ Installed Successfully 🚀 ${primaryColor(packages)}\n`),
    );
  }

  async runCommand(command: string) {
    const stdout = await execSync(command);
    return stdout.toString();
  }

  private async detectIsUsingNpm() {
    const isYarn = await fse.pathExists('yarn.lock');
    return !isYarn;
  }
}

export default new PackageManager();
