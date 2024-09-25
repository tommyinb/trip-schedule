import { useContext, useEffect } from "react";
import { findUrlValue } from "./findUrlValue";
import { SaveContext } from "./SaveContext";
import { shareKey } from "./Share";
import { useFileContent } from "./useFileContent";

export const saveKey = "saves-Save";

export function Save() {
  const { file, setFile, applyId } = useContext(SaveContext);

  const fileContent = useFileContent();
  useEffect(
    () =>
      setFile({
        content: fileContent,
        editTime: new Date(),
      }),
    [fileContent, setFile]
  );

  useEffect(() => {
    if (!applyId) {
      return;
    }

    const shareId = findUrlValue(shareKey);
    const outputKey = shareId ? `${saveKey}.${shareId}` : saveKey;

    const text = JSON.stringify(file);

    localStorage.setItem(outputKey, text);
  }, [applyId, file]);

  return <></>;
}
