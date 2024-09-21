import { useContext, useLayoutEffect, useMemo, useState } from "react";
import { getDateText } from "../tables/getDateText";
import { Card } from "./card";
import { DeskCardArea } from "./DeskCardArea";
import { DeskContext } from "./DeskContext";

export function DeskCard({ card }: Props) {
  const [cells, setCells] = useState<Element[]>([]);

  useLayoutEffect(() => {
    const times = Array.from({
      length: card.content.duration / (60 * 60 * 1000),
    }).map(
      (_, index) =>
        new Date(card.content.time.getTime() + index * 60 * 60 * 1000)
    );

    const elements = times.map((time) =>
      document.querySelector(
        `[data-date="${getDateText(time)}"][data-hour="${time.getHours()}"]`
      )
    );

    setCells(elements.filter((element) => element).map((element) => element!));
  }, [card.content.duration, card.content.time]);

  const rectGroups = useMemo(() => {
    const cellRects = cells.map((cell) => cell.getBoundingClientRect());

    const allLefts = cellRects.map((rect) => rect.left);
    const uniqueLefts = [...new Set(allLefts)].sort();

    return uniqueLefts.map((left) =>
      cellRects.filter((rect) => rect.left === left)
    );
  }, [cells]);

  const { deskRef } = useContext(DeskContext);

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
        (index >= rectGroups.length - 1 && minuteValue > 0
          ? ((60 - minuteValue) / 60) * bottomRect.height
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

  return outputRects.map((rect, index) => (
    <DeskCardArea key={index} card={card} {...rect} />
  ));
}

interface Props {
  card: Card;
}
