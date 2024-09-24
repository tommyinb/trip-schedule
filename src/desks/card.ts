import { CardContent } from "./cardContent";
import { CardPlace } from "./cardPlace";
import { CardState } from "./cardState";

export interface Card {
  id: number;

  state: CardState;

  place: CardPlace;

  content: CardContent;
}
