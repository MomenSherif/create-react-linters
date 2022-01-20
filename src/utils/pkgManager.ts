import { execSync } from 'child_process';
import c from 'ansi-colors';
import { createSpinner } from 'nanospinner';
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
  private spinner = createSpinner();

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

    this.spinner.start({
      text: `Installing 🚀 ${packages}`,
    });
    // await execSync(command, { stdio: 'inherit' });
    this.spinner.success({
      text: c.green(`Installed Successfully 🚀 ${primaryColor(packages)}`),
    });
  }

  async runCommand(command: string) {
    await execSync(command, { stdio: 'inherit' });
  }

  private async detectIsUsingNpm() {
    const isYarn = await fse.pathExists('yarn.lock');
    return !isYarn;
  }
}

export default new PackageManager();
