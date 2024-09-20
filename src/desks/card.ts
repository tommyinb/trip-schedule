import { CardContent } from "./cardContent";
import { CardState } from "./cardState";

export interface Card {
  id: number;

  state: CardState;

  content: CardContent;
}
