import { useContext, useMemo } from "react";
import { TripContext } from "../trips/TripContext";
import { getDates } from "./getDates";

export function useDates() {
  const { startDate, endDate } = useContext(TripContext);

  return useMemo(() => getDates(startDate, endDate), [endDate, startDate]);
}
