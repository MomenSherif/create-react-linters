import { getAllDeps } from '@utils/getAllDeps';

export default async function isUsingSCSS() {
  const { sass, 'node-sass': nodeSass } = await getAllDeps();
  return !!sass || !!nodeSass;
}
