import { useContext, useLayoutEffect, useMemo, useRef } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { getDateText } from "../tables/getDateText";
import { useKeyDown } from "../trips/useKeyDown";
import { DeskContext } from "./DeskContext";
import "./DeskCreate.css";
import { Card } from "./card";
import { CardColor } from "./cardColor";
import { CardState } from "./cardState";
import { CardZone } from "./cardZone";

export function DeskCreate() {
  const { tableContainerRef, createPrompt, setCreatePrompt, cards, setCards } =
    useContext(DeskContext);

  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => ref.current?.focus(), []);

  const rectangle = useMemo(() => {
    if (!createPrompt) {
      return undefined;
    }

    const element = tableContainerRef.current?.querySelector(
      `[data-date="${getDateText(createPrompt.date)}"][data-hour="${
        createPrompt.hour
      }"]`
    );

    if (!element) {
      return undefined;
    }

    const elementRect = element.getBoundingClientRect();
    const containerRect = tableContainerRef.current?.getBoundingClientRect();

    return {
      left:
        elementRect.left -
        (containerRect?.left ?? 0) +
        (tableContainerRef.current?.scrollLeft ?? 0),
      top:
        elementRect.top -
        (containerRect?.top ?? 0) +
        (tableContainerRef.current?.scrollTop ?? 0),
      width: elementRect.width,
      height: elementRect.height,
    };
  }, [createPrompt, tableContainerRef]);

  const { target, setTarget } = useContext(EditContext);

  useKeyDown((event) => {
    if (event.key === "Escape") {
      setCreatePrompt(undefined);
    }
  });

  return (
    <div
      className="desks-DeskCreate"
      ref={ref}
      style={rectangle}
      onClick={() => {
        if (!createPrompt) {
          return;
        }

        const newCard: Card = {
          id: Math.max(-1, ...cards.map((card) => card.id)) + 1,
          state: CardState.Idle,
          place: { zone: CardZone.Table },
          content: {
            name: "",
            location: "",
            time: new Date(
              createPrompt.date.getFullYear(),
              createPrompt.date.getMonth(),
              createPrompt.date.getDate(),
              createPrompt.hour,
              0,
              0,
              0
            ),
            duration: 1 * 60 * 60 * 1000,
            color: CardColor.Green,
            remark: "",
            openings: [],
          },
        };

        setCards([...cards, newCard]);

        setTarget({
          targetId: (target?.targetId ?? -1) + 1,
          type: TargetType.Create,
          cardId: newCard.id,
        });

        setCreatePrompt(undefined);
      }}
      tabIndex={1}
      onBlur={() => setCreatePrompt(undefined)}
    >
      +
    </div>
  );
}
