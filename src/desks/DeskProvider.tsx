import { PropsWithChildren, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { DeskContext } from "./DeskContext";

export function DeskProvider({ children }: PropsWithChildren) {
  const deskRef = useRef<HTMLDivElement>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<Card[]>([]);

  return (
    <DeskContext.Provider
      value={useMemo(
        () => ({
          deskRef,
          listRef,
          tableRef,
          cards,
          setCards,
        }),
        [cards, setCards]
      )}
    >
      {children}
    </DeskContext.Provider>
  );
}
