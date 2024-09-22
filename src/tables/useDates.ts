import { useContext, useMemo } from "react";
import { TripContext } from "../trips/TripContext";

export function useDates() {
  const { startDate, endDate, startHour, endHour } = useContext(TripContext);

  return useMemo(() => {
    const fromDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    if (startDate.getHours() < startHour && startDate.getHours() <= endHour) {
      fromDate.setDate(fromDate.getDate() - 1);
    }

    const outputDates = [];

    for (
      let currentDate = new Date(fromDate);
      currentDate <= endDate;
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
  }, [endDate, endHour, startDate, startHour]);
}
