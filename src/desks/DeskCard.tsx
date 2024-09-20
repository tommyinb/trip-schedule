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
    const deskRect = deskRef.current?.getBoundingClientRect();

    return rectGroups.map((rects) => {
      const left =
        Math.min(...rects.map((rect) => rect.left)) - (deskRect?.left ?? 0);
      const top =
        Math.min(...rects.map((rect) => rect.top)) - (deskRect?.top ?? 0);

      const right =
        Math.max(...rects.map((rect) => rect.right)) - (deskRect?.left ?? 0);
      const bottom =
        Math.max(...rects.map((rect) => rect.bottom)) - (deskRect?.top ?? 0);

      return {
        left,
        top,
        width: right - left,
        height: bottom - top,
      };
    });
  }, [deskRef, rectGroups]);

  return outputRects.map((rect, index) => (
    <DeskCardArea key={index} card={card} {...rect} />
  ));
}

interface Props {
  card: Card;
}
