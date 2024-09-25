import { useContext } from "react";
import { Card } from "../desks/card";
import { CardState } from "../desks/cardState";
import { CardZone } from "../desks/cardZone";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { TripContext } from "../trips/TripContext";
import { EditContext } from "./EditContext";
import { FormState } from "./formState";
import "./ViewHeader.css";

export function ViewHeader({ card, setState }: Props) {
  const { editable } = useContext(TripContext);

  const { setCards } = useContext(DeskContext);

  const { setTarget } = useContext(EditContext);

  return (
    <div className="edits-ViewHeader">
      <div className="content">
        <div className={`name ${card.content.name ? "active" : ""}`}>
          {card.content.name || "New Event"}
        </div>

        <div className="control">
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
        </div>
      </div>

      <div className="close" onClick={() => setTarget(undefined)} />
    </div>
  );
}

interface Props {
  card: Card;
  setState: (state: FormState) => void;
}
