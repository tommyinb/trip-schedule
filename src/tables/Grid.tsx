import { useContext } from "react";
import { DeskContext } from "../desks/DeskContext";
import "./Grid.css";
import { GridColumn } from "./GridColumn";
import { GridLegend } from "./GridLegend";
import { useDates } from "./useDates";

export function Grid() {
  const dates = useDates();

  const { gridRef } = useContext(DeskContext);

  return (
    <div className="tables-Grid" ref={gridRef}>
      <GridLegend />

      {dates.map((date) => (
        <div key={date.toISOString()} className="column">
          <div className="line" />

          <GridColumn className="column" date={date} />
        </div>
      ))}
    </div>
  );
}
