import {
  RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
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
  const {
    tableContainerRef,
    tableContentRef,
    listContainerRef,
    listContentRef,
  } = useContext(DeskContext);

  const [outputRectangles, setOutputRectangles] = useState<Rectangle[]>([]);
  const updateRectangles = useCallback(() => {
    if (card.place.zone === CardZone.Table) {
      const tableRectangles = getTableRectangles(card, tableContentRef);

      const containerRect = tableContainerRef.current?.getBoundingClientRect();

      setOutputRectangles(
        tableRectangles.map((rect) => ({
          left:
            rect.left -
            (containerRect?.left ?? 0) +
            (tableContainerRef.current?.scrollLeft ?? 0),
          top:
            rect.top -
            (containerRect?.top ?? 0) +
            (tableContainerRef.current?.scrollTop ?? 0),
          width: rect.width,
          height: rect.height,
        }))
      );
    } else {
      const listRectangle = getListRectangle(card.place.index, listContentRef);
      if (listRectangle) {
        const containerRef = listContainerRef.current?.getBoundingClientRect();

        setOutputRectangles([
          {
            left: listRectangle.left - (containerRef?.left ?? 0),
            top: listRectangle.top - (containerRef?.top ?? 0),
            width: listRectangle.width,
            height: listRectangle.height,
          },
        ]);
      }
    }
  }, [
    card,
    listContainerRef,
    listContentRef,
    tableContainerRef,
    tableContentRef,
  ]);

  useLayoutEffect(() => {
    updateRectangles();

    const observer = new ResizeObserver(updateRectangles);

    if (tableContentRef.current) {
      observer.observe(tableContentRef.current);
    }
    if (listContainerRef.current) {
      observer.observe(listContainerRef.current);
    }

    const tableContainerRefElement = tableContainerRef.current;
    tableContainerRefElement?.addEventListener("scroll", updateRectangles);

    return () => {
      observer.disconnect();

      tableContainerRefElement?.removeEventListener("scroll", updateRectangles);
    };
  }, [listContainerRef, tableContainerRef, tableContentRef, updateRectangles]);

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
