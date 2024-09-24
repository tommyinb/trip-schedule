import { useContext } from "react";
import { Card } from "../desks/card";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { SaveContext } from "../saves/SaveContext";
import { TripContext } from "../trips/TripContext";
import "./ModifyTime.css";
import { TimeInput } from "./TimeInput";

export function ModifyTime({ card }: Props) {
  const { applyId: id } = useContext(SaveContext);

  const { setCards } = useContext(DeskContext);

  const { startHour, endHour } = useContext(TripContext);

  const cardHour = card.content.time.getHours();
  const cardMinute = card.content.time.getMinutes();

  return (
    <TimeInput
      key={id}
      className="edits-ModifyTime"
      value={{
        hour: card.content.time.getHours(),
        minute: card.content.time.getMinutes(),
      }}
      setValue={(value) => {
        setCards((cards) =>
          replace(cards, card, {
            ...card,
            content: {
              ...card.content,
              time: new Date(
                card.content.time.getFullYear(),
                card.content.time.getMonth(),
                card.content.time.getDate(),
                value.hour,
                value.minute
              ),
            },
          })
        );

        return true;
      }}
      leftValue={
        cardHour > startHour || (endHour < startHour && cardHour > 0)
          ? {
              hour: cardHour - 1,
              minute: cardMinute,
            }
          : undefined
      }
      rightValue={
        cardHour < endHour || (endHour < startHour && cardHour < 24)
          ? {
              hour: cardHour + 1,
              minute: cardMinute,
            }
          : undefined
      }
    />
  );
}

interface Props {
  card: Card;
}
