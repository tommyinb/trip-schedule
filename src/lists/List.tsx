import { useContext, useMemo } from "react";
import { CardState } from "../desks/cardState";
import { CardZone } from "../desks/cardZone";
import { DeskContext } from "../desks/DeskContext";
import "./List.css";

export function List() {
  const { listContentRef: listRef, cards } = useContext(DeskContext);

  const listCards = useMemo(
    () =>
      cards
        .filter(
          (card) =>
            card.state === CardState.Idle || card.state === CardState.Creating
        )
        .filter((card) => card.place.zone === CardZone.List),
    [cards]
  );

  return (
    <div className="lists-List" ref={listRef}>
      {listCards.map((_, index) => (
        <div key={index} className="item" data-index={index} />
      ))}

      <div className="space" data-index={listCards.length} />
    </div>
  );
}
