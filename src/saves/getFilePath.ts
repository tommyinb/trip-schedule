export const prefixRaise = 10000000000000;

export function getFilePath(shareId: string) {
  const shareValue = parseInt(shareId, 36);

  const timeValue = shareValue % prefixRaise;
  const timeDate = new Date(timeValue);
  const timeText = timeDate.toISOString().replace(/[-:.TZ]/g, "");

  const prefix = Math.floor(shareValue / prefixRaise);

  return `shares/${timeText}${prefix}.json`;
}
