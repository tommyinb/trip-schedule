import { useState } from "react";
import { SoftInput } from "../trips/SoftInput";
import { getTimeText } from "./getTimeText";
import { matchTime } from "./matchTime";

export function TimeInput({
  className,
  value,
  setValue,
  leftValue,
  rightValue,
}: Props) {
  const [text, setText] = useState(() => getTimeText(value.hour, value.minute));

  const [invalid, setInvalid] = useState(false);

  return (
    <SoftInput
      className={className}
      text={text}
      onText={(text) => {
        setText(text);

        const match = matchTime(text);
        if (!match) {
          setInvalid(true);
          return;
        }

        setValue(match);
        setInvalid(false);
      }}
      invalid={invalid}
      onLeft={
        leftValue
          ? () => {
              setValue(leftValue);

              setText(getTimeText(leftValue.hour, leftValue.minute));
              setInvalid(false);
            }
          : undefined
      }
      onRight={
        rightValue
          ? () => {
              setValue(rightValue);

              setText(getTimeText(rightValue.hour, rightValue.minute));
              setInvalid(false);
            }
          : undefined
      }
    />
  );
}

interface Props {
  className?: string;

  value: Value;
  setValue: (value: Value) => void;

  leftValue: Value | undefined;
  rightValue: Value | undefined;
}

interface Value {
  hour: number;
  minute: number;
}
