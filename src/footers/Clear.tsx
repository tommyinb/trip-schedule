import { useContext, useEffect, useState } from "react";
import { DeskContext } from "../desks/DeskContext";
import { SaveContext } from "../saves/SaveContext";
import { useFileContent } from "../saves/useFileContent";
import { HeaderState } from "../trips/headerState";
import { TripContext } from "../trips/TripContext";
import "./Clear.css";

export function Clear() {
  const fileContent = useFileContent();

  const [confirming, setConfirming] = useState(false);
  useEffect(() => {
    if (fileContent) {
      setConfirming(false);
    }
  }, [fileContent]);

  const {
    setHeaderState,
    setName,
    setStartDate,
    setEndDate,
    setStartHour,
    setEndHour,
    setEditable,
  } = useContext(TripContext);
  const { setCards } = useContext(DeskContext);
  const { setApplyId } = useContext(SaveContext);

  return (
    <div
      className={`footers-Clear ${
        fileContent.cards.length > 0 ? "active" : ""
      }`}
    >
      <div className="start" onClick={() => setConfirming(!confirming)}>
        Clear
      </div>

      <div className={`confirm ${confirming ? "active" : ""}`}>
        <div className="text">All local data will be lost. Okay?</div>

        <div
          className="clear"
          onClick={() => {
            setHeaderState(HeaderState.View);

            setName("Happy New Trip");

            const startDate = new Date();
            startDate.setDate(startDate.getDate() + 7);
            setStartDate(startDate);

            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 3);
            setEndDate(endDate);

            setStartHour(6);
            setEndHour(5);

            setEditable(true);

            setCards([]);

            setApplyId((id) => id + 1);

            const oldHref = window.location.href;
            const newHref = oldHref.replace(/\?.+/, "");
            if (oldHref !== newHref) {
              history.pushState(null, "", newHref);
            }
          }}
        >
          Yes
        </div>

        <div className="cancel" onClick={() => setConfirming(false)}>
          No
        </div>
      </div>
    </div>
  );
}
