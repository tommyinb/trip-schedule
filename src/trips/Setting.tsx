import "./Setting.css";
import { SettingDate } from "./SettingDate";
import { SettingEditable } from "./SettingEditable";
import { SettingHour } from "./SettingHour";

export function Setting() {
  return (
    <div className="trips-Setting">
      <SettingDate className="period" />

      <SettingHour className="time" />

      <SettingEditable className="editable" />
    </div>
  );
}
