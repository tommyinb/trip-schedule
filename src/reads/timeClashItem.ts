import { ItemType } from "./itemType";

export interface TimeClashItem {
  type: ItemType.TimeClash;
  cardIds: number[];
}
