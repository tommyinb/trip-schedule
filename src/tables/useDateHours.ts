import { useContext, useMemo } from "react";
import { TripContext } from "../trips/TripContext";

export function useDateHours() {
  const { startHour, endHour } = useContext(TripContext);

  return useMemo(() => {
    if (endHour > startHour) {
      return Array.from({ length: endHour - startHour + 1 }, (_, i) => ({
        date: 0,
        hour: i + startHour,
      }));
    } else {
      return [
        ...Array.from({ length: 24 - startHour }, (_, i) => ({
          date: 0,
          hour: i + startHour,
        })),
        ...Array.from({ length: endHour + 1 }, (_, i) => ({
          date: 1,
          hour: i,
        })),
      ];
    }
  }, [endHour, startHour]);
}
