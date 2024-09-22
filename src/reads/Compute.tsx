import { useContext } from "react";
import { DeskContext } from "../desks/DeskContext";
import { getCloseHours } from "./getCloseHours";
import { ItemType } from "./itemType";
import { ReadContext } from "./ReadContext";
import { useComputeCloseHour } from "./useComputeCloseHour";
import { useComputeDeleted } from "./useComputeDeleted";
import { useComputeTimeClash } from "./useComputeTimeClash";

export function Compute() {
  useComputeDeleted();
  useComputeTimeClash();
  useComputeCloseHour();

  const { items } = useContext(ReadContext);

  const { cards } = useContext(DeskContext);

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          {item.type === ItemType.TimeClash ? (
            <>
              {item.type}:{item.cardIds.join(", ")}
            </>
          ) : (
            <>
              {item.type}:{item.cardId}:
              {(function () {
                const card = cards.find((card) => card.id === item.cardId);
                if (!card) {
                  return undefined;
                }

                return getCloseHours(card.content)
                  .map(
                    (closeHour) =>
                      `${closeHour.date.toLocaleDateString()}(${
                        closeHour.fromHour
                      }:${closeHour.fromMinute}-${closeHour.toHour}:${
                        closeHour.toMinute
                      })`
                  )
                  .join(", ");
              })()}
            </>
          )}
        </div>
      ))}
    </>
  );
}
