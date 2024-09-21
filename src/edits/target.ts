import { Card } from "../desks/card";
import { TargetType } from "./targetType";

export interface Target {
  type: TargetType;
  card: Card;
}
