import { useCallback, useContext, useState } from "react";
import { Card } from "../desks/card";
import { DeskContext } from "../desks/DeskContext";
import { getTimeText } from "../desks/getTimeText";
import { replace } from "../desks/replace";
import { TripContext } from "../trips/TripContext";
import { matchTime } from "./matchTime";
import "./ModifyTime.css";

export function ModifyTime({ card }: Props) {
  const [text, setText] = useState(() => getTimeText(card.content.time));
  const [invalid, setInvalid] = useState(false);

  const cardHour = card.content.time.getHours();
  const cardMinute = card.content.time.getMinutes();

  const { startHour, endHour } = useContext(TripContext);

  const { setCards } = useContext(DeskContext);
  const setTime = useCallback(
    (hour: number, minute: number) => {
      const time = new Date(
        card.content.time.getFullYear(),
        card.content.time.getMonth(),
        card.content.time.getDate(),
        hour,
        minute
      );

      setCards((cards) =>
        replace(cards, card, {
          ...card,
          content: {
            ...card.content,
            time,
          },
        })
      );

      return time;
    },
    [card, setCards]
  );

  return (
    <div className="edits-ModifyTime">
      <div
        className={`left ${
          cardHour > startHour || (endHour < startHour && cardHour > 0)
            ? "active"
            : ""
        }`}
        onClick={() => {
          const time = setTime(cardHour - 1, cardMinute);

          setText(getTimeText(time));
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
          cardHour < endHour || (endHour < startHour && cardHour < 24)
            ? "active"
            : ""
        }`}
        onClick={() => {
          const time = setTime(cardHour + 1, cardMinute);

          setText(getTimeText(time));
          setInvalid(false);
        }}
      />
    </div>
  );
}

interface Props {
  card: Card;
}
