import { createContext, Dispatch, SetStateAction } from "react";

export const SaveContext = createContext<{
  id: number;
  setId: Dispatch<SetStateAction<number>>;
}>({
  id: 0,
  setId: () => {},
});
