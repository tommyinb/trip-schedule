import { useContext } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import "./ModifyOpeningEnd.css";
import { TimeInput } from "./TimeInput";

export function ModifyOpeningEnd({ card, opening }: Props) {
  const { setCards } = useContext(DeskContext);

  return (
    <TimeInput
      className="edits-ModifyOpeningEnd"
      value={{
        hour: opening.endHour,
        minute: opening.endMinute,
      }}
      setValue={(value) =>
        setCards((cards) =>
          replace(cards, card, {
            ...card,
            content: {
              ...card.content,
              openings: replace(card.content.openings, opening, {
                ...opening,
                endHour: value.hour,
                endMinute: value.minute,
              }),
            },
          })
        )
      }
      leftValue={
        opening.endHour > 0 || opening.endMinute > 0
          ? {
              hour: opening.endHour > 0 ? opening.endHour - 1 : 0,
              minute: opening.endHour > 0 ? opening.endMinute : 0,
            }
          : undefined
      }
      rightValue={
        opening.endHour * 60 + opening.endMinute < 23 * 60 + 59
          ? {
              hour: opening.endHour < 23 ? opening.endHour + 1 : 0,
              minute: opening.endHour < 23 ? opening.endMinute : 59,
            }
          : undefined
      }
    />
  );
}

interface Props {
  card: Card;
  opening: CardOpening;
}
