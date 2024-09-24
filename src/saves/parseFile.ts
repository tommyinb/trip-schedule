import { File } from "./file";
import { Json } from "./Json";

export function parseFile(text: string): File {
  const value = JSON.parse(text) as Json<File>;

  return {
    ...value,
    startDate: new Date(value.startDate),
    endDate: new Date(value.endDate),
    cards: value.cards.map((card) => ({
      ...card,
      content: {
        ...card.content,
        time: new Date(card.content.time),
      },
    })),
  };
}
