import { useState } from "react";
import "./Header.css";
import { HeaderName } from "./HeaderName";
import { HeaderState } from "./headerState";
import { Setting } from "./Setting";
import { Slider } from "./Slider";

export function Header() {
  const [state, setState] = useState(HeaderState.View);

  return (
    <div className="trips-Header">
      <HeaderName state={state} setState={setState} />

      <Slider active={state === HeaderState.Edit}>
        <Setting />
      </Slider>
    </div>
  );
}
