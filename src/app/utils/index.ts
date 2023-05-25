export * from './color';

export function isEmptyObject(object: Object) {
  return JSON.stringify(object) === '{}';
}
