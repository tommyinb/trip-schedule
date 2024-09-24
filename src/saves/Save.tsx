import { useContext, useEffect } from "react";
import { getShareId } from "./getShareId";
import { SaveContext } from "./SaveContext";
import { useFileContent } from "./useFileContent";

export const storageKey = "saves-Save";

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

    const shareId = getShareId();
    const outputKey = shareId ? `${storageKey}.${shareId}` : storageKey;

    const text = JSON.stringify(file);

    localStorage.setItem(outputKey, text);
  }, [applyId, file]);

  return <></>;
}
