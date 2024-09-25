import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { Card } from "./card";

export const DeskContext = createContext<{
  tableContainerRef: RefObject<HTMLDivElement>;
  tableContentRef: RefObject<HTMLDivElement>;

  listContainerRef: RefObject<HTMLDivElement>;
  listContentRef: RefObject<HTMLDivElement>;

  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}>({
  tableContainerRef: { current: null },
  tableContentRef: { current: null },

  listContainerRef: { current: null },
  listContentRef: { current: null },

  cards: [],
  setCards: () => {},
});
