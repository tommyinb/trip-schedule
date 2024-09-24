import { useContext } from "react";
import { Card } from "../desks/card";
import { CardState } from "../desks/cardState";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { EditContext } from "./EditContext";
import { FormState } from "./formState";
import "./Modify.css";
import { ModifyDate } from "./ModifyDate";
import { ModifyDuration } from "./ModifyDuration";
import { ModifyOpenings } from "./ModifyOpenings";
import { ModifyTime } from "./ModifyTime";

export function Modify({ card, setState }: Props) {
  const { setCards } = useContext(DeskContext);

  const { setTarget } = useContext(EditContext);

  return (
    <div className="edits-Modify">
      <div className="header">
        <div className="back" onClick={() => setState(FormState.View)} />

        <input
          className="name"
          value={card.content.name}
          onChange={(event) =>
            setCards((cards) =>
              replace(cards, card, {
                ...card,
                content: { ...card.content, name: event.target.value },
              })
            )
          }
          placeholder="New Event"
        />

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

      <div className="content">
        <div className="location">
          <div className="label">Location</div>
          <input
            className="value"
            value={card.content.location}
            onChange={(event) =>
              setCards((cards) =>
                replace(cards, card, {
                  ...card,
                  content: { ...card.content, location: event.target.value },
                })
              )
            }
          />
        </div>

        <div className="time">
          <div className="label">Start Time</div>
          <ModifyDate card={card} />
          <ModifyTime card={card} />
        </div>

        <div className="duration">
          <div className="label">Duration</div>
          <ModifyDuration card={card} />
        </div>

        <div className="remark">
          <div className="label">Remark</div>
          <textarea
            className="value"
            value={card.content.remark}
            onChange={(event) =>
              setCards((cards) =>
                replace(cards, card, {
                  ...card,
                  content: { ...card.content, remark: event.target.value },
                })
              )
            }
          />
        </div>

        <div className="opening">
          <div className="label">Opening Hour</div>
          <ModifyOpenings card={card} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  card: Card;
  setState: (state: FormState) => void;
}
