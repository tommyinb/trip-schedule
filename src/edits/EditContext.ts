import { createContext } from "react";
import { Target } from "./target";

export const EditContext = createContext<{
  target: Target | undefined;
  setTarget: (target: Target | undefined) => void;
}>({
  target: undefined,
  setTarget: () => {},
});
