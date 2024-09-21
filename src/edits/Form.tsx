import { useContext } from "react";
import { EditContext } from "./EditContext";
import "./Form.css";

export function Form() {
  const { target } = useContext(EditContext);

  return (
    <div className="edits-Form">
      <h1>Form</h1>

      {target && (
        <>
          <div>{target.type}</div>
          <div>{target.card.content.name}</div>
          <div>{target.card.content.time.toLocaleDateString()}</div>
          <div>{target.card.content.time.toLocaleTimeString()}</div>
          <div>{target.card.content.duration}</div>
          <div>{target.card.content.location}</div>
        </>
      )}
    </div>
  );
}
