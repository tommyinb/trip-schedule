import { useContext, useMemo } from "react";
import { CardZone } from "../desks/cardZone";
import { DeskContext } from "../desks/DeskContext";
import "./List.css";

export function List() {
  const { listRef, cards } = useContext(DeskContext);

  const listCards = useMemo(
    () => cards.filter((card) => card.place.zone === CardZone.List),
    [cards]
  );

  return (
    <div className="lists-List" ref={listRef}>
      {Array.from({ length: listCards.length + 1 }).map((_, index) => (
        <div key={index} className="space" data-index={index} />
      ))}
    </div>
  );
}
