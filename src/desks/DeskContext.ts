import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { Card } from "./card";
import { CreatePrompt } from "./createPrompt";

export const DeskContext = createContext<{
  tableContainerRef: RefObject<HTMLDivElement>;
  tableContentRef: RefObject<HTMLDivElement>;

  listContainerRef: RefObject<HTMLDivElement>;
  listContentRef: RefObject<HTMLDivElement>;

  createPrompt: CreatePrompt | undefined;
  setCreatePrompt: (createPrompt: CreatePrompt | undefined) => void;

  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}>({
  tableContainerRef: { current: null },
  tableContentRef: { current: null },

  listContainerRef: { current: null },
  listContentRef: { current: null },

  createPrompt: undefined,
  setCreatePrompt: () => {},

  cards: [],
  setCards: () => {},
});
