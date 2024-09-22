export function getDateText(date: Date) {
  const yearText = date.getFullYear().toString().padStart(4, "0");
  const monthText = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayText = date.getDate().toString().padStart(2, "0");

  return `${yearText}/${monthText}/${dayText}`;
}
