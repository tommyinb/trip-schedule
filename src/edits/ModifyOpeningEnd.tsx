import { useCallback, useContext, useState } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { getTimeText } from "./getTimeText";
import { matchTime } from "./matchTime";
import "./ModifyOpeningEnd.css";

export function ModifyOpeningEnd({ card, opening }: Props) {
  const [text, setText] = useState(() =>
    getTimeText(opening.endHour, opening.endMinute)
  );
  const [invalid, setInvalid] = useState(false);

  const { setCards } = useContext(DeskContext);
  const setTime = useCallback(
    (hour: number, minute: number) => {
      setCards((cards) =>
        replace(cards, card, {
          ...card,
          content: {
            ...card.content,
            openings: replace(card.content.openings, opening, {
              ...opening,
              endHour: hour,
              endMinute: minute,
            }),
          },
        })
      );
    },
    [card, opening, setCards]
  );

  return (
    <div className="edits-ModifyOpeningEnd">
      <div
        className={`left ${
          opening.endHour > 0 || opening.endMinute > 0 ? "active" : ""
        }`}
        onClick={() => {
          const hour = opening.endHour > 0 ? opening.endHour - 1 : 0;
          const minute = opening.endHour > 0 ? opening.endMinute : 0;
          setTime(hour, minute);

          setText(getTimeText(hour, minute));
          setInvalid(false);
        }}
      />

      <input
        className={`text ${invalid ? "invalid" : ""}`}
        value={text}
        onChange={(event) => {
          setText(event.target.value);

          const match = matchTime(event.target.value);
          if (!match) {
            setInvalid(true);
            return;
          }

          setTime(match.hour, match.minute);
          setInvalid(false);
        }}
      />

      <div
        className={`right ${
          opening.endHour * 60 + opening.endMinute < 23 * 60 + 59
            ? "active"
            : ""
        }`}
        onClick={() => {
          const hour = opening.endHour < 23 ? opening.endHour + 1 : 0;
          const minute = opening.endHour < 23 ? opening.endMinute : 59;
          setTime(hour, minute);

          setText(getTimeText(hour, minute));
          setInvalid(false);
        }}
      />
    </div>
  );
}

interface Props {
  card: Card;
  opening: CardOpening;
}
