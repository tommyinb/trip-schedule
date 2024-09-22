import { PropsWithChildren, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { CardState } from "./cardState";
import { DeskContext } from "./DeskContext";

export function DeskProvider({ children }: PropsWithChildren) {
  const deskRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      state: CardState.Idle,
      content: {
        name: "Pioneer Centre",
        location: "750 Nathan Road, Hong Kong",
        time: new Date("2024-09-23T11:00:00"),
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
        time: new Date("2024-09-24T13:00:00"),
        duration: 1 * 60 * 60 * 1000,
        remark: "",
        openings: [],
      },
    },
  ]);

  return (
    <DeskContext.Provider
      value={useMemo(
        () => ({
          deskRef,
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
