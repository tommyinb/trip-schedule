export function getDates(fromDate: Date, toDate: Date) {
  const outputDates = [];

  for (
    let currentDate = new Date(fromDate);
    currentDate <= toDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const outputDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    outputDates.push(outputDate);
  }

  return outputDates;
}
