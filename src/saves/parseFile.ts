import { File } from "./file";
import { Json } from "./Json";

export function parseFile(text: string): File {
  const value = JSON.parse(text) as Json<File>;

  return {
    ...value,
    content: {
      ...value.content,
      startDate: new Date(value.content.startDate),
      endDate: new Date(value.content.endDate),
      cards: value.content.cards.map((card) => ({
        ...card,
        content: {
          ...card.content,
          time: new Date(card.content.time),
        },
      })),
    },
    editTime: new Date(value.editTime),
  };
}
