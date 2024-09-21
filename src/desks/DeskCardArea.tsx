import { useContext, useEffect, useRef, useState } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { Card } from "./card";
import { CardState } from "./cardState";
import "./DeskCardArea.css";
import { DeskContext } from "./DeskContext";
import { Preview } from "./Preview";
import { replace } from "./replace";
import { without } from "./without";

export function DeskCardArea({ card, left, top, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { cards, setCards } = useContext(DeskContext);

  const [pointer, setPointer] = useState<Pointer>({
    status: PointerState.Idle,
  });

  useEffect(() => {
    if (pointer.status === PointerState.Down) {
      const timer = setTimeout(() => {
        const newCard = {
          ...card,
          id: Math.max(...cards.map((card) => card.id)) + 1,
          state: CardState.Create,
        };

        setPointer({
          status: PointerState.Drag,
          pointerId: pointer.pointerId,
          offsetY: pointer.offsetY,
          newCard,
        });

        setCards([
          ...replace(cards, card, {
            ...card,
            state: CardState.Drag,
          }),
          newCard,
        ]);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [card, cards, pointer, setCards]);

  const { target, setTarget } = useContext(EditContext);

  return (
    <div
      className={`desks-DeskCardArea ${card.state}`}
      ref={ref}
      style={{ left, top, width, height }}
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
      }}
      onPointerMove={(event) => {
        if (pointer.status === PointerState.Idle) {
          return;
        }

        if (event.pointerId !== pointer.pointerId) {
          return;
        }

        let fromCard: Card;
        if (pointer.status === PointerState.Down) {
          if (
            Math.abs(event.clientX - pointer.clientX) < 50 &&
            Math.abs(event.clientY - pointer.clientY) < 50
          ) {
            return;
          }

          fromCard = {
            ...card,
            id: Math.max(...cards.map((card) => card.id)) + 1,
            state: CardState.Create,
          };

          setPointer({
            status: PointerState.Drag,
            pointerId: pointer.pointerId,
            offsetY: pointer.offsetY,
            newCard: fromCard,
          });

          setCards([
            ...replace(cards, card, {
              ...card,
              state: CardState.Drag,
            }),
            fromCard,
          ]);
        } else {
          fromCard = pointer.newCard;
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

        setPointer({
          status: PointerState.Drag,
          pointerId: pointer.pointerId,
          offsetY: pointer.offsetY,
          newCard: toCard,
        });

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

          if (!target || target.card !== card) {
            setTarget({ type: TargetType.Update, card });
          }
        } else if (pointer.status === PointerState.Drag) {
          setCards(
            replace(without(cards, card), pointer.newCard, {
              ...pointer.newCard,
              state: CardState.Idle,
            })
          );
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
        } else if (pointer.status === PointerState.Drag) {
          setCards(
            replace(without(cards, card), pointer.newCard, {
              ...pointer.newCard,
              state: CardState.Idle,
            })
          );
        }
      }}
    >
      <Preview className="preview" card={card} />
    </div>
  );
}

interface Props {
  card: Card;

  left: number;
  top: number;
  width: number;
  height: number;
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

  newCard: Card;
}
