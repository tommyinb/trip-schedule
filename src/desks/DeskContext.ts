import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { Card } from "./card";

export const DeskContext = createContext<{
  deskRef: RefObject<HTMLDivElement>;
  tableRef: RefObject<HTMLDivElement>;
  listRef: RefObject<HTMLDivElement>;

  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}>({
  deskRef: { current: null },
  tableRef: { current: null },
  listRef: { current: null },

  cards: [],
  setCards: () => {},
});
