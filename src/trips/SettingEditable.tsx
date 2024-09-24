import { useContext } from "react";
import "./SettingEditable.css";
import { TripContext } from "./TripContext";

export function SettingEditable({ className }: Props) {
  const { editable, setEditable } = useContext(TripContext);

  return (
    <div className={`trips-SettingEditable ${className}`}>
      <div className="label">Edit Mode</div>

      <div className="content" onClick={() => setEditable(!editable)}>
        <div className="left" />

        <div className={`value ${editable ? "edit" : "view"}`}>
          {editable ? "Edit" : "View"}
        </div>

        <div className="right" />
      </div>
    </div>
  );
}

interface Props {
  className: string;
}
