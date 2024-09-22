import "./Column.css";
import { getDateText } from "./getDateText";
import { useDateHours } from "./useDateHours";

export function Column({ className, date: columnDate }: Props) {
  const columnDateText = getDateText(columnDate);

  const nextDate = new Date(columnDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const nextDateText = getDateText(nextDate);

  const dateHours = useDateHours();

  return (
    <div className={`tables-Column ${className}`}>
      <div className={`header ${columnDate.getDay() === 0 ? "holiday" : ""}`}>
        <div className="date">
          <span className="date">{columnDate.getDate()}</span>
          <span className="month">/{columnDate.getMonth() + 1}</span>
        </div>

        <div className="weekday">{getWeekdayText(columnDate.getDay())}</div>
      </div>

      {dateHours.map((dateHour) => (
        <div
          key={dateHour.hour}
          className={`cell ${
            dateHour.date === 1 && dateHour.hour === 0 ? "midnight" : ""
          }`}
          data-date={dateHour.date === 0 ? columnDateText : nextDateText}
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
