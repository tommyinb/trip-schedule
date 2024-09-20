import { useLayoutEffect, useRef, useState } from "react";
import "./Preview.css";
import { Card } from "./card";

export function Preview({ className, card }: Props) {
  const measureRef = useRef<HTMLDivElement>(null);

  const [nameVisible, setNameVisible] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);

  const [locationVisible, setLocationVisible] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const [timeVisible, setTimeVisible] = useState(false);
  const timeRef = useRef<HTMLDivElement>(null);

  const [durationVisible, setDurationVisible] = useState(false);
  const durationRef = useRef<HTMLDivElement>(null);

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

      const locationRect = locationRef.current?.getBoundingClientRect();
      if (locationRect) {
        setLocationVisible(locationRect.bottom <= measureRect.bottom);
      }

      const timeRect = timeRef.current?.getBoundingClientRect();
      if (timeRect) {
        setTimeVisible(timeRect.bottom <= measureRect.bottom);
      }

      const durationRect = durationRef.current?.getBoundingClientRect();
      if (durationRect) {
        setDurationVisible(durationRect.bottom <= measureRect.bottom);
      }
    }

    const observer = new ResizeObserver(update);
    observer.observe(measureRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`desks-Preview ${className}`}>
      {nameVisible && <div className="name">{card.content.name}</div>}

      {locationVisible && (
        <div className="location">{card.content.location}</div>
      )}

      {timeVisible && (
        <div className="time">
          {card.content.time.getHours().toString().padStart(2, "0")}:
          {card.content.time.getMinutes().toString().padStart(2, "0")}
        </div>
      )}

      {durationVisible && (
        <div className="duration">
          {card.content.duration / (60 * 1000)} minutes
        </div>
      )}

      <div className="measure" ref={measureRef}>
        <div className="name" ref={nameRef}>
          {card.content.name}
        </div>

        <div className="location" ref={locationRef}>
          {card.content.location}
        </div>

        <div className="time" ref={timeRef}>
          {card.content.time.getHours().toString().padStart(2, "0")}:
          {card.content.time.getMinutes().toString().padStart(2, "0")}
        </div>

        <div className="duration" ref={durationRef}>
          {card.content.duration / (60 * 1000)} minutes
        </div>
      </div>
    </div>
  );
}

interface Props {
  className: string;
  card: Card;
}
