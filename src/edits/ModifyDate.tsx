import { useContext, useMemo } from "react";
import { Card } from "../desks/card";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { SaveContext } from "../saves/SaveContext";
import { useDates } from "../tables/useDates";
import { DateInput } from "./DateInput";
import "./ModifyDate.css";

export function ModifyDate({ card }: Props) {
  const { applyId } = useContext(SaveContext);

  const cardDate = useMemo(
    () =>
      new Date(
        card.content.time.getFullYear(),
        card.content.time.getMonth(),
        card.content.time.getDate(),
        0,
        0,
        0,
        0
      ),
    [card.content.time]
  );

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

  return (
    <DateInput
      key={applyId}
      className="edits-ModifyDate"
      value={cardDate}
      trySetValue={(value) => {
        const validDate = dates.find(
          (date) =>
            date.getFullYear() === value.getFullYear() &&
            date.getMonth() === value.getMonth() &&
            date.getDate() === value.getDate()
        );

        if (!validDate) {
          return false;
        }

        setCards((cards) =>
          replace(cards, card, {
            ...card,
            content: {
              ...card.content,
              time: new Date(
                validDate.getFullYear(),
                validDate.getMonth(),
                validDate.getDate(),
                card.content.time.getHours(),
                card.content.time.getMinutes(),
                card.content.time.getSeconds(),
                card.content.time.getMilliseconds()
              ),
            },
          })
        );
        return true;
      }}
      leftValue={
        leftDates.length > 0 ? leftDates[leftDates.length - 1] : undefined
      }
      rightValue={rightDates.length > 0 ? rightDates[0] : undefined}
    />
  );
}

interface Props {
  card: Card;
}
