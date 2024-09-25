import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { getDateText } from "../tables/getDateText";
import { Card } from "./card";
import { DeskCardArea } from "./DeskCardArea";
import { DeskContext } from "./DeskContext";
import { group } from "./group";
import { Rectangle } from "./rectangle";

export function DeskTableCard({ card }: Props) {
  const { tableContainerRef, tableContentRef } = useContext(DeskContext);

  const [outputRectangles, setOutputRectangles] = useState<Rectangle[]>([]);
  const updateRectangles = useCallback(() => {
    const times = (function () {
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
      return times;
    })();

    const cells = times
      .map((time) =>
        tableContentRef.current?.querySelector(
          `[data-date="${getDateText(time)}"][data-hour="${time.getHours()}"]`
        )
      )
      .filter((element) => element)
      .map((element) => element!);

    const cellRects = cells.map((cell) => cell.getBoundingClientRect());
    const sortedRects = cellRects.sort((a, b) => a.left - b.left);
    const rectGroups = group(sortedRects, (rect) => rect.left);

    const tableRectangles = rectGroups.map((rects, index) => {
      const firstRect = rects[0];

      const sortedRects = [...rects].sort((a, b) => a.top - b.top);

      const topRect = sortedRects[0];
      const topValue =
        topRect.top +
        (index <= 0
          ? (card.content.time.getMinutes() / 60) * topRect.height
          : 0);

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
  }, [card, tableContainerRef, tableContentRef]);

  useLayoutEffect(() => {
    updateRectangles();

    const observer = new ResizeObserver(updateRectangles);

    if (tableContentRef.current) {
      observer.observe(tableContentRef.current);
    }

    const tableContainerRefElement = tableContainerRef.current;
    tableContainerRefElement?.addEventListener("scroll", updateRectangles);

    return () => {
      observer.disconnect();

      tableContainerRefElement?.removeEventListener("scroll", updateRectangles);
    };
  }, [tableContainerRef, tableContentRef, updateRectangles]);

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
