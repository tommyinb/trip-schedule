import { useContext, useEffect, useMemo } from "react";
import { EditContext } from "../edits/EditContext";
import { TargetType } from "../edits/targetType";
import { List } from "../lists/List";
import { SaveContext } from "../saves/SaveContext";
import { getDateText } from "../tables/getDateText";
import { Table } from "../tables/Table";
import { TripContext } from "../trips/TripContext";
import { Card } from "./card";
import { CardColor } from "./cardColor";
import { CardState } from "./cardState";
import { CardZone } from "./cardZone";
import "./Desk.css";
import { DeskContext } from "./DeskContext";
import { DeskCreate } from "./DeskCreate";
import { DeskListCard } from "./DeskListCard";
import { DeskTableCard } from "./DeskTableCard";

export function Desk() {
  const {
    tableContainerRef,
    listContainerRef,
    createPrompt,
    setCreatePrompt,
    cards,
    setCards,
  } = useContext(DeskContext);

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

  const { editable } = useContext(TripContext);

  const findClickedTime = (clientX: number, clientY: number) => {
    const allCards = tableContainerRef.current?.querySelectorAll("[data-card]");
    const clickedCards = [...(allCards ?? [])].filter((card) => {
      const rect = card.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    });

    if (clickedCards.length > 0) {
      return undefined;
    }

    const allCells = tableContainerRef.current?.querySelectorAll(
      "[data-date][data-hour]"
    );
    const clickedCell = [...(allCells ?? [])].find((cell) => {
      const rect = cell.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    });

    if (!clickedCell) {
      return undefined;
    }

    const dateText = clickedCell.getAttribute("data-date");
    const dateValue = new Date(dateText ?? "");

    const hourText = clickedCell.getAttribute("data-hour");
    const hourValue = parseInt(hourText ?? "");

    return {
      date: dateValue,
      hour: hourValue,
    };
  };

  const { applyId } = useContext(SaveContext);

  return (
    <div className={`desks-Desk ${applyId ? "active" : ""}`}>
      <div
        className="table"
        ref={tableContainerRef}
        onClick={(event) => {
          if (!editable) {
            return;
          }

          const clickedTime = findClickedTime(event.clientX, event.clientY);
          if (!clickedTime) {
            return;
          }

          setCreatePrompt({
            date: clickedTime.date,
            hour: clickedTime.hour,
          });
        }}
        onDoubleClick={(event) => {
          if (!editable) {
            return;
          }

          const clickedTime = findClickedTime(event.clientX, event.clientY);
          if (!clickedTime) {
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
                clickedTime.date.getFullYear(),
                clickedTime.date.getMonth(),
                clickedTime.date.getDate(),
                clickedTime.hour,
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
      >
        <div className="content">
          <Table />

          {tableCards.map((card) => (
            <DeskTableCard key={card.id} card={card} />
          ))}

          {createPrompt && (
            <DeskCreate
              key={`${getDateText(createPrompt.date)}-${createPrompt.hour}`}
            />
          )}
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
