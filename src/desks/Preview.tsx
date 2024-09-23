import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Card } from "./card";
import { getTimeText } from "./getTimeText";
import "./Preview.css";

export function Preview({ className, card }: Props) {
  const measureRef = useRef<HTMLDivElement>(null);

  const [nameVisible, setNameVisible] = useState(false);
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

    update();
    function update() {
      const measureRect = measureRef.current?.getBoundingClientRect();
      if (!measureRect) {
        return;
      }

      const nameRect = nameRef.current?.getBoundingClientRect();
      if (nameRect) {
        setNameVisible(nameRect.bottom <= measureRect.bottom);
      }

      const timeRect = timeRef.current?.getBoundingClientRect();
      if (timeRect) {
        setTimeVisible(timeRect.bottom <= measureRect.bottom);
      }

      const locationRect = locationRef.current?.getBoundingClientRect();
      if (locationRect) {
        setLocationVisible(locationRect.bottom <= measureRect.bottom);
      }
    }

    const observer = new ResizeObserver(update);
    observer.observe(measureRef.current);

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    if (timeRef.current) {
      observer.observe(timeRef.current);
    }

    if (locationRef.current) {
      observer.observe(locationRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`desks-Preview ${className}`}>
      <div className="display">
        {timeVisible && <div className="time">{timeText}</div>}

        {nameVisible && <div className="name">{card.content.name}</div>}

        {locationVisible && (
          <div className="location">{card.content.location}</div>
        )}
      </div>

      <div className="measure" ref={measureRef}>
        <div className="name" ref={nameRef}>
          {card.content.name}
        </div>

        <div className="location" ref={locationRef}>
          {card.content.location}
        </div>

        <div className="time" ref={timeRef}>
          {timeText}
        </div>
      </div>
    </div>
  );
}

interface Props {
  className: string;
  card: Card;
}
