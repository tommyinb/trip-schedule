import "./Header.css";
import { HeaderEdit } from "./HeaderEdit";
import { HeaderShare } from "./HeaderShare";
import { HeaderView } from "./HeaderView";

export function Header() {
  return (
    <div className="trips-Header">
      <HeaderView />

      <HeaderEdit />

      <HeaderShare />
    </div>
  );
}
