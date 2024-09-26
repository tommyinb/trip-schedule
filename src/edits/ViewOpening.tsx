import { CardOpening } from "../desks/cardOpening";
import { getTimeText } from "./getTimeText";
import "./ViewOpening.css";

export function ViewOpening({ opening }: Props) {
  return (
    <div className="edits-ViewOpening">
      <div className="time">
        <div>{getTimeText(opening.startHour, opening.startMinute)}</div>
        <div>-</div>
        <div>{getTimeText(opening.endHour, opening.endMinute)}</div>
      </div>

      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (text, value) => (
            <div
              key={text}
              className={`weekday ${
                opening.weekdays.includes(value) ? "active" : ""
              }`}
            >
              {text}
            </div>
          )
        )}
      </div>
    </div>
  );
}

interface Props {
  opening: CardOpening;
}
