import { useContext, useMemo } from "react";
import { DeskContext } from "../desks/DeskContext";
import { group } from "../desks/group";
import { getTimeText } from "../edits/getTimeText";
import { getDateText } from "../tables/getDateText";
import { getCloseHours } from "./getCloseHours";
import "./ViewCloseHour.css";

export function ViewCloseHour({ cardId }: Props) {
  const { cards } = useContext(DeskContext);
  const card = cards.find((card) => card.id === cardId);

  const closes = useMemo(
    () => (card ? getCloseHours(card.content) : []),
    [card]
  );

  const closeGroups = useMemo(
    () => group(closes, (close) => close.date),
    [closes]
  );

  return (
    <div className="reads-ViewCloseHour">
      This location closes{" "}
      {closeGroups
        .map(
          (closeGroup) =>
            `at ${closeGroup
              .map(
                (close) =>
                  `${getTimeText(
                    close.fromHour,
                    close.fromMinute
                  )} - ${getTimeText(close.toHour, close.toMinute)}`
              )
              .join(", ")} on ${getDateText(closeGroup[0].date)}`
        )
        .join(" and ")}{" "}
      when visit
    </div>
  );
}

interface Props {
  cardId: number;
}
