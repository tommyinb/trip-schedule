import { useMemo } from "react";
import "./ViewRemark.css";

export function ViewRemark({ remark }: Props) {
  return (
    <div className="edits-ViewRemark">
      {useMemo(() => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = remark.split(urlRegex);

        return parts.map((part, index) =>
          urlRegex.test(part) ? (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          ) : (
            <span key={index}>{part}</span>
          )
        );
      }, [remark])}
    </div>
  );
}

interface Props {
  remark: string;
}
