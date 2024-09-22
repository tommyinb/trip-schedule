import { useContext } from "react";
import { Card } from "../desks/card";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import "./ModifyOpeningsAdd.css";

export function ModifyOpeningsAdd({ card }: Props) {
  const { setCards } = useContext(DeskContext);

  return (
    <div
      className="edits-ModifyOpeningsAdd"
      onClick={() => {
        setCards((cards) =>
          replace(cards, card, {
            ...card,
            content: {
              ...card.content,
              openings:
                card.content.openings.length > 0
                  ? [
                      ...card.content.openings,
                      {
                        ...card.content.openings[
                          card.content.openings.length - 1
                        ],
                        weekdays: [0, 1, 2, 3, 4, 5, 6].filter(
                          (weekday) =>
                            !card.content.openings.some((opening) =>
                              opening.weekdays.includes(weekday)
                            )
                        ),
                      },
                    ]
                  : [
                      {
                        weekdays: [0, 1, 2, 3, 4, 5, 6],
                        startHour: 10,
                        startMinute: 0,
                        endHour: 18,
                        endMinute: 0,
                      },
                    ],
            },
          })
        );
      }}
    >
      Add
    </div>
  );
}

interface Props {
  card: Card;
}
