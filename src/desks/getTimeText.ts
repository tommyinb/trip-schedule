import { getTimeText as getEditText } from "../edits/getTimeText";

export function getTimeText(time: Date) {
  return getEditText(time.getHours(), time.getMinutes());
}
