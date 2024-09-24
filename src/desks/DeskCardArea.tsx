import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { ItemType } from "../reads/itemType";
import { useCardItems } from "../reads/useCardItems";
import { Card } from "./card";
import { CardState } from "./cardState";
import { CardZone } from "./cardZone";
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

  const { tableRef, listRef, cards, setCards } = useContext(DeskContext);

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

        const pointerCard = cards.find((card) => card.id === pointer.newCardId);
        if (!pointerCard) {
          return;
        }

        const cells = tableRef.current?.querySelectorAll(
          "[data-date][data-hour]"
        );
        const cell = [...(cells ?? [])].find((cell) => {
          const rect = cell.getBoundingClientRect();
          return (
            event.clientX >= rect.left &&
            event.clientX < rect.right &&
            event.clientY - pointer.offsetY >= rect.top &&
            event.clientY - pointer.offsetY < rect.bottom
          );
        });

        if (cell) {
          const dateText = cell.getAttribute("data-date");
          const dateValue = new Date(dateText!);

          const hourText = cell.getAttribute("data-hour");
          const hourValue = Number(hourText!);

          setCards((cards) =>
            replace(cards, pointerCard, {
              ...pointerCard,
              place: { zone: CardZone.Table },
              content: {
                ...pointerCard.content,
                time: new Date(
                  dateValue.getFullYear(),
                  dateValue.getMonth(),
                  dateValue.getDate(),
                  hourValue
                ),
              },
            })
          );
        } else {
          const items = listRef.current?.querySelectorAll("[data-index]");
          const item = [...(items ?? [])].find((item) => {
            const rect = item.getBoundingClientRect();
            return (
              event.clientX >= rect.left &&
              event.clientX < rect.right &&
              event.clientY - pointer.offsetY >= rect.top &&
              event.clientY - pointer.offsetY < rect.bottom
            );
          });

          if (item) {
            const queryIndex = Number(item.getAttribute("data-index"));

            const cardIndex =
              Math.max(
                -1,
                ...cards
                  .filter((card) => card.state === CardState.Idle)
                  .map((card) => card.place)
                  .filter((place) => place.zone === CardZone.List)
                  .map((place) => place.index)
              ) + 1;

            setCards((cards) =>
              replace(cards, pointerCard, {
                ...pointerCard,
                place: {
                  zone: CardZone.List,
                  index: Math.min(queryIndex, cardIndex),
                },
              })
            );
          }
        }
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
            const replacedCards = replace(
              replace(cards, card, {
                ...card,
                state: CardState.Deleted,
              }),
              pointerCard,
              {
                ...pointerCard,
                state: CardState.Idle,
                place:
                  pointerCard.place.zone === CardZone.List
                    ? {
                        zone: CardZone.List,
                        index:
                          pointerCard.place.index +
                          (card.place.zone === CardZone.List &&
                          card.place.index < pointerCard.place.index
                            ? 0.5
                            : -0.5),
                      }
                    : pointerCard.place,
              }
            );

            const listCards = replacedCards
              .filter((card) => card.state === CardState.Idle)
              .filter((card) => card.place.zone === CardZone.List)
              .sort(
                (a, b) =>
                  (a.place.zone === CardZone.List ? a.place.index : 10000) -
                  (b.place.zone === CardZone.List ? b.place.index : 10000)
              );

            const outputCards = replacedCards.map((card) => {
              const index = listCards.indexOf(card);
              return index >= 0
                ? { ...card, place: { zone: CardZone.List, index } }
                : card;
            });

            setCards(outputCards);
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
                  state: CardState.Idle,
                }),
                pointerCard,
                {
                  ...pointerCard,
                  state: CardState.Deleted,
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
