import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useEffect } from "react";
import { findUrlValue } from "./findUrlValue";
import { storage } from "./firestore";
import { getFilePath } from "./getFilePath";
import { parseFile } from "./parseFile";
import { saveKey } from "./Save";
import { SaveContext } from "./SaveContext";
import { shareKey } from "./Share";
import { useApplyFileContent } from "./useApplyFileContent";

const loadKey = "loadId";

export function Load() {
  const { applyId, setApplyId } = useContext(SaveContext);

  const applyContent = useApplyFileContent();
  useEffect(() => {
    if (applyId) {
      return;
    }

    const cancellation = { canceled: false };
    (async function () {
      const text = await (async function () {
        const loadId = findUrlValue(loadKey);
        const shareId = findUrlValue(shareKey);

        const loads = [
          ...(loadId
            ? [() => loadGlobalStorage(loadId), () => loadLocalStorage(loadId)]
            : []),
          ...(shareId
            ? [
                () => loadGlobalStorage(shareId),
                () => loadLocalStorage(shareId),
              ]
            : []),
          () => loadLocalStorage(),
        ];

        async function loadGlobalStorage(id: string) {
          try {
            const filePath = getFilePath(id);

            const storageRef = ref(storage, filePath);
            const url = await getDownloadURL(storageRef);

            const response = await fetch(url);
            return await response.text();
          } catch (error) {
            console.error(`failed to load ${id}`, error);
            return undefined;
          }
        }

        function loadLocalStorage(id?: string) {
          return localStorage.getItem(id ? `${saveKey}.${id}` : saveKey);
        }

        for (const load of loads) {
          const text = await load();
          if (text) {
            return text;
          }
        }

        return undefined;
      })();

      if (cancellation.canceled) {
        return;
      }

      if (!text) {
        setApplyId((id) => (id ?? 0) + 1);
        return;
      }

      const file = parseFile(text);
      applyContent(file.content);

      setApplyId((id) => (id ?? 0) + 1);
    })();
    return () => {
      cancellation.canceled = true;
    };
  }, [applyContent, applyId, setApplyId]);

  return <></>;
}
