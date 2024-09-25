export function findUrlValue(key: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key) ?? undefined;
}
