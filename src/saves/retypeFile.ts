import { CardColor } from "../desks/cardColor";
import { File } from "./file";
import { Json } from "./Json";

export function retypeFile(json: Json<File>): File {
  return {
    ...json,
    content: {
      ...json.content,
      startDate: new Date(json.content.startDate),
      endDate: new Date(json.content.endDate),
      cards: json.content.cards.map((card) => ({
        ...card,
        content: {
          ...card.content,
          time: new Date(card.content.time),
          color: card.content.color ?? CardColor.Green,
        },
      })),
    },
    editTime: new Date(json.editTime),
  };
}
