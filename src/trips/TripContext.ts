import { createContext } from "react";

export const TripContext = createContext<{
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;

  startHour: number;
  setStartHour: (hour: number) => void;
  endHour: number;
  setEndHour: (hour: number) => void;
}>({
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  startHour: 6,
  setStartHour: () => {},
  endHour: 5,
  setEndHour: () => {},
});
