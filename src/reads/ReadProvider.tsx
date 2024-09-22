import { PropsWithChildren, useMemo, useState } from "react";
import { Item } from "./item";
import { ReadContext } from "./ReadContext";

export function ReadProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <ReadContext.Provider
      value={useMemo(
        () => ({
          items,
          setItems,
        }),
        [items]
      )}
    >
      {children}
    </ReadContext.Provider>
  );
}
