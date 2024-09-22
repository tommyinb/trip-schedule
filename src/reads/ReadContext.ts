import { createContext } from "react";
import { Item } from "./item";

export const ReadContext = createContext<{
  items: Item[];
  setItems: (items: Item[]) => void;
}>({
  items: [],
  setItems: () => {},
});
