import { PropsWithChildren, useContext } from "react";
import "./Desk.css";
import { DeskCard } from "./DeskCard";
import { DeskContext } from "./DeskContext";

export function Desk({ children }: PropsWithChildren) {
  const { deskRef, cards } = useContext(DeskContext);

  return (
    <div className="desks-Desk" ref={deskRef}>
      {children}

      {cards.map((card) => (
        <DeskCard key={card.id} card={card} />
      ))}
    </div>
  );
}
