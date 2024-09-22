import { useContext } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import "./ModifyOpeningWeekday.css";

export function ModifyOpeningWeekday({ card, opening }: Props) {
  const { setCards } = useContext(DeskContext);

  return (
    <div className="edits-ModifyOpeningWeekday">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((text, value) => (
        <div
          key={text}
          className={`weekday ${
            opening.weekdays.includes(value) ? "active" : ""
          }`}
          onClick={() =>
            setCards((cards) =>
              replace(cards, card, {
                ...card,
                content: {
                  ...card.content,
                  openings: replace(card.content.openings, opening, {
                    ...opening,
                    weekdays: opening.weekdays.includes(value)
                      ? opening.weekdays.filter((day) => day !== value)
                      : [...opening.weekdays, value],
                  }),
                },
              })
            )
          }
        >
          {text}
        </div>
      ))}
    </div>
  );
}

interface Props {
  card: Card;
  opening: CardOpening;
}
