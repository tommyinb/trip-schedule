import { useContext, useLayoutEffect, useMemo, useState } from "react";
import { getDateText } from "../tables/getDateText";
import { Card } from "./card";
import { DeskCardArea } from "./DeskCardArea";
import { DeskContext } from "./DeskContext";
import { group } from "./group";

export function DeskCard({ card }: Props) {
  const [cells, setCells] = useState<Element[]>([]);
  const { deskRef, gridRef } = useContext(DeskContext);

  useLayoutEffect(() => {
    update();
    function update() {
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

      const elements = times.map((time) =>
        gridRef.current?.querySelector(
          `[data-date="${getDateText(time)}"][data-hour="${time.getHours()}"]`
        )
      );

      setCells(
        elements.filter((element) => element).map((element) => element!)
      );
    }

    const observer = new ResizeObserver(update);

    if (deskRef.current) {
      observer.observe(deskRef.current);
    }

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, [card.content.duration, card.content.time, deskRef, gridRef]);

  const rectGroups = useMemo(() => {
    const cellRects = cells.map((cell) => cell.getBoundingClientRect());
    const sortedRects = cellRects.sort((a, b) => a.left - b.left);

    return group(sortedRects, (rect) => rect.left);
  }, [cells]);

  const outputRects = useMemo(() => {
    const groupRects = rectGroups.map((rects, index) => {
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

    const deskRect = deskRef.current?.getBoundingClientRect();

    return groupRects.map((rect) => ({
      left: rect.left - (deskRect?.left ?? 0),
      top: rect.top - (deskRect?.top ?? 0),
      width: rect.width,
      height: rect.height,
    }));
  }, [card.content.duration, card.content.time, deskRef, rectGroups]);

  return (
    <>
      {outputRects.map((rect) => (
        <DeskCardArea key={rect.left} card={card} {...rect} />
      ))}
    </>
  );
}

interface Props {
  card: Card;
}
