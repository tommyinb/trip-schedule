import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { Card } from "./card";
import { CardZone } from "./cardZone";
import { DeskCardArea } from "./DeskCardArea";
import { DeskContext } from "./DeskContext";
import { Rectangle } from "./rectangle";

export function DeskListCard({ card }: Props) {
  const { listContainerRef, listContentRef } = useContext(DeskContext);

  const [outputRectangle, setOutputRectangle] = useState<Rectangle>();
  const updateRectangles = useCallback(() => {
    if (card.place.zone !== CardZone.List) {
      return;
    }

    const listElement = listContentRef.current?.querySelector(
      `[data-index="${card.place.index}"]`
    );
    if (!listElement) {
      return undefined;
    }

    const listRect = listElement.getBoundingClientRect();
    const containerRef = listContainerRef.current?.getBoundingClientRect();
    setOutputRectangle({
      left: listRect.left - (containerRef?.left ?? 0),
      top: listRect.top - (containerRef?.top ?? 0),
      width: listRect.width,
      height: listRect.height,
    });
  }, [card, listContainerRef, listContentRef]);

  useLayoutEffect(() => {
    updateRectangles();

    const observer = new ResizeObserver(updateRectangles);
    if (listContainerRef.current) {
      observer.observe(listContainerRef.current);
    }
    return () => observer.disconnect();
  }, [listContainerRef, updateRectangles]);

  return (
    <>
      {outputRectangle && (
        <DeskCardArea card={card} rectangle={outputRectangle} />
      )}
    </>
  );
}

interface Props {
  card: Card;
}
