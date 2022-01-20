import { getAllDeps } from '@utils/getAllDeps';

export default async function isUsingTS() {
  const { typescript } = await getAllDeps();
  return !!typescript;
}
