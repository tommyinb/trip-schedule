import { PropsWithChildren, useMemo, useState } from "react";
import { TripContext } from "./TripContext";

export function TripProvider({ children }: PropsWithChildren) {
  const [name, setName] = useState("Trip Schedule");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3);
    return endDate;
  });

  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(5);

  return (
    <TripContext.Provider
      value={useMemo(
        () => ({
          name,
          setName,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          startHour,
          setStartHour,
          endHour,
          setEndHour,
        }),
        [
          endDate,
          endHour,
          name,
          setEndDate,
          setEndHour,
          setName,
          setStartDate,
          setStartHour,
          startDate,
          startHour,
        ]
      )}
    >
      {children}
    </TripContext.Provider>
  );
}
