import fse from 'fs-extra';

const pkgJsonAllDeps = fse.readJSON('package.json').then(pkgJson => {
  const { dependencies, devDependencies, peerDependencies } = pkgJson;
  return { ...dependencies, ...devDependencies, ...peerDependencies };
});

export async function getAllDeps() {
  return pkgJsonAllDeps;
}
