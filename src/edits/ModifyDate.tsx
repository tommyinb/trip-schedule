import { useCallback, useContext, useMemo, useState } from "react";
import { Card } from "../desks/card";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { useDates } from "../tables/useDates";
import { getDateText } from "./getDateText";
import "./ModifyDate.css";

export function ModifyDate({ card }: Props) {
  const cardDate = useMemo(
    () =>
      new Date(
        card.content.time.getFullYear(),
        card.content.time.getMonth(),
        card.content.time.getDate()
      ),
    [card.content.time]
  );

  const [text, setText] = useState(() => getDateText(cardDate));
  const [invalid, setInvalid] = useState(false);

  const dates = useDates();

  const leftDates = useMemo(
    () => dates.filter((date) => date < cardDate),
    [cardDate, dates]
  );
  const rightDates = useMemo(
    () => dates.filter((date) => date > cardDate),
    [cardDate, dates]
  );

  const { setCards } = useContext(DeskContext);
  const setDate = useCallback(
    (date: Date) => {
      setCards((cards) =>
        replace(cards, card, {
          ...card,
          content: {
            ...card.content,
            time: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              card.content.time.getHours(),
              card.content.time.getMinutes(),
              card.content.time.getSeconds(),
              card.content.time.getMilliseconds()
            ),
          },
        })
      );
    },
    [card, setCards]
  );

  return (
    <div className="edits-ModifyDate">
      <div
        className={`left ${leftDates.length > 0 ? "active" : ""}`}
        onClick={() => {
          const leftDate = leftDates[leftDates.length - 1];
          setDate(leftDate);

          setText(getDateText(leftDate));
          setInvalid(false);
        }}
      />

      <input
        className={`text ${invalid ? "invalid" : ""}`}
        value={text}
        onChange={(event) => {
          setText(event.target.value);

          const inputDate = new Date(event.target.value);

          if (inputDate.toString() === "Invalid Date") {
            setInvalid(true);
            return;
          }

          const validDate = dates.find(
            (date) =>
              date.getFullYear() === inputDate.getFullYear() &&
              date.getMonth() === inputDate.getMonth() &&
              date.getDate() === inputDate.getDate()
          );

          if (!validDate) {
            setInvalid(true);
            return;
          }

          setDate(validDate);
          setInvalid(false);
        }}
      />

      <div
        className={`right ${rightDates.length > 0 ? "active" : ""}`}
        onClick={() => {
          const rightDate = rightDates[0];
          setDate(rightDate);

          setText(getDateText(rightDate));
          setInvalid(false);
        }}
      />
    </div>
  );
}

interface Props {
  card: Card;
}
