import { Card } from "../desks/card";
import { ModifyOpening } from "./ModifyOpening";
import "./ModifyOpenings.css";
import { ModifyOpeningsAdd } from "./ModifyOpeningsAdd";

export function ModifyOpenings({ card }: Props) {
  return (
    <div className="edits-ModifyOpenings">
      {card.content.openings.length > 0 && (
        <div className="content">
          {card.content.openings.map((opening, index) => (
            <ModifyOpening key={index} card={card} opening={opening} />
          ))}
        </div>
      )}

      <ModifyOpeningsAdd card={card} />
    </div>
  );
}

interface Props {
  card: Card;
}
