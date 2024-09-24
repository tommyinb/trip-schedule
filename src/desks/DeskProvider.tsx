import { PropsWithChildren, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { CardState } from "./cardState";
import { DeskContext } from "./DeskContext";

export function DeskProvider({ children }: PropsWithChildren) {
  const deskRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<Card[]>(() => {
    const date = new Date();
    return [
      {
        id: 1,
        state: CardState.Idle,
        content: {
          name: "Pioneer Centre",
          location: "750 Nathan Road, Hong Kong",
          time: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1,
            11,
            0,
            0
          ),
          duration: 2 * 60 * 60 * 1000,
          remark: "",
          openings: [],
        },
      },
      {
        id: 2,
        state: CardState.Idle,
        content: {
          name: "The One Mall",
          location: "100 Nathan Road, Hong Kong",
          time: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 2,
            13,
            0,
            0
          ),
          duration: 1 * 60 * 60 * 1000,
          remark: "",
          openings: [],
        },
      },
    ];
  });

  return (
    <DeskContext.Provider
      value={useMemo(
        () => ({
          deskRef,
          gridRef,
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
