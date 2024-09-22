export function getDurationText(duration: number) {
  const allMinutes = Math.floor(duration / 60000);

  const hours = Math.floor(allMinutes / 60);

  if (hours > 0) {
    const hourMinutes = allMinutes % 60;

    if (hourMinutes > 0) {
      return `${hours} hr ${hourMinutes} min`;
    } else {
      return `${hours} hr`;
    }
  } else {
    return `${allMinutes} min`;
  }
}
