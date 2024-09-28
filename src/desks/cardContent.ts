import { CardColor } from "./cardColor";
import { CardOpening } from "./cardOpening";

export interface CardContent {
  name: string;
  location: string;

  time: Date;
  duration: number;

  color: CardColor;

  remark: string;

  openings: CardOpening[];
}
