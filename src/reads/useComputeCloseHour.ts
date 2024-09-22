import { useContext, useEffect, useMemo } from "react";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { CloseHourItem } from "./closeHourItem";
import { getCloseHours } from "./getCloseHours";
import { ItemType } from "./itemType";
import { ReadContext } from "./ReadContext";
import { renew } from "./renew";

export function useComputeCloseHour() {
  const { cards } = useContext(DeskContext);
  const closeCards = useMemo(
    () =>
      cards
        .filter((card) => card.state === CardState.Idle)
        .filter((card) => card.content.openings.length > 0)
        .filter((card) => getCloseHours(card.content).length > 0),
    [cards]
  );

  const toItems = useMemo<CloseHourItem[]>(
    () =>
      closeCards.map((card) => ({
        type: ItemType.CloseHour,
        cardId: card.id,
      })),
    [closeCards]
  );

  const { items, setItems } = useContext(ReadContext);
  const fromItems = useMemo(
    () => items.filter((item) => item.type === ItemType.CloseHour),
    [items]
  );

  const oldItems = useMemo(
    () =>
      fromItems.filter(
        (fromItem) =>
          !toItems.some((toItem) => toItem.cardId === fromItem.cardId)
      ),
    [fromItems, toItems]
  );

  const newItems = useMemo(
    () =>
      toItems.filter(
        (toItem) =>
          !fromItems.some((fromItem) => toItem.cardId === fromItem.cardId)
      ),
    [fromItems, toItems]
  );

  useEffect(() => {
    if (oldItems.length <= 0 && newItems.length <= 0) {
      return;
    }

    setItems(renew(items, oldItems, newItems));
  }, [items, newItems, oldItems, setItems]);
}
