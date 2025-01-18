import { useLayoutEffect, useRef, useState } from "react";
import "./Guide.css";
import { useCount } from "./useCount";

export function Guide() {
  const { count, setCount } = useCount();
  const [active, setActive] = useState(count < 2);

  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => ref.current?.focus(), []);

  return (
    <div
      className={`guides-Guide ${active ? "active" : ""}`}
      ref={ref}
      tabIndex={1}
      onBlur={() => {
        if (active) {
          setActive(false);
          setCount(count + 1);
        }
      }}
    >
      {active && (
        <>
          <div className="guy" />

          <div className="text">
            Open up <span className="gear" /> and set trip date. Double click on
            the table to add new activities. Long press to drag and drop. Use{" "}
            <span className="plane" /> to share with friends. Happy trip
            planning!
          </div>
        </>
      )}
    </div>
  );
}
