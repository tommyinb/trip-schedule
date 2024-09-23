import { PropsWithChildren } from "react";
import "./Slider.css";

export function Slider({ active, children }: Props) {
  return (
    <div className={`trips-Slider ${active ? "active" : ""}`}>
      <div className="content">{children}</div>
    </div>
  );
}

interface Props extends PropsWithChildren {
  active: boolean;
}
