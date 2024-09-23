import { useContext } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import "./ModifyOpeningStart.css";
import { TimeInput } from "./TimeInput";

export function ModifyOpeningStart({ card, opening }: Props) {
  const { setCards } = useContext(DeskContext);

  return (
    <TimeInput
      className="edits-ModifyOpeningStart"
      value={{
        hour: opening.startHour,
        minute: opening.startMinute,
      }}
      setValue={(value) =>
        setCards((cards) =>
          replace(cards, card, {
            ...card,
            content: {
              ...card.content,
              openings: replace(card.content.openings, opening, {
                ...opening,
                startHour: value.hour,
                startMinute: value.minute,
              }),
            },
          })
        )
      }
      leftValue={
        opening.startHour > 0 || opening.startMinute > 0
          ? {
              hour: opening.startHour > 0 ? opening.startHour - 1 : 0,
              minute: opening.startHour > 0 ? opening.startMinute : 0,
            }
          : undefined
      }
      rightValue={
        opening.startHour * 60 + opening.startMinute < 23 * 60 + 59
          ? {
              hour: opening.startHour < 23 ? opening.startHour + 1 : 0,
              minute: opening.startHour < 23 ? opening.startMinute : 59,
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
