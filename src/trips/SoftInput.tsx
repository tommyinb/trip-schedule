import "./SoftInput.css";

export function SoftInput({
  className,
  text,
  onText,
  invalid,
  onLeft,
  onRight,
}: Props) {
  return (
    <div className={`trips-SoftInput ${className ?? ""}`}>
      <div
        className={`left ${onLeft ? "active" : ""}`}
        onClick={() => onLeft?.()}
      />

      <input
        className={`text ${invalid ? "invalid" : ""}`}
        value={text}
        onChange={(event) => onText(event.target.value)}
      />

      <div
        className={`right ${onRight ? "active" : ""}`}
        onClick={() => onRight?.()}
      />
    </div>
  );
}

interface Props {
  className?: string;

  text: string;
  onText: (text: string) => void;

  invalid: boolean;

  onLeft: (() => void) | undefined;
  onRight: (() => void) | undefined;
}
