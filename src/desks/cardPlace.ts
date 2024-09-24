import { CardZone } from "./cardZone";

export type CardPlace =
  | {
      zone: CardZone.Table;
    }
  | {
      zone: CardZone.List;
      index: number;
    };
