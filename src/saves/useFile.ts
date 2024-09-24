import { useCallback, useContext, useMemo } from "react";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { TripContext } from "../trips/TripContext";
import { File } from "./file";

export function useFile(): [file: File, applyFile: (file: File) => void] {
  const {
    name,
    setName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startHour,
    setStartHour,
    endHour,
    setEndHour,
  } = useContext(TripContext);

  const { cards, setCards } = useContext(DeskContext);

  const file = useMemo<File>(
    () => ({
      name,
      startDate,
      endDate,
      startHour,
      endHour,
      cards: cards.filter(
        (card) =>
          card.state === CardState.Idle || card.state === CardState.Creating
      ),
    }),
    [cards, endDate, endHour, name, startDate, startHour]
  );

  const applyFile = useCallback(
    (file: File) => {
      setName(file.name);

      setStartDate(new Date(file.startDate));
      setEndDate(new Date(file.endDate));

      setStartHour(file.startHour);
      setEndHour(file.endHour);

      setCards(
        file.cards.map((card) => ({
          ...card,
          state: CardState.Idle,
        }))
      );
    },
    [setCards, setEndDate, setEndHour, setName, setStartDate, setStartHour]
  );

  return [file, applyFile];
}
