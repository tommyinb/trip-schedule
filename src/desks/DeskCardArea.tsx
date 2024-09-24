import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { ItemType } from "../reads/itemType";
import { useCardItems } from "../reads/useCardItems";
import { Card } from "./card";
import { CardState } from "./cardState";
import "./DeskCardArea.css";
import { DeskContext } from "./DeskContext";
import { Preview } from "./Preview";
import { Rectangle } from "./rectangle";
import { replace } from "./replace";

export function DeskCardArea({ card, rectangle }: Props) {
  const { target, setTarget } = useContext(EditContext);

  const items = useCardItems(card.id);
  const itemTypes = useMemo(() => items.map((item) => item.type), [items]);

  const ref = useRef<HTMLDivElement>(null);

  const { cards, setCards } = useContext(DeskContext);

  const [pointer, setPointer] = useState<Pointer>({
    status: PointerState.Idle,
  });

  useEffect(() => {
    if (pointer.status === PointerState.Down) {
      const timer = setTimeout(() => {
        const newId = Math.max(-1, ...cards.map((card) => card.id)) + 1;

        setPointer({
          status: PointerState.Drag,
          pointerId: pointer.pointerId,
          offsetY: pointer.offsetY,
          newCardId: newId,
        });

        setCards([
          ...replace(cards, card, {
            ...card,
            state: CardState.Dragging,
          }),
          {
            ...card,
            id: newId,
            state: CardState.Creating,
          },
        ]);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [card, cards, pointer, setCards]);

  return (
    <div
      className={`desks-DeskCardArea ${card.state} ${
        target?.cardId === card.id ? "edit" : ""
      } ${itemTypes.includes(ItemType.TimeClash) ? "clash" : ""} ${
        itemTypes.includes(ItemType.CloseHour) ? "close" : ""
      }`}
      ref={ref}
      style={rectangle}
      data-card={card.id}
      onPointerDown={(event) => {
        if (pointer.status !== PointerState.Idle) {
          return;
        }

        ref.current?.setPointerCapture(event.pointerId);

        const rect = ref.current?.getBoundingClientRect();

        setPointer({
          status: PointerState.Down,
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
          offsetY: rect ? event.clientY - rect.top : 0,
        });

        if (target) {
          setTarget(undefined);
        }
      }}
      onPointerMove={(event) => {
        if (pointer.status === PointerState.Idle) {
          return;
        }

        if (event.pointerId !== pointer.pointerId) {
          return;
        }

        if (pointer.status === PointerState.Down) {
          if (
            Math.abs(event.clientX - pointer.clientX) > 10 ||
            Math.abs(event.clientY - pointer.clientY) > 10
          ) {
            setPointer({ status: PointerState.Idle });

            ref.current?.releasePointerCapture(event.pointerId);
          }

          return;
        }

        const fromCard = cards.find((card) => card.id === pointer.newCardId);

        if (!fromCard) {
          return;
        }

        const cells = document.querySelectorAll("[data-date][data-hour]");
        const cell = [...cells].find((cell) => {
          const rect = cell.getBoundingClientRect();
          return (
            event.clientX >= rect.left &&
            event.clientX < rect.right &&
            event.clientY - pointer.offsetY >= rect.top &&
            event.clientY - pointer.offsetY < rect.bottom
          );
        });

        if (!cell) {
          return;
        }

        const dateText = cell.getAttribute("data-date");
        const dateValue = new Date(dateText!);

        const hourText = cell.getAttribute("data-hour");
        const hourValue = Number(hourText!);

        const toCard = {
          ...fromCard,
          content: {
            ...fromCard.content,
            time: new Date(
              dateValue.getFullYear(),
              dateValue.getMonth(),
              dateValue.getDate(),
              hourValue
            ),
          },
        };

        setCards((cards) => replace(cards, fromCard, toCard));
      }}
      onPointerUp={(event) => {
        if (pointer.status === PointerState.Idle) {
          return;
        }

        if (event.pointerId !== pointer.pointerId) {
          return;
        }

        ref.current?.releasePointerCapture(event.pointerId);

        setPointer({ status: PointerState.Idle });

        if (pointer.status === PointerState.Down) {
          setCards(replace(cards, card, { ...card, state: CardState.Idle }));

          setTarget({
            targetId: (target?.targetId ?? 0) + 1,
            type: TargetType.Update,
            cardId: card.id,
          });
        } else {
          const pointerCard = cards.find(
            (card) => card.id === pointer.newCardId
          );
          if (pointerCard) {
            setCards(
              replace(
                replace(cards, card, {
                  ...card,
                  state: CardState.Deleted,
                }),
                pointerCard,
                {
                  ...pointerCard,
                  state: CardState.Idle,
                }
              )
            );
          }
        }
      }}
      onPointerCancel={(event) => {
        if (pointer.status === PointerState.Idle) {
          return;
        }

        if (event.pointerId !== pointer.pointerId) {
          return;
        }

        ref.current?.releasePointerCapture(event.pointerId);

        setPointer({ status: PointerState.Idle });

        if (pointer.status === PointerState.Down) {
          setCards(replace(cards, card, { ...card, state: CardState.Idle }));
        } else {
          const pointerCard = cards.find(
            (card) => card.id === pointer.newCardId
          );
          if (pointerCard) {
            setCards(
              replace(
                replace(cards, card, {
                  ...card,
                  state: CardState.Deleted,
                }),
                pointerCard,
                {
                  ...pointerCard,
                  state: CardState.Idle,
                }
              )
            );
          }
        }
      }}
    >
      <Preview className="preview" card={card} />
    </div>
  );
}

interface Props {
  card: Card;

  rectangle: Rectangle;
}

enum PointerState {
  Idle = "idle",
  Down = "down",
  Drag = "drag",
}

type Pointer = PointerIdle | PointerDown | PointerDrag;

interface PointerIdle {
  status: PointerState.Idle;
}

interface PointerDown {
  status: PointerState.Down;

  pointerId: number;
  clientX: number;
  clientY: number;

  offsetY: number;
}

interface PointerDrag {
  status: PointerState.Drag;

  pointerId: number;
  offsetY: number;

  newCardId: number;
}
