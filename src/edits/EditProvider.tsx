import { PropsWithChildren, useMemo, useState } from "react";
import { EditContext } from "./EditContext";
import { Target } from "./target";

export function EditProvider({ children }: PropsWithChildren) {
  const [target, setTarget] = useState<Target>();

  return (
    <EditContext.Provider
      value={useMemo(() => ({ target, setTarget }), [target])}
    >
      {children}
    </EditContext.Provider>
  );
}
