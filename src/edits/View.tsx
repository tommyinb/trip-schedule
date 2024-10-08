import { Card } from "../desks/card";
import { getTimeText } from "../desks/getTimeText";
import { FormState } from "./formState";
import { getDateText } from "./getDateText";
import { getDurationText } from "./getDurationText";
import "./View.css";
import { ViewHeader } from "./ViewHeader";
import { ViewOpening } from "./ViewOpening";
import { ViewRead } from "./ViewRead";
import { ViewRemark } from "./ViewRemark";

export function View({ card, setState }: Props) {
  return (
    <div className="edits-View">
      <ViewHeader card={card} setState={setState} />

      <div className="content">
        {card.content.location && (
          <div className="location">
            <div className="label">Location</div>
            <a
              className="value"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                card.content.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {card.content.location}
            </a>
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
            <ViewRemark className="value" remark={card.content.remark} />
          </div>
        )}

        {card.content.openings.length > 0 && (
          <div className="openings">
            <div className="label">Openings</div>
            <div className="value">
              {card.content.openings.map((opening, index) => (
                <ViewOpening key={index} opening={opening} />
              ))}
            </div>
          </div>
        )}

        <ViewRead cardId={card.id} />
      </div>
    </div>
  );
}

interface Props {
  card: Card;
  setState: (state: FormState) => void;
}
