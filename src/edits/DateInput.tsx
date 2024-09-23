import { useState } from "react";
import { SoftInput } from "../trips/SoftInput";
import { getDateText } from "./getDateText";

export function DateInput({
  className,
  value,
  trySetValue,
  leftValue,
  rightValue,
}: Props) {
  const [text, setText] = useState(() =>
    getDateText(
      new Date(value.getFullYear(), value.getMonth(), value.getDate())
    )
  );

  const [invalid, setInvalid] = useState(false);

  return (
    <SoftInput
      className={className}
      text={text}
      onText={(text) => {
        setText(text);

        const inputDate = new Date(text);

        if (inputDate.toString() === "Invalid Date") {
          setInvalid(true);
          return;
        }

        const outputDate = new Date(
          inputDate.getFullYear(),
          inputDate.getMonth(),
          inputDate.getDate()
        );

        if (!trySetValue(outputDate)) {
          setInvalid(true);
          return;
        }

        setInvalid(false);
      }}
      invalid={invalid}
      onLeft={
        leftValue
          ? () => {
              trySetValue(leftValue);

              setText(getDateText(leftValue));
              setInvalid(false);
            }
          : undefined
      }
      onRight={
        rightValue
          ? () => {
              trySetValue(rightValue);

              setText(getDateText(rightValue));
              setInvalid(false);
            }
          : undefined
      }
    />
  );
}

interface Props {
  className?: string;

  value: Date;
  trySetValue: (value: Date) => boolean;

  leftValue: Date | undefined;
  rightValue: Date | undefined;
}
