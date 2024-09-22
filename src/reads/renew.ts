export function renew<T>(array: T[], olds: T[], news: T[]) {
  return [...array.filter((item) => !olds.includes(item)), ...news];
}
