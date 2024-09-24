import { useCallback, useContext, useState } from "react";
import { Card } from "../desks/card";
import { DeskContext } from "../desks/DeskContext";
import { replace } from "../desks/replace";
import { SaveContext } from "../saves/SaveContext";
import { SoftInput } from "../trips/SoftInput";
import { getDurationText } from "./getDurationText";
import "./ModifyDuration.css";

export function ModifyDuration({ card }: Props) {
  const { id } = useContext(SaveContext);

  const [text, setText] = useState(() =>
    getDurationText(card.content.duration)
  );
  const [invalid, setInvalid] = useState(false);

  const { setCards } = useContext(DeskContext);
  const setDuration = useCallback(
    (duration: number) => {
      setCards((cards) =>
        replace(cards, card, {
          ...card,
          content: {
            ...card.content,
            duration,
          },
        })
      );
    },
    [card, setCards]
  );

  return (
    <SoftInput
      key={id}
      className="edits-ModifyDuration"
      text={text}
      onText={(text) => {
        setText(text);

        const input = matchInput(text);
        if (!input) {
          setInvalid(true);
          return;
        }

        if (input > 10 * 24 * 60) {
          setInvalid(true);
          return;
        }

        setDuration(input * 60 * 1000);
        setInvalid(false);
      }}
      invalid={invalid}
      onLeft={
        card.content.duration > 15 * 60 * 1000
          ? () => {
              const duration = Math.max(
                (Math.floor(card.content.duration / (30 * 60 * 1000)) - 1) *
                  (30 * 60 * 1000),
                15 * 60 * 1000
              );
              setDuration(duration);

              setText(getDurationText(duration));
              setInvalid(false);
            }
          : undefined
      }
      onRight={
        card.content.duration < 1000 * 60 * 60 * 1000
          ? () => {
              const duration = Math.min(
                (Math.floor(card.content.duration / (30 * 60 * 1000)) + 1) *
                  (30 * 60 * 1000),
                1000 * 60 * 60 * 1000
              );
              setDuration(duration);

              setText(getDurationText(duration));
              setInvalid(false);
            }
          : undefined
      }
    />
  );
}

interface Props {
  card: Card;
}

function matchInput(inputText: string) {
  const timeMatch = /(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)/.exec(inputText);
  if (timeMatch) {
    const [, hourText, minuteText] = timeMatch;

    const hourValue = parseFloat(hourText);
    const minuteValue = parseFloat(minuteText);

    return Math.floor(hourValue * 60 + minuteValue);
  } else {
    const hourMatch = /(\d+(?:\.\d+)?)\s*(hour|hr|h)s?/.exec(inputText);
    const minuteMatch = /(\d+(?:\.\d+)?)\s*(minute|min|m)s?/.exec(inputText);

    if (hourMatch || minuteMatch) {
      const hourText = hourMatch ? hourMatch[1] : "0";
      const hourValue = parseFloat(hourText);

      const minuteText = minuteMatch ? minuteMatch[1] : "0";
      const minuteValue = parseFloat(minuteText);

      return Math.floor(hourValue * 60 + minuteValue);
    } else {
      const numberMatch = /\d+(?:\.\d+)?/.exec(inputText);
      if (numberMatch) {
        return parseFloat(numberMatch[0]);
      } else {
        return undefined;
      }
    }
  }
}
