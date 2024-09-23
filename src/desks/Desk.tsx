import { PropsWithChildren, useContext } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { Card } from "./card";
import { CardState } from "./cardState";
import "./Desk.css";
import { DeskCard } from "./DeskCard";
import { DeskContext } from "./DeskContext";

export function Desk({ children }: PropsWithChildren) {
  const { deskRef, cards, setCards } = useContext(DeskContext);

  const { target, setTarget } = useContext(EditContext);

  return (
    <div
      className="desks-Desk"
      ref={deskRef}
      onDoubleClick={(event) => {
        if (!deskRef.current) {
          return;
        }

        const allCards = deskRef.current.querySelectorAll("[data-card]");
        const clickedCards = [...allCards].filter((card) => {
          const rect = card.getBoundingClientRect();
          return (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          );
        });

        if (clickedCards.length > 0) {
          return;
        }

        const allCells = document.querySelectorAll("[data-date][data-hour]");
        const clickedCell = [...allCells].find((cell) => {
          const rect = cell.getBoundingClientRect();
          return (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          );
        });

        if (!clickedCell) {
          return;
        }

        const dateText = clickedCell.getAttribute("data-date");
        const dateValue = new Date(dateText ?? "");

        const hourText = clickedCell.getAttribute("data-hour");
        const hourValue = parseInt(hourText ?? "");

        const newCard: Card = {
          id: Math.max(-1, ...cards.map((card) => card.id)) + 1,
          state: CardState.Idle,
          content: {
            name: "",
            location: "",
            time: new Date(
              dateValue.getFullYear(),
              dateValue.getMonth(),
              dateValue.getDate(),
              hourValue,
              0,
              0
            ),
            duration: 1 * 60 * 60 * 1000,
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
      }}
    >
      {children}

      {cards.map((card) => (
        <DeskCard key={card.id} card={card} />
      ))}
    </div>
  );
}
