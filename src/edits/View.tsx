import { useContext } from "react";
import { Card } from "../desks/card";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { getTimeText } from "../desks/getTimeText";
import { replace } from "../desks/replace";
import { EditContext } from "./EditContext";
import { FormState } from "./formState";
import { getDateText } from "./getDateText";
import { getDurationText } from "./getDurationText";
import "./View.css";
import { ViewOpening } from "./ViewOpening";
import { ViewRead } from "./ViewRead";
import { ViewRemark } from "./ViewRemark";

export function View({ card, setState }: Props) {
  const { setCards } = useContext(DeskContext);

  const { setTarget } = useContext(EditContext);

  return (
    <div className="edits-View">
      <div className="header">
        <div className={`name ${card.content.name ? "active" : ""}`}>
          {card.content.name || "New Event"}
        </div>

        <div className="modify" onClick={() => setState(FormState.Modify)} />
        <div
          className="delete"
          onClick={() => {
            setCards((cards) =>
              replace(cards, card, {
                ...card,
                state: CardState.Deleted,
              })
            );

            setTarget(undefined);
          }}
        />

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
