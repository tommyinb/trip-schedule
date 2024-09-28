import { useContext, useEffect, useMemo } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { List } from "../lists/List";
import { Table } from "../tables/Table";
import { Card } from "./card";
import { CardColor } from "./cardColor";
import { CardState } from "./cardState";
import { CardZone } from "./cardZone";
import "./Desk.css";
import { DeskContext } from "./DeskContext";
import { DeskListCard } from "./DeskListCard";
import { DeskTableCard } from "./DeskTableCard";

export function Desk() {
  const { tableContainerRef, listContainerRef, cards, setCards } =
    useContext(DeskContext);

  const { target, setTarget } = useContext(EditContext);

  const activeCards = useMemo(
    () => cards.filter((card) => card.state !== CardState.Deleted),
    [cards]
  );

  const tableCards = useMemo(
    () => activeCards.filter((card) => card.place.zone === CardZone.Table),
    [activeCards]
  );
  const listCards = useMemo(
    () => activeCards.filter((card) => card.place.zone === CardZone.List),
    [activeCards]
  );

  const draggingCards = useMemo(
    () => activeCards.filter((card) => card.state === CardState.Dragging),
    [activeCards]
  );

  useEffect(() => {
    const callback = (event: Event) => {
      if (draggingCards.length > 0) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", callback, { passive: false });

    const tableContainerElement = tableContainerRef.current;
    tableContainerElement?.addEventListener("touchmove", callback, {
      passive: false,
    });

    return () => {
      window.removeEventListener("touchmove", callback);
      tableContainerElement?.removeEventListener("touchmove", callback);
    };
  }, [draggingCards.length, tableContainerRef]);

  return (
    <div className="desks-Desk">
      <div
        className="table"
        ref={tableContainerRef}
        onDoubleClick={(event) => {
          if (!tableContainerRef.current) {
            return;
          }

          const allCards =
            tableContainerRef.current.querySelectorAll("[data-card]");
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

          const allCells = tableContainerRef.current.querySelectorAll(
            "[data-date][data-hour]"
          );
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
            place: { zone: CardZone.Table },
            content: {
              name: "",
              location: "",
              time: new Date(
                dateValue.getFullYear(),
                dateValue.getMonth(),
                dateValue.getDate(),
                hourValue,
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
        }}
      >
        <div className="content">
          <Table />

          {tableCards.map((card) => (
            <DeskTableCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      <div className="list" ref={listContainerRef}>
        <List />

        {listCards.map((card) => (
          <DeskListCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
