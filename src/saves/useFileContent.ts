import { useContext, useMemo } from "react";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { TripContext } from "../trips/TripContext";
import { FileContent } from "./fileContent";

export function useFileContent() {
  const { name, startDate, endDate, startHour, endHour, editable } =
    useContext(TripContext);

  const { cards } = useContext(DeskContext);

  return useMemo<FileContent>(
    () => ({
      name,
      startDate,
      endDate,
      startHour,
      endHour,
      editable,
      cards: cards.filter(
        (card) =>
          card.state === CardState.Idle || card.state === CardState.Creating
      ),
      editTime: new Date(),
    }),
    [cards, editable, endDate, endHour, name, startDate, startHour]
  );
}
