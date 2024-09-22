import { TargetType } from "./targetType";

export interface Target {
  targetId: number;
  type: TargetType;

  cardId: number;
}
