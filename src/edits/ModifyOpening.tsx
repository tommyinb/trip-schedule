import { useContext } from "react";
import { Card } from "../desks/card";
import { CardOpening } from "../desks/cardOpening";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { without } from "../desks/without";
import "./ModifyOpening.css";
import { ModifyOpeningEnd } from "./ModifyOpeningEnd";
import { ModifyOpeningStart } from "./ModifyOpeningStart";
import { ModifyOpeningWeekday } from "./ModifyOpeningWeekday";

export function ModifyOpening({ card, opening }: Props) {
  const { setCards } = useContext(DeskContext);

  return (
    <div className="edits-ModifyOpening">
      <div
        className="delete"
        onClick={() =>
          setCards((cards) =>
            replace(cards, card, {
              ...card,
              content: {
                ...card.content,
                openings: without(card.content.openings, opening),
              },
            })
          )
        }
      />

      <ModifyOpeningWeekday card={card} opening={opening} />

      <div className="time">
        <ModifyOpeningStart card={card} opening={opening} />-
        <ModifyOpeningEnd card={card} opening={opening} />
      </div>
    </div>
  );
}

interface Props {
  card: Card;
  opening: CardOpening;
}
