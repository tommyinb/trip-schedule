import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useEffect } from "react";
import { storage } from "./firestore";
import { getShareId } from "./getShareId";
import { parseFile } from "./parseFile";
import { storageKey } from "./Save";
import { SaveContext } from "./SaveContext";
import { useApplyFileContent } from "./useApplyFileContent";

export function Load() {
  const { applyId, setApplyId } = useContext(SaveContext);

  const applyContent = useApplyFileContent();
  useEffect(() => {
    if (applyId) {
      return;
    }

    const shareId = getShareId();
    if (shareId) {
      const cancellation = { canceled: false };
      (async function () {
        const text = await (async function () {
          try {
            const storageRef = ref(storage, `shares/${shareId}.json`);
            const url = await getDownloadURL(storageRef);

            const response = await fetch(url);
            return await response.text();
          } catch {
            return localStorage.getItem(`${storageKey}.${shareId}`);
          }
        })();

        if (cancellation.canceled) {
          return;
        }

        setApplyId((id) => (id ?? 0) + 1);

        if (!text) {
          return;
        }

        const file = parseFile(text);
        applyContent(file.content);
      })();
      return () => {
        cancellation.canceled = true;
      };
    } else {
      setApplyId((id) => (id ?? 0) + 1);

      const text = localStorage.getItem(storageKey);
      if (!text) {
        return;
      }

      const file = parseFile(text);
      applyContent(file.content);
    }
  }, [applyContent, applyId, setApplyId]);

  return <></>;
}
