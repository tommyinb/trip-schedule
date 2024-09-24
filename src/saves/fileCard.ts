import { Card } from "../desks/card";

export type FileCard = Omit<Card, "state">;
