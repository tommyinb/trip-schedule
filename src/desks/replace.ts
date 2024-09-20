export function replace<T>(array: T[], from: T, to: T) {
  return array.map((item) => (item === from ? to : item));
}
