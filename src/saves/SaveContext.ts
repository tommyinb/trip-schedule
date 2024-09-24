import { createContext, Dispatch, SetStateAction } from "react";
import { File } from "./file";

export const SaveContext = createContext<{
  file: File | undefined;
  setFile: (file: File | undefined) => void;

  applyId: number;
  setApplyId: Dispatch<SetStateAction<number>>;
}>({
  file: undefined,
  setFile: () => {},

  applyId: 0,
  setApplyId: () => {},
});
