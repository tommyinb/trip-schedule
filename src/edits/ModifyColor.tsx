import { useContext, useEffect, useState } from "react";
import { Card } from "../desks/card";
import { CardColor } from "../desks/cardColor";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import "./ModifyColor.css";

export function ModifyColor({ card }: Props) {
  const { cards, setCards } = useContext(DeskContext);

  const [active, setActive] = useState(() =>
    cards.some((card) => card.content.color !== CardColor.Green)
  );
  useEffect(() => {
    if (cards.some((card) => card.content.color !== CardColor.Green)) {
      if (!active) {
        setActive(true);
      }
    }
  }, [active, cards]);

  return (
    <div className={`edits-ModifyColor ${active ? "active" : ""}`}>
      {[
        CardColor.Green,
        CardColor.Blue,
        CardColor.Yellow,
        CardColor.Purple,
        CardColor.Brown,
        CardColor.Red,
        CardColor.Gray,
      ].map((color) => (
        <div
          key={color}
          className={`${color} ${card.content.color === color ? "active" : ""}`}
          onClick={() =>
            setCards((cards) =>
              replace(cards, card, {
                ...card,
                content: {
                  ...card.content,
                  color,
                },
              })
            )
          }
        />
      ))}
    </div>
  );
}

interface Props {
  card: Card;
}
