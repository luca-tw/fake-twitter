export function stringToArray({ value }: { value: string | string[] }) {
  if (typeof value === 'string' && value.trim() !== '') {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.filter((v) => v.trim() !== '');
  }
}
