import { Column } from "./Column";
import { Legend } from "./Legend";
import "./Table.css";
import { useDates } from "./useDates";

export function Table() {
  const dates = useDates();

  return (
    <div className="tables-Table">
      <Legend />

      {dates.map((date) => (
        <div key={date.toISOString()} className="column">
          <div className="line" />

          <Column className="column" date={date} />
        </div>
      ))}
    </div>
  );
}
