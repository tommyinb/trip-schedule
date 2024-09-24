import { PropsWithChildren, useMemo, useState } from "react";
import { File } from "./file";
import { SaveContext } from "./SaveContext";

export function SaveProvider({ children }: PropsWithChildren) {
  const [file, setFile] = useState<File>();

  const [applyId, setApplyId] = useState(0);

  return (
    <SaveContext.Provider
      value={useMemo(
        () => ({
          file,
          setFile,
          applyId,
          setApplyId,
        }),
        [applyId, file]
      )}
    >
      {children}
    </SaveContext.Provider>
  );
}
