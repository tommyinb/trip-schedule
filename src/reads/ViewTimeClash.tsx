import { useContext, useMemo } from "react";
import { DeskContext } from "../desks/DeskContext";
import { getTimeText } from "../desks/getTimeText";
import { without } from "../desks/without";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { findTimeClash } from "./findTimeClash";
import { TimeClashItem } from "./timeClashItem";
import "./ViewTimeClash.css";

export function ViewTimeClash({ cardId, item }: Props) {
  const { cards } = useContext(DeskContext);
  const fromCard = cards.find((card) => card.id === cardId);

  const toCards = without(item.cardIds, cardId)
    .map((id) => cards.find((card) => card.id === id))
    .filter((card) => card)
    .map((card) => card!);

  const toCard = toCards.length > 0 ? toCards[0] : undefined;

  const clash = useMemo(
    () => fromCard && toCard && findTimeClash(fromCard.content, toCard.content),
    [fromCard, toCard]
  );

  const { target, setTarget } = useContext(EditContext);
  const setToTarget = () => {
    if (toCard) {
      setTarget({
        targetId: (target?.targetId ?? -1) + 1,
        type: TargetType.Update,
        cardId: toCard.id,
      });
    }
  };

  return (
    <div className="reads-ViewTimeClash">
      Clashes with another {toCard?.content.name && "event "}
      <span className="card" onClick={setToTarget}>
        {toCard?.content.name || "event"}
      </span>{" "}
      at {getTimeText(clash?.fromTime ?? new Date())} -{" "}
      {getTimeText(clash?.toTime ?? new Date())}
    </div>
  );
}

interface Props {
  cardId: number;
  item: TimeClashItem;
}
