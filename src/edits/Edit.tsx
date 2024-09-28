import { useContext, useLayoutEffect, useRef, useState } from "react";
import "./Edit.css";
import { EditContext } from "./EditContext";
import { Form } from "./Form";

export function Edit() {
  const { target } = useContext(EditContext);

  const formRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState(0);

  useLayoutEffect(() => {
    if (!formRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const rect = formRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      setFormHeight(rect.height);
    });

    observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="edits-Edit" style={{ minHeight: target ? formHeight : 0 }}>
      <Form formRef={formRef} />

      <div className="footer">
        Trip Schedule by{" "}
        <a href="https://github.com/tommyinb/trip-schedule">Tommy</a>
      </div>
    </div>
  );
}
