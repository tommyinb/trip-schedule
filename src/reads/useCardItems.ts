import { useContext, useMemo } from "react";
import { ReadContext } from "./ReadContext";
import { ItemType } from "./itemType";

export function useCardItems(cardId: number) {
  const { items } = useContext(ReadContext);

  return useMemo(
    () =>
      items.filter(
        (item) =>
          (item.type === ItemType.TimeClash && item.cardIds.includes(cardId)) ||
          (item.type === ItemType.CloseHour && item.cardId === cardId)
      ),
    [cardId, items]
  );
}
