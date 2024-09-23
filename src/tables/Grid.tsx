import "./Grid.css";
import { GridColumn } from "./GridColumn";
import { GridLegend } from "./GridLegend";
import { useDates } from "./useDates";

export function Grid() {
  const dates = useDates();

  return (
    <div className="tables-Grid">
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
