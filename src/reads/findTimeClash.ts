import { CardContent } from "../desks/cardContent";

export function findTimeClash(
  leftContent: CardContent,
  rightContent: CardContent
) {
  const leftEndTime = new Date(
    leftContent.time.getTime() + leftContent.duration
  );

  const rightEndTime = new Date(
    rightContent.time.getTime() + rightContent.duration
  );

  if (!(rightContent.time < leftEndTime && leftContent.time < rightEndTime)) {
    return undefined;
  }

  return {
    fromTime: new Date(
      Math.max(leftContent.time.getTime(), rightContent.time.getTime())
    ),
    toTime: new Date(Math.min(leftEndTime.getTime(), rightEndTime.getTime())),
  };
}
