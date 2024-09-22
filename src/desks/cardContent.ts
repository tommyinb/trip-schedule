import { CardOpening } from "./cardOpening";

export interface CardContent {
  name: string;
  location: string;

  time: Date;
  duration: number;

  remark: string;

  openings: CardOpening[];
}
