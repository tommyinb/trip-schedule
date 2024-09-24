import { FileCard } from "./fileCard";

export interface File {
  name: string;

  startDate: Date;
  endDate: Date;

  startHour: number;
  endHour: number;

  cards: FileCard[];
}
