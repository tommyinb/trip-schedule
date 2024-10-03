import { useContext, useEffect, useState } from "react";
import { EditContext } from "../edits/EditContext";
import { SaveContext } from "../saves/SaveContext";
import { HeaderState } from "./headerState";
import "./HeaderView.css";
import { TripContext } from "./TripContext";
import { useKeyDown } from "./useKeyDown";

export function HeaderView() {
  const { applyId } = useContext(SaveContext);

  const { headerState, setHeaderState, name, editable } =
    useContext(TripContext);

  useKeyDown((event) => {
    if (event.key === "Escape") {
      setHeaderState(HeaderState.View);
    }
  });

  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => setShowLoading(!applyId), [applyId]);

  const { setTarget } = useContext(EditContext);

  return (
    <div className={`trips-HeaderView ${applyId ? "active" : ""}`}>
      {headerState === HeaderState.View && (
        <>
          <div className={`loading ${showLoading ? "active" : ""}`} />

          <div className="name">{name}</div>

          {editable ? (
            <div
              className="edit"
              onClick={() => {
                setHeaderState(HeaderState.Edit);

                setTarget(undefined);
              }}
            />
          ) : (
            <div
              className="view"
              onClick={() => {
                setHeaderState(HeaderState.Edit);

                setTarget(undefined);
              }}
            />
          )}

          <div
            className="share"
            onClick={() => {
              setHeaderState(HeaderState.Share);

              setTarget(undefined);
            }}
          />
        </>
      )}
    </div>
  );
}
