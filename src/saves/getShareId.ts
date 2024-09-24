export function getShareId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("shareId") ?? undefined;
}
