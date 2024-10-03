import { useContext } from "react";
import "./HeaderEdit.css";
import { HeaderState } from "./headerState";
import { Setting } from "./Setting";
import { setTitle } from "./setTitle";
import { Slider } from "./Slider";
import { TripContext } from "./TripContext";

export function HeaderEdit() {
  const { headerState, setHeaderState, name, setName, editable } =
    useContext(TripContext);

  return (
    <div className="trips-HeaderEdit">
      {headerState === HeaderState.Edit && (
        <div className="name">
          <input
            className="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              setTitle(e.target.value);
            }}
            disabled={!editable}
          />

          <div
            className="view"
            onClick={() => setHeaderState(HeaderState.View)}
          />
        </div>
      )}

      <Slider active={headerState === HeaderState.Edit}>
        <Setting />
      </Slider>
    </div>
  );
}
