import {
  RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { getDateText } from "../tables/getDateText";
import { Card } from "./card";
import { CardZone } from "./cardZone";
import { DeskCardArea } from "./DeskCardArea";
import { DeskContext } from "./DeskContext";
import { group } from "./group";
import { Rectangle } from "./rectangle";

export function DeskCard({ card }: Props) {
  const { deskRef, tableRef, listRef } = useContext(DeskContext);

  const [inputRectangles, setInputRectangles] = useState<Rectangle[]>([]);
  const updateRectangles = useCallback(() => {
    if (card.place.zone === CardZone.Table) {
      const tableRectangles = getTableRectangles(card, tableRef);
      setInputRectangles(tableRectangles);
    } else {
      const listRectangle = getListRectangle(card.place.index, listRef);
      if (!listRectangle) {
        return;
      }

      setInputRectangles([listRectangle]);
    }
  }, [card, listRef, tableRef]);

  const outputRectangles = useMemo(() => {
    if (!deskRef.current) {
      return [];
    }

    const deskRect = deskRef.current.getBoundingClientRect();

    return inputRectangles.map((rect) => ({
      left: rect.left - deskRect.left,
      top: rect.top - deskRect.top,
      width: rect.width,
      height: rect.height,
    }));
  }, [deskRef, inputRectangles]);

  useLayoutEffect(() => {
    updateRectangles();

    const observer = new ResizeObserver(updateRectangles);

    if (deskRef.current) {
      observer.observe(deskRef.current);
    }
    if (tableRef.current) {
      observer.observe(tableRef.current);
    }
    if (listRef.current) {
      observer.observe(listRef.current);
    }

    return () => observer.disconnect();
  }, [deskRef, listRef, tableRef, updateRectangles]);

  return (
    <>
      {outputRectangles.map((rectangle, index) => (
        <DeskCardArea key={index} card={card} rectangle={rectangle} />
      ))}
    </>
  );
}

interface Props {
  card: Card;
}

function getTableRectangles(
  card: Card,
  tableRef: RefObject<HTMLDivElement>
): Rectangle[] {
  const times = [];
  for (
    let time = new Date(
      card.content.time.getFullYear(),
      card.content.time.getMonth(),
      card.content.time.getDate(),
      card.content.time.getHours()
    );
    time < new Date(card.content.time.getTime() + card.content.duration);
    time = new Date(time.getTime() + 60 * 60 * 1000)
  ) {
    times.push(time);
  }

  const cells = times
    .map((time) =>
      tableRef.current?.querySelector(
        `[data-date="${getDateText(time)}"][data-hour="${time.getHours()}"]`
      )
    )
    .filter((element) => element)
    .map((element) => element!);

  const cellRects = cells.map((cell) => cell.getBoundingClientRect());
  const sortedRects = cellRects.sort((a, b) => a.left - b.left);

  const rectGroups = group(sortedRects, (rect) => rect.left);
  return rectGroups.map((rects, index) => {
    const firstRect = rects[0];

    const sortedRects = [...rects].sort((a, b) => a.top - b.top);

    const topRect = sortedRects[0];
    const topValue =
      topRect.top +
      (index <= 0 ? (card.content.time.getMinutes() / 60) * topRect.height : 0);

    const minuteValue =
      Math.round(
        card.content.time.getMinutes() + card.content.duration / 1000 / 60
      ) % 60;

    const bottomRect = sortedRects[sortedRects.length - 1];
    const bottomValue =
      bottomRect.bottom -
      (index >= rectGroups.length - 1
        ? minuteValue > 0
          ? ((60 - minuteValue) / 60) * bottomRect.height
          : 0
        : 0);

    return {
      left: firstRect.left,
      top: topValue,
      width: firstRect.right - firstRect.left,
      height: bottomValue - topValue,
    };
  });
}

function getListRectangle(index: number, listRef: RefObject<HTMLDivElement>) {
  const element = listRef.current?.querySelector(`[data-index="${index}"]`);
  if (!element) {
    return undefined;
  }

  return element.getBoundingClientRect();
}
