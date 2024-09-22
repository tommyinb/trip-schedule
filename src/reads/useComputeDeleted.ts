import { useContext, useEffect, useMemo } from "react";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { ItemType } from "./itemType";
import { ReadContext } from "./ReadContext";

export function useComputeDeleted() {
  const { cards } = useContext(DeskContext);
  const deletedIds = useMemo(
    () =>
      new Set(
        cards
          .filter((card) => card.state === CardState.Deleted)
          .map((card) => card.id)
      ),
    [cards]
  );

  const { items, setItems } = useContext(ReadContext);
  const deletedItems = useMemo(
    () =>
      items.filter((item) =>
        item.type === ItemType.TimeClash
          ? item.cardIds.some((id) => deletedIds.has(id))
          : item.type === ItemType.CloseHour
          ? deletedIds.has(item.cardId)
          : false
      ),
    [deletedIds, items]
  );

  useEffect(() => {
    if (deletedItems.length <= 0) {
      return;
    }

    setItems(deletedItems);
  }, [deletedItems, setItems]);
}
