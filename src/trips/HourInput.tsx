import { useState } from "react";
import { SoftInput } from "./SoftInput";

export function HourInput({
  className,
  value,
  trySetValue,
  leftValue,
  rightValue,
}: Props) {
  const [text, setText] = useState(() => value.toString());
  const [invalid, setInvalid] = useState(false);

  return (
    <SoftInput
      className={className}
      text={text}
      onText={(text) => {
        setText(text);

        const value = parseInt(text);
        if (isNaN(value)) {
          setInvalid(true);
          return;
        }

        if (value < 0 || value >= 48) {
          setInvalid(true);
          return;
        }

        if (!trySetValue(value % 24)) {
          setInvalid(true);
          return;
        }

        setInvalid(false);
      }}
      invalid={invalid}
      onLeft={
        leftValue !== undefined
          ? () => {
              trySetValue(leftValue);

              setText(leftValue.toString());
              setInvalid(false);
            }
          : undefined
      }
      onRight={
        rightValue !== undefined
          ? () => {
              trySetValue(rightValue);

              setText(rightValue.toString());
              setInvalid(false);
            }
          : undefined
      }
    />
  );
}

interface Props {
  className?: string;

  value: number;
  trySetValue: (value: number) => boolean;

  leftValue: number | undefined;
  rightValue: number | undefined;
}
