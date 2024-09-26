import { useContext } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { SaveContext } from "../saves/SaveContext";
import "./ModifyOpeningEnd.css";
import { TimeInput } from "./TimeInput";

export function ModifyOpeningEnd({ card, opening }: Props) {
  const { applyId: id } = useContext(SaveContext);

  const { setCards } = useContext(DeskContext);

  return (
    <TimeInput
      key={id}
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
      leftValue={{
        hour: (opening.endHour - 1 + 24) % 24,
        minute: opening.endMinute,
      }}
      rightValue={{
        hour: (opening.endHour + 1) % 24,
        minute: opening.endMinute,
      }}
    />
  );
}

interface Props {
  card: Card;
  opening: CardOpening;
}
