import "./Legend.css";
import { useDateHours } from "./useDateHours";

export function Legend() {
  const dateHours = useDateHours();

  return (
    <div className="tables-Legend">
      {dateHours.map((dateHour) => (
        <div
          key={dateHour.hour}
          className={`hour ${
            dateHour.date === 1 && dateHour.hour === 0 ? "midnight" : ""
          }`}
        >
          <div className="text">
            {dateHour.hour.toString().padStart(2, "0")}:00
          </div>

          <div className="line" />
        </div>
      ))}

      <div className="line" />
    </div>
  );
}
