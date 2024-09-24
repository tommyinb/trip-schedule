import { useContext, useEffect } from "react";
import { parseFile } from "./parseFile";
import { SaveContext } from "./SaveContext";
import { useFile } from "./useFile";

export function Storage() {
  const { id, setId } = useContext(SaveContext);

  const [file, applyFile] = useFile();

  const storageKey = "saves-Storage";
  useEffect(() => {
    if (id) {
      return;
    }

    setId((id) => (id ?? 0) + 1);

    const text = localStorage.getItem(storageKey);

    if (!text) {
      return;
    }

    const file = parseFile(text);

    applyFile(file);
  }, [applyFile, id, setId]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const text = JSON.stringify(file);

    localStorage.setItem(storageKey, text);
  }, [file, id]);

  return <></>;
}
