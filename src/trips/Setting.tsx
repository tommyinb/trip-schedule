import "./Setting.css";
import { SettingDate } from "./SettingDate";
import { SettingHour } from "./SettingHour";

export function Setting() {
  return (
    <div className="trips-Setting">
      <SettingDate className="period" />

      <SettingHour className="time" />
    </div>
  );
}
