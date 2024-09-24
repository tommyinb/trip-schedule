import { PropsWithChildren, useMemo, useState } from "react";
import { EditContext } from "./EditContext";
import { Form } from "./Form";
import { Target } from "./target";

export function Edit({ children }: PropsWithChildren) {
  const [target, setTarget] = useState<Target>();

  return (
    <EditContext.Provider
      value={useMemo(() => ({ target, setTarget }), [target])}
    >
      {children}

      <Form />
    </EditContext.Provider>
  );
}
