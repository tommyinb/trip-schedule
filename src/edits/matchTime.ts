export function matchTime(text: string) {
  const match = /(\d+)\s*:\s*(\d+)/.exec(text);
  if (!match) {
    return undefined;
  }

  const [, hourText, minuteText] = match;

  const hourValue = parseInt(hourText);
  const minuteValue = parseInt(minuteText);

  return {
    hour: (hourValue + Math.floor(minuteValue / 60)) % 24,
    minute: minuteValue % 60,
  };
}
