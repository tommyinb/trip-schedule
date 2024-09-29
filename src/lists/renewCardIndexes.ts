import { Card } from "../desks/card";
import { CardState } from "../desks/cardState";
import { CardZone } from "../desks/cardZone";

export function renewCardIndexes(cards: Card[]) {
  const listingCards = cards
    .filter((card) => card.state === CardState.Idle)
    .filter((card) => card.place.zone === CardZone.List)
    .sort(
      (a, b) =>
        (a.place.zone === CardZone.List ? a.place.index : 10000) -
        (b.place.zone === CardZone.List ? b.place.index : 10000)
    );

  return cards.map((card) => {
    const index = listingCards.indexOf(card);
    return index >= 0
      ? { ...card, place: { zone: CardZone.List, index } }
      : card;
  });
}
