import { ItemType } from "../reads/itemType";
import { useCardItems } from "../reads/useCardItems";
import { ViewCloseHour } from "../reads/ViewCloseHour";
import { ViewTimeClash } from "../reads/ViewTimeClash";
import "./ViewRead.css";

export function ViewRead({ cardId }: Props) {
  const items = useCardItems(cardId);

  return (
    <div className="edits-ViewRead">
      {items.length > 0 && (
        <>
          <div className="label">Warnings</div>
          <div className="content">
            {items.map((item, index) => {
              switch (item.type) {
                case ItemType.TimeClash:
                  return (
                    <ViewTimeClash key={index} cardId={cardId} item={item} />
                  );
                case ItemType.CloseHour:
                  return <ViewCloseHour key={index} cardId={cardId} />;
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  cardId: number;
}
