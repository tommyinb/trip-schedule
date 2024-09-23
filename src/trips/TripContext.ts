import { createContext } from "react";

export const TripContext = createContext<{
  name: string;
  setName: (name: string) => void;

  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;

  startHour: number;
  setStartHour: (hour: number) => void;
  endHour: number;
  setEndHour: (hour: number) => void;
}>({
  name: "Trip Schedule",
  setName: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  startHour: 6,
  setStartHour: () => {},
  endHour: 5,
  setEndHour: () => {},
});
