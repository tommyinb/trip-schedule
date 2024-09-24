import { createContext } from "react";
import { HeaderState } from "./headerState";

export const TripContext = createContext<{
  headerState: HeaderState;
  setHeaderState: (state: HeaderState) => void;

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

  editable: boolean;
  setEditable: (editable: boolean) => void;
}>({
  headerState: HeaderState.View,
  setHeaderState: () => {},
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
  editable: true,
  setEditable: () => {},
});
