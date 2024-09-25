import { useContext } from "react";
import { DeskContext } from "../desks/DeskContext";
import { Column } from "./Column";
import { Legend } from "./Legend";
import "./Table.css";
import { useDates } from "./useDates";

export function Table() {
  const dates = useDates();

  const { tableContentRef: tableRef } = useContext(DeskContext);

  return (
    <div className="tables-Table" ref={tableRef}>
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
