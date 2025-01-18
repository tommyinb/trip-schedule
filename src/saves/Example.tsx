import { useContext, useEffect } from "react";
import { Json } from "./Json";
import { SaveContext } from "./SaveContext";
import exampleFile from "./exampleFile.json";
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

    const json = exampleFile as Json<File>;
    const output = retypeFile(json);

    applyContent(output.content);

    setApplyId((id) => (id ?? 0) + 1);
  }, [applyContent, applyId, setApplyId]);

  return <></>;
}
