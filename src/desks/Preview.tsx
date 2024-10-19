import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { getTimeText } from "./getTimeText";
import "./Preview.css";

export function Preview({ className, card }: Props) {
  const measureRef = useRef<HTMLDivElement>(null);

  const nameRef = useRef<HTMLDivElement>(null);

  const timeText = useMemo(
    () =>
      `${getTimeText(card.content.time)} - ${getTimeText(
        new Date(card.content.time.getTime() + card.content.duration)
      )}`,
    [card.content.duration, card.content.time]
  );

  const [timeVisible, setTimeVisible] = useState(false);
  const timeRef = useRef<HTMLDivElement>(null);

  const [locationVisible, setLocationVisible] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!measureRef.current) {
      return;
    }

    const paris = [
      { ref: timeRef, set: setTimeVisible },
      { ref: locationRef, set: setLocationVisible },
    ];

    update();
    function update() {
      const measureRect = measureRef.current?.getBoundingClientRect();
      if (!measureRect) {
        return;
      }

      let remainingHeight = measureRect.height;

      const nameRect = nameRef.current?.getBoundingClientRect();
      if (nameRect) {
        remainingHeight -= nameRect.height;
      }

      for (const { ref, set } of paris) {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.height < remainingHeight || remainingHeight > 50) {
            set(true);

            remainingHeight -= rect.height;
          } else {
            set(false);
          }
        }
      }
    }

    const observer = new ResizeObserver(update);
    observer.observe(measureRef.current);

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    for (const { ref } of paris) {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`desks-Preview ${className}`}>
      <div className="display">
        {timeVisible && <div className="time">{timeText}</div>}

        {<div className="name">{card.content.name}</div>}

        {locationVisible && (
          <div className="location">{card.content.location}</div>
        )}
      </div>

      <div className="measure" ref={measureRef}>
        <div className="name" ref={nameRef}>
          {card.content.name}
        </div>

        <div className="time" ref={timeRef}>
          {timeText}
        </div>

        <div className="location" ref={locationRef}>
          {card.content.location}
        </div>
      </div>
    </div>
  );
}

interface Props {
  className: string;
  card: Card;
}
