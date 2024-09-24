import { PropsWithChildren, useMemo, useState } from "react";
import { TripContext } from "./TripContext";
import { HeaderState } from "./headerState";

export function TripProvider({ children }: PropsWithChildren) {
  const [headerState, setHeaderState] = useState(HeaderState.View);

  const [name, setName] = useState("Trip Schedule");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3);
    return endDate;
  });

  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(5);

  const [editable, setEditable] = useState(true);

  return (
    <TripContext.Provider
      value={useMemo(
        () => ({
          headerState,
          setHeaderState,
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
          editable,
          setEditable,
        }),
        [editable, endDate, endHour, headerState, name, startDate, startHour]
      )}
    >
      {children}
    </TripContext.Provider>
  );
}
