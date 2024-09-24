import { useContext } from "react";
import "./HeaderName.css";
import { TripContext } from "./TripContext";
import { HeaderState } from "./headerState";

export function HeaderName({ state, setState }: Props) {
  const { name, setName, editable } = useContext(TripContext);

  return (
    <div className="trips-HeaderName">
      {state === HeaderState.View && (
        <div className="view">
          <div className="text">{name}</div>

          <div
            className={editable ? "toggle" : "viewing"}
            onClick={() => setState(HeaderState.Edit)}
          />
        </div>
      )}

      {state === HeaderState.Edit && (
        <div className="edit">
          <input
            className="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editable}
          />

          <div className="toggle" onClick={() => setState(HeaderState.View)} />
        </div>
      )}
    </div>
  );
}

interface Props {
  state: HeaderState;
  setState: (state: HeaderState) => void;
}
