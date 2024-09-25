import { PropsWithChildren, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { DeskContext } from "./DeskContext";

export function DeskProvider({ children }: PropsWithChildren) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableContentRef = useRef<HTMLDivElement>(null);

  const listContainerRef = useRef<HTMLDivElement>(null);
  const listContentRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<Card[]>([]);

  return (
    <DeskContext.Provider
      value={useMemo(
        () => ({
          tableContainerRef,
          tableContentRef,
          listContainerRef,
          listContentRef,
          cards,
          setCards,
        }),
        [cards]
      )}
    >
      {children}
    </DeskContext.Provider>
  );
}
