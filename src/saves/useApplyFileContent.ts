import { useCallback, useContext } from "react";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { setTitle } from "../trips/setTitle";
import { TripContext } from "../trips/TripContext";
import { FileContent } from "./fileContent";

export function useApplyFileContent() {
  const {
    setName,
    setStartDate,
    setEndDate,
    setStartHour,
    setEndHour,
    setEditable,
  } = useContext(TripContext);

  const { setCards } = useContext(DeskContext);

  return useCallback(
    (content: FileContent) => {
      setName(content.name);
      setTitle(content.name);

      setStartDate(new Date(content.startDate));
      setEndDate(new Date(content.endDate));

      setStartHour(content.startHour);
      setEndHour(content.endHour);

      setEditable(content.editable);

      setCards(
        content.cards.map((card) => ({
          ...card,
          state: CardState.Idle,
        }))
      );
    },
    [
      setCards,
      setEditable,
      setEndDate,
      setEndHour,
      setName,
      setStartDate,
      setStartHour,
    ]
  );
}
