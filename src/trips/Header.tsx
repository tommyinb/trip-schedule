import { useContext } from "react";
import "./Header.css";
import { HeaderEdit } from "./HeaderEdit";
import { HeaderShare } from "./HeaderShare";
import { HeaderState } from "./headerState";
import { HeaderView } from "./HeaderView";
import { TripContext } from "./TripContext";
import { useKeyDown } from "./useKeyDown";

export function Header() {
  const { headerState, setHeaderState } = useContext(TripContext);

  useKeyDown((event) => {
    if (event.key === "Escape") {
      setHeaderState(HeaderState.View);
    }
  });

  return (
    <div className="trips-Header">
      {headerState === HeaderState.View && (
        <HeaderView setState={setHeaderState} />
      )}

      <HeaderEdit state={headerState} setState={setHeaderState} />

      <HeaderShare state={headerState} setState={setHeaderState} />
    </div>
  );
}
