import { useContext } from "react";
import { Share } from "../saves/Share";
import "./HeaderShare.css";
import { HeaderState } from "./headerState";
import { Slider } from "./Slider";
import { TripContext } from "./TripContext";

export function HeaderShare() {
  const { headerState, setHeaderState, name } = useContext(TripContext);

  return (
    <div className="trips-HeaderShare">
      {headerState === HeaderState.Share && (
        <div className="name">
          <div className={`text ${name ? "active" : ""}`}>
            {name || "New Trip"}
          </div>

          <div
            className="view"
            onClick={() => setHeaderState(HeaderState.View)}
          />
        </div>
      )}

      <Slider active={headerState === HeaderState.Share}>
        <div className="share">
          {headerState === HeaderState.Share && <Share />}
        </div>
      </Slider>
    </div>
  );
}
