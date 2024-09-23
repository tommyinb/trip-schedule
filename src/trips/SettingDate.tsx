import { useContext } from "react";
import { DateInput } from "../edits/DateInput";
import { addDays } from "./addDays";
import "./SettingDate.css";
import { TripContext } from "./TripContext";

export function SettingDate({ className }: Props) {
  const { startDate, setStartDate, endDate, setEndDate } =
    useContext(TripContext);

  return (
    <div className={`trips-SettingDate ${className}`}>
      <div className="label">Schedule Period</div>

      <DateInput
        className="start"
        value={startDate}
        trySetValue={(value) => {
          if (value > endDate) {
            return false;
          }

          setStartDate(value);
          return true;
        }}
        leftValue={addDays(startDate, -1)}
        rightValue={startDate < endDate ? addDays(startDate, 1) : undefined}
      />

      <div>-</div>

      <DateInput
        className="end"
        value={endDate}
        trySetValue={(value) => {
          if (value < startDate) {
            return false;
          }

          setEndDate(value);
          return true;
        }}
        leftValue={endDate > startDate ? addDays(endDate, -1) : undefined}
        rightValue={addDays(endDate, 1)}
      />
    </div>
  );
}

interface Props {
  className: string;
}
