// TODO: add types, currently it's hack because we don't have interface for the data

export function convertEmptyStringsToNull<T extends Record<string, any>>(obj: T): T {
  if (!obj) return obj;

  const entries = Object.entries(obj);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const newEntries = entries.map(([key, value]) => [key, value === '' ? null : value]);

  const newObj = Object.fromEntries(newEntries) as T;

  return newObj;
}
