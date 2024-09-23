import { useContext, useEffect, useMemo, useState } from "react";
import { DeskContext } from "../desks/DeskContext";
import { useKeyDown } from "../trips/useKeyDown";
import { EditContext } from "./EditContext";
import "./Form.css";
import { FormState } from "./formState";
import { Modify } from "./Modify";
import { View } from "./View";

export function Form() {
  const { target: editTarget, setTarget } = useContext(EditContext);

  const [state, setState] = useState<FormState>(FormState.View);

  useKeyDown((event) => {
    if (event.key === "Escape") {
      if (state === FormState.Modify) {
        setState(FormState.View);
      } else {
        setTarget(undefined);
      }
    }
  });

  const [lastTarget, setLastTarget] = useState(editTarget);

  useEffect(() => {
    if (editTarget) {
      setLastTarget(editTarget);
      setState(FormState.View);
    }
  }, [editTarget]);

  const outputTarget = useMemo(
    () => editTarget ?? lastTarget,
    [editTarget, lastTarget]
  );

  const { cards } = useContext(DeskContext);
  const card = cards.find((card) => card.id === outputTarget?.cardId);

  return (
    <div className={`edits-Form ${editTarget ? "active" : ""}`}>
      {card && (
        <>
          {state === FormState.View && <View card={card} setState={setState} />}

          {state === FormState.Modify && (
            <Modify key={card.id} card={card} setState={setState} />
          )}
        </>
      )}
    </div>
  );
}
