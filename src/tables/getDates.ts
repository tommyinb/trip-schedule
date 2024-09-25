import { getDatePart } from "../edits/getDatePart";

export function getDates(fromDate: Date, toDate: Date) {
  const outputDates = [];

  for (
    let currentDate = new Date(fromDate);
    currentDate <= toDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const outputDate = getDatePart(currentDate);

    outputDates.push(outputDate);
  }

  return outputDates;
}
