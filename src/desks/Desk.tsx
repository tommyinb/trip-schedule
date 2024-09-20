import { PropsWithChildren, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { CardState } from "./cardState";
import "./Desk.css";
import { DeskCard } from "./DeskCard";
import { DeskContext } from "./DeskContext";

export function Desk({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      state: CardState.Idle,
      content: {
        name: "John Doe",
        location: "Hong Kong",
        time: new Date("2024-09-22T11:00:00"),
        duration: 2 * 60 * 60 * 1000,
      },
    },
    {
      id: 2,
      state: CardState.Idle,
      content: {
        name: "Jane Doe",
        location: "Hong Kong",
        time: new Date("2024-09-23T13:00:00"),
        duration: 1 * 60 * 60 * 1000,
      },
    },
  ]);

  return (
    <div className="desks-Desk" ref={ref}>
      <DeskContext.Provider
        value={useMemo(
          () => ({
            deskRef: ref,
            cards,
            setCards,
          }),
          [cards]
        )}
      >
        {children}

        {cards.map((card) => (
          <DeskCard key={card.id} card={card} />
        ))}
      </DeskContext.Provider>
    </div>
  );
}
