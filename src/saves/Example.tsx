import { useContext, useEffect } from "react";
import { Json } from "./Json";
import { saveKey } from "./Save";
import { SaveContext } from "./SaveContext";
import exampleFile from "./exampleFile.json";
import { exampleId } from "./exampleId";
import { File } from "./file";
import { retypeFile } from "./retypeFile";
import { useApplyFileContent } from "./useApplyFileContent";

export default function Example() {
  const { applyId, setApplyId } = useContext(SaveContext);
  const applyContent = useApplyFileContent();

  useEffect(() => {
    if (applyId) {
      return;
    }

    const output = (() => {
      const storageText = localStorage.getItem(`${saveKey}.${exampleId}`);
      if (storageText) {
        try {
          const storageJson = JSON.parse(storageText) as Json<File>;
          return retypeFile(storageJson);
        } catch (error) {
          console.error(`failed to load example from local storage`, error);
        }
      }

      const exampleJson = exampleFile as Json<File>;
      return retypeFile(exampleJson);
    })();

    applyContent(output.content);

    setApplyId((id) => (id ?? 0) + 1);
  }, [applyContent, applyId, setApplyId]);

  return <></>;
}
