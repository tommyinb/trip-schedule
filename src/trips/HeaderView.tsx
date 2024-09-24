import { useContext } from "react";
import { EditContext } from "../edits/EditContext";
import { HeaderState } from "./headerState";
import "./HeaderView.css";
import { TripContext } from "./TripContext";

export function HeaderView({ setState }: Props) {
  const { name, editable } = useContext(TripContext);

  const { setTarget } = useContext(EditContext);

  return (
    <div className="trips-HeaderView">
      <div className="text">{name}</div>

      {editable ? (
        <div
          className="edit"
          onClick={() => {
            setState(HeaderState.Edit);

            setTarget(undefined);
          }}
        />
      ) : (
        <div
          className="view"
          onClick={() => {
            setState(HeaderState.Edit);

            setTarget(undefined);
          }}
        />
      )}

      <div
        className="share"
        onClick={() => {
          setState(HeaderState.Share);

          setTarget(undefined);
        }}
      />
    </div>
  );
}

interface Props {
  setState: (state: HeaderState) => void;
}
