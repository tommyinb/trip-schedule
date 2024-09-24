import { PropsWithChildren, useMemo, useState } from "react";
import { SaveContext } from "./SaveContext";

export function SaveProvider({ children }: PropsWithChildren) {
  const [id, setId] = useState(0);

  return (
    <SaveContext.Provider value={useMemo(() => ({ id, setId }), [id])}>
      {children}
    </SaveContext.Provider>
  );
}
