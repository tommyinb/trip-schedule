import { useCallback, useContext, useState } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { getTimeText } from "./getTimeText";
import { matchTime } from "./matchTime";
import "./ModifyOpeningStart.css";

export function ModifyOpeningStart({ card, opening }: Props) {
  const [text, setText] = useState(() =>
    getTimeText(opening.startHour, opening.startMinute)
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
              startHour: hour,
              startMinute: minute,
            }),
          },
        })
      );
    },
    [card, opening, setCards]
  );

  return (
    <div className="edits-ModifyOpeningStart">
      <div
        className={`left ${
          opening.startHour > 0 || opening.startMinute > 0 ? "active" : ""
        }`}
        onClick={() => {
          const hour = opening.startHour > 0 ? opening.startHour - 1 : 0;
          const minute = opening.startHour > 0 ? opening.startMinute : 0;
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
          opening.startHour * 60 + opening.startMinute < 23 * 60 + 59
            ? "active"
            : ""
        }`}
        onClick={() => {
          const hour = opening.startHour < 23 ? opening.startHour + 1 : 0;
          const minute = opening.startHour < 23 ? opening.startMinute : 59;
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
