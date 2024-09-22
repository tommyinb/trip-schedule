import { useContext, useEffect, useMemo } from "react";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { findTimeClash } from "./findTimeClash";
import { ItemType } from "./itemType";
import { ReadContext } from "./ReadContext";
import { renew } from "./renew";
import { TimeClashItem } from "./timeClashItem";

export function useComputeTimeClash() {
  const { cards } = useContext(DeskContext);
  const idleCards = useMemo(
    () =>
      cards
        .filter((card) => card.state === CardState.Idle)
        .sort((a, b) => a.content.time.getTime() - b.content.time.getTime()),
    [cards]
  );

  const toItems = useMemo(
    () =>
      idleCards.flatMap((leftCard, index) => {
        const rightCards = idleCards
          .slice(index + 1)
          .filter((rightCard) => rightCard !== leftCard)
          .filter((rightCard) =>
            findTimeClash(leftCard.content, rightCard.content)
          );

        return rightCards.map<TimeClashItem>((rightCard) => ({
          type: ItemType.TimeClash,
          cardIds: [leftCard.id, rightCard.id].sort((a, b) => a - b),
        }));
      }),
    [idleCards]
  );

  const { items, setItems } = useContext(ReadContext);
  const fromItems = useMemo(
    () => items.filter((item) => item.type === ItemType.TimeClash),
    [items]
  );

  const oldItems = useMemo(
    () =>
      fromItems.filter(
        (fromItem) =>
          !toItems.some(
            (toItem) =>
              toItem.cardIds.length === fromItem.cardIds.length &&
              toItem.cardIds.every(
                (toId, index) => toId === fromItem.cardIds[index]
              )
          )
      ),
    [fromItems, toItems]
  );

  const newItems = useMemo(
    () =>
      toItems.filter(
        (toItem) =>
          !fromItems.some(
            (fromItem) =>
              toItem.cardIds.length === fromItem.cardIds.length &&
              toItem.cardIds.every(
                (toId, index) => toId === fromItem.cardIds[index]
              )
          )
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
