import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { Card } from "./card";

export const DeskContext = createContext<{
  deskRef: RefObject<HTMLDivElement>;
  gridRef: RefObject<HTMLDivElement>;

  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}>({
  deskRef: { current: null },
  gridRef: { current: null },

  cards: [],
  setCards: () => {},
});
