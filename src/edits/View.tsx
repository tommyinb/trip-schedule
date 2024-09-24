import { useContext } from "react";
import { Card } from "../desks/card";
import { CardState } from "../desks/cardState";
import { CardZone } from "../desks/cardZone";
import { DeskContext } from "../desks/DeskContext";
import { getTimeText } from "../desks/getTimeText";
import { replace } from "../desks/replace";
import { TripContext } from "../trips/TripContext";
import { EditContext } from "./EditContext";
import { FormState } from "./formState";
import { getDateText } from "./getDateText";
import { getDurationText } from "./getDurationText";
import "./View.css";
import { ViewOpening } from "./ViewOpening";
import { ViewRead } from "./ViewRead";
import { ViewRemark } from "./ViewRemark";

export function View({ card, setState }: Props) {
  const { editable } = useContext(TripContext);

  const { setCards } = useContext(DeskContext);

  const { setTarget } = useContext(EditContext);

  return (
    <div className="edits-View">
      <div className="header">
        <div className={`name ${card.content.name ? "active" : ""}`}>
          {card.content.name || "New Event"}
        </div>

        {editable && (
          <>
            <div
              className="modify"
              onClick={() => setState(FormState.Modify)}
            />

            {card.place.zone === CardZone.List && (
              <div
                className="revert"
                onClick={() => {
                  setCards((cards) =>
                    replace(cards, card, {
                      ...card,
                      place: { zone: CardZone.Table },
                    })
                  );

                  setTarget(undefined);
                }}
              />
            )}

            <div
              className={`delete ${card.place.zone}`}
              onClick={() => {
                setCards((cards) =>
                  replace(cards, card, {
                    ...card,
                    ...(card.place.zone === CardZone.Table
                      ? {
                          place: {
                            zone: CardZone.List,
                            index:
                              Math.max(
                                -1,
                                ...cards
                                  .filter(
                                    (card) => card.state === CardState.Idle
                                  )
                                  .map((card) => card.place)
                                  .filter(
                                    (place) => place.zone === CardZone.List
                                  )
                                  .map((place) => place.index)
                              ) + 1,
                          },
                        }
                      : {
                          state: CardState.Deleted,
                        }),
                  })
                );

                setTarget(undefined);
              }}
            />
          </>
        )}

        <div className="close" onClick={() => setTarget(undefined)} />
      </div>

      {card.content.location && (
        <div className="location">
          <div className="label">Location</div>
          <div>{card.content.location}</div>
        </div>
      )}

      <div className="time">
        <div className="label">Start Time</div>
        <div className="date">{getDateText(card.content.time)}</div>
        <div className="time">{getTimeText(card.content.time)}</div>
      </div>

      <div className="duration">
        <div className="label">Duration</div>
        <div>{getDurationText(card.content.duration)}</div>
      </div>

      {card.content.remark && (
        <div className="remark">
          <div className="label">Remark</div>
          <ViewRemark remark={card.content.remark} />
        </div>
      )}

      {card.content.openings.length > 0 && (
        <div className="openings">
          <div className="label">Openings</div>
          <div className="openings">
            {card.content.openings.map((opening, index) => (
              <ViewOpening key={index} opening={opening} />
            ))}
          </div>
        </div>
      )}

      <ViewRead cardId={card.id} />
    </div>
  );
}

interface Props {
  card: Card;
  setState: (state: FormState) => void;
}
