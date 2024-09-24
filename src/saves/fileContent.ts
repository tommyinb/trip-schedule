import { Card } from "../desks/card";

export interface FileContent {
  name: string;

  startDate: Date;
  endDate: Date;

  startHour: number;
  endHour: number;

  editable: boolean;

  cards: Omit<Card, "state">[];
}
