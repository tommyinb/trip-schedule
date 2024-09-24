import {
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Edit.css";
import { EditContext } from "./EditContext";
import { Form } from "./Form";
import { Target } from "./target";

export function Edit({ children }: PropsWithChildren) {
  const [target, setTarget] = useState<Target>();

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
    <div className="edits-Edit">
      <EditContext.Provider
        value={useMemo(() => ({ target, setTarget }), [target])}
      >
        {children}

        <Form formRef={formRef} />

        <div className="space" style={{ height: target ? formHeight : 0 }} />
      </EditContext.Provider>
    </div>
  );
}
