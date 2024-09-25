import { useContext } from "react";
import { DateInput } from "../edits/DateInput";
import { SaveContext } from "../saves/SaveContext";
import { addDays } from "./addDays";
import "./SettingDate.css";
import { TripContext } from "./TripContext";

export function SettingDate({ className }: Props) {
  const { startDate, setStartDate, endDate, setEndDate, editable } =
    useContext(TripContext);

  const { applyId: id } = useContext(SaveContext);

  return (
    <div
      className={`trips-SettingDate ${className} ${editable ? "active" : ""}`}
    >
      <div className="label">Schedule Period</div>

      <div className="content">
        <DateInput
          key={`start-${id}`}
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
          key={`end-${id}`}
          className="end"
          value={endDate}
          trySetValue={(value) => {
            if (value < startDate) {
              return false;
            }

            console.log("What", value);

            setEndDate(value);
            return true;
          }}
          leftValue={endDate > startDate ? addDays(endDate, -1) : undefined}
          rightValue={addDays(endDate, 1)}
        />
      </div>
    </div>
  );
}

interface Props {
  className: string;
}
