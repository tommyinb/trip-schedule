export function without<T>(array: T[], item: T) {
  return array.filter((i) => i !== item);
}
