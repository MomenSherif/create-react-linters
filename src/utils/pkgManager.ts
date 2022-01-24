import { execSync } from 'child_process';
import c from 'ansi-colors';
const PackageJson = require('@npmcli/package-json');

import { primaryColor } from '@prompts/shared';
import CONSTANTS from '@constants';

class PackageManager {
  private pkgJsonLoader = this.loadPackageJson();

  async addDevDeps(
    packages: (keyof typeof CONSTANTS.packages)[],
  ): Promise<void> {
    const deps = packages.map(pkg => [pkg, CONSTANTS.packages[pkg]]);

    const pkgJson = await this.pkgJsonLoader;

    pkgJson.update({
      devDependencies: {
        ...pkgJson.content.devDependencies,
        ...Object.fromEntries(deps),
      },
      // @npmcli/package-json Docs says
      // When working with dependencies, it's important to provide values for all known dependency types as the update logic has some interdependence in between these properties.
      dependencies: pkgJson.content.dependencies,
      peerDependencies: pkgJson.content.peerDependencies,
      optionalDependencies: pkgJson.content.optionalDependencies,
    });

    await pkgJson.save();

    console.log(
      c.green(
        `\n✔ Added Packages 🚀 ${primaryColor(
          deps.map(([pkg, version]) => `${pkg}@${version}`).join(' '),
        )}`,
      ),
    );
  }

  async addScripts(scripts: Record<string, string>): Promise<void> {
    const pkgJson = await this.pkgJsonLoader;

    pkgJson.update({
      scripts: {
        ...pkgJson.content.scripts,
        ...scripts,
      },
    });

    await pkgJson.save();

    console.log(
      c.green(
        `\n✔ Added Scripts 🚀 ${primaryColor(Object.keys(scripts).join(' '))}`,
      ),
    );
  }

  async update(updates: Record<string, any>): Promise<void> {
    const pkgJson = await this.pkgJsonLoader;
    pkgJson.update(updates);
    await pkgJson.save();
  }

  async runCommand(command: string): Promise<void> {
    await execSync(command, { stdio: 'inherit' });
  }

  private async loadPackageJson() {
    const pkgJson = await PackageJson.load(process.cwd());
    return pkgJson;
  }
}

export default new PackageManager();
