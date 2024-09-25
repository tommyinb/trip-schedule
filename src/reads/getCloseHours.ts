import { CardContent } from "../desks/cardContent";
import { getDatePart } from "../edits/getDatePart";

export function getCloseHours(content: CardContent) {
  const startTime = new Date(content.time);
  const startDate = getDatePart(startTime);

  const endTime = new Date(content.time.getTime() + content.duration);
  const endDate = getDatePart(endTime);

  const allDates: Date[] = [];
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    allDates.push(new Date(currentDate));
  }

  return allDates.flatMap((date) => {
    let closeHours = [
      {
        fromHour:
          date.getTime() === startDate.getTime() ? startTime.getHours() : 0,
        fromMinute:
          date.getTime() === startDate.getTime() ? startTime.getMinutes() : 0,

        toHour: date.getTime() === endDate.getTime() ? endTime.getHours() : 23,
        toMinute:
          date.getTime() === endDate.getTime() ? endTime.getMinutes() : 59,
      },
    ];

    const openings = content.openings
      .filter(
        (opening) =>
          opening.startHour * 60 + opening.startMinute <
          opening.endHour * 60 + opening.startMinute
      )
      .filter((opening) => opening.weekdays.includes(date.getDay()));

    for (const dayOpening of openings) {
      const openingStart = dayOpening.startHour * 60 + dayOpening.startMinute;
      const openingEnd = dayOpening.endHour * 60 + dayOpening.endMinute;

      closeHours = closeHours.flatMap((closeHour) => {
        const closeStart = closeHour.fromHour * 60 + closeHour.fromMinute;
        const closeEnd = closeHour.toHour * 60 + closeHour.toMinute;

        if (closeStart < openingStart) {
          if (closeEnd < openingStart) {
            return [closeHour];
          } else {
            if (closeEnd <= openingEnd) {
              return [
                {
                  fromHour: closeHour.fromHour,
                  fromMinute: closeHour.fromMinute,
                  toHour: dayOpening.startHour,
                  toMinute: dayOpening.startMinute,
                },
              ];
            } else {
              return [
                {
                  fromHour: closeHour.fromHour,
                  fromMinute: closeHour.fromMinute,
                  toHour: dayOpening.startHour,
                  toMinute: dayOpening.startMinute,
                },
                {
                  fromHour: dayOpening.endHour,
                  fromMinute: dayOpening.endMinute,
                  toHour: closeHour.toHour,
                  toMinute: closeHour.toMinute,
                },
              ];
            }
          }
        } else {
          if (closeStart <= openingEnd) {
            if (closeEnd <= openingEnd) {
              return [];
            } else {
              return [
                {
                  fromHour: dayOpening.endHour,
                  fromMinute: dayOpening.endMinute,
                  toHour: closeHour.toHour,
                  toMinute: closeHour.toMinute,
                },
              ];
            }
          } else {
            return [closeHour];
          }
        }
      });
    }

    return closeHours.map((closeHour) => ({
      date,
      ...closeHour,
    }));
  });
}
