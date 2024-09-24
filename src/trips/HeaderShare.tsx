import { useContext } from "react";
import { Share } from "../saves/Share";
import "./HeaderShare.css";
import { HeaderState } from "./headerState";
import { Slider } from "./Slider";
import { TripContext } from "./TripContext";

export function HeaderShare({ state, setState }: Props) {
  const { name } = useContext(TripContext);

  return (
    <div className="trips-HeaderShare">
      {state === HeaderState.Share && (
        <div className="name">
          <div className={`text ${name ? "active" : ""}`}>
            {name || "New Trip"}
          </div>

          <div className="view" onClick={() => setState(HeaderState.View)} />
        </div>
      )}

      <Slider active={state === HeaderState.Share}>
        <div className="share">{state === HeaderState.Share && <Share />}</div>
      </Slider>
    </div>
  );
}

interface Props {
  state: HeaderState;
  setState: (state: HeaderState) => void;
}
