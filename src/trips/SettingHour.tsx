import { useContext } from "react";
import { HourInput } from "./HourInput";
import "./SettingHour.css";
import { TripContext } from "./TripContext";

export function SettingHour({ className }: Props) {
  const { startHour, setStartHour, endHour, setEndHour } =
    useContext(TripContext);

  return (
    <div className={`trips-SettingHour ${className}`}>
      <div className="label">Activity Hours</div>

      <HourInput
        className="start"
        value={startHour}
        trySetValue={(value) => {
          setStartHour(value);
          return true;
        }}
        leftValue={
          ((startHour - 1 === endHour ? endHour - 1 : startHour - 1) + 24) % 24
        }
        rightValue={
          (startHour + 1 === endHour ? endHour + 1 : startHour + 1) % 24
        }
      />

      <div>-</div>

      <HourInput
        className="end"
        value={endHour}
        trySetValue={(value) => {
          setEndHour(value);
          return true;
        }}
        leftValue={
          ((endHour - 1 === startHour ? startHour - 1 : endHour - 1) + 24) % 24
        }
        rightValue={
          (endHour + 1 === startHour ? startHour + 1 : endHour + 1) % 24
        }
      />

      <div className={`overnight ${endHour < startHour ? "active" : ""}`}>
        overnight
      </div>
    </div>
  );
}

interface Props {
  className: string;
}
