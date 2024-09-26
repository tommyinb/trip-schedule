import { useContext } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { SaveContext } from "../saves/SaveContext";
import "./ModifyOpeningStart.css";
import { TimeInput } from "./TimeInput";

export function ModifyOpeningStart({ card, opening }: Props) {
  const { applyId: id } = useContext(SaveContext);

  const { setCards } = useContext(DeskContext);

  return (
    <TimeInput
      key={id}
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
      leftValue={{
        hour: (opening.startHour - 1 + 24) % 24,
        minute: opening.startMinute,
      }}
      rightValue={{
        hour: (opening.startHour + 1) % 24,
        minute: opening.startMinute,
      }}
    />
  );
}

interface Props {
  card: Card;
  opening: CardOpening;
}
