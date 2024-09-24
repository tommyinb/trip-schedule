import { useContext } from "react";
import "./HeaderEdit.css";
import { HeaderState } from "./headerState";
import { Setting } from "./Setting";
import { Slider } from "./Slider";
import { TripContext } from "./TripContext";

export function HeaderEdit({ state, setState }: Props) {
  const { name, setName, editable } = useContext(TripContext);

  return (
    <div className="trips-HeaderEdit">
      {state === HeaderState.Edit && (
        <div className="name">
          <input
            className="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editable}
          />

          <div className="view" onClick={() => setState(HeaderState.View)} />
        </div>
      )}

      <Slider active={state === HeaderState.Edit}>
        <Setting />
      </Slider>
    </div>
  );
}

interface Props {
  state: HeaderState;
  setState: (state: HeaderState) => void;
}
