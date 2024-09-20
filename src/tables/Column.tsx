import "./Column.css";
import { getDateText } from "./getDateText";
import { useDateHours } from "./useDateHours";

export function Column({ className, date: currentDate }: Props) {
  const currentDateText = getDateText(currentDate);

  const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  const nextDateText = getDateText(nextDate);

  const dateHours = useDateHours();

  return (
    <div className={`tables-Column ${className}`}>
      <div className={`header ${currentDate.getDay() === 0 ? "holiday" : ""}`}>
        <div className="date">
          <span className="date">{currentDate.getDate()}</span>
          <span className="month">/{currentDate.getMonth() + 1}</span>
        </div>

        <div className="weekday">{getWeekdayText(currentDate.getDay())}</div>
      </div>

      {dateHours.map((dateHour) => (
        <div
          key={dateHour.hour}
          className={`cell ${
            dateHour.date === 1 && dateHour.hour === 0 ? "midnight" : ""
          }`}
          data-date={dateHour.date === 0 ? currentDateText : nextDateText}
          data-hour={dateHour.hour}
        >
          <div className="line" />
        </div>
      ))}

      <div className="line" />
    </div>
  );
}

interface Props {
  className: string;
  date: Date;
}

function getWeekdayText(value: number) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][value];
}
