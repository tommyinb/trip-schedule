export function getTimeText(hour: number, minute: number) {
  const hourText = hour.toString().padStart(2, "0");
  const minuteText = minute.toString().padStart(2, "0");

  return `${hourText}:${minuteText}`;
}
