import { useContext, useRef } from "react";
import { Card } from "./card";
import { CardState } from "./cardState";
import "./DeskCardArea.css";
import { DeskContext } from "./DeskContext";
import { Preview } from "./Preview";
import { replace } from "./replace";

export function DeskCardArea({ card, left, top, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { setCards } = useContext(DeskContext);

  return (
    <div
      className={`desks-DeskCardArea ${card.state}`}
      ref={ref}
      style={{ left, top, width, height }}
      onPointerDown={(event) => {
        console.log("pointer down");

        ref.current?.setPointerCapture(event.pointerId);

        setCards((cards) =>
          replace(cards, card, {
            ...card,
            state: CardState.Dragging,
          })
        );
      }}
      onPointerUp={(event) => {
        ref.current?.releasePointerCapture(event.pointerId);

        setCards((cards) =>
          replace(cards, card, { ...card, state: CardState.Idle })
        );
      }}
    >
      <Preview className="preview" card={card} />
    </div>
  );
}

interface Props {
  card: Card;

  left: number;
  top: number;
  width: number;
  height: number;
}
