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
      const file = await (async function () {
        const loadId = findUrlValue(loadKey);
        const shareId = findUrlValue(shareKey);

        if (loadId) {
          const loadFile = loadStorage(loadId);
          if (loadFile) {
            return loadFile;
          }
        }

        if (shareId) {
          const shareFile = loadStorage(shareId);
          if (shareFile) {
            return shareFile;
          }
        }

        async function loadStorage(id: string) {
          const globalFile = await loadGlobalStorage(id);
          const localFile = loadLocalStorage(`${saveKey}.${id}`);

          if (globalFile && localFile) {
            return localFile.editTime >= globalFile.editTime
              ? localFile
              : globalFile;
          }

          if (globalFile) {
            return globalFile;
          }

          if (localFile) {
            return localFile;
          }
        }

        async function loadGlobalStorage(id: string) {
          try {
            const filePath = getFilePath(id);

            const storageRef = ref(storage, filePath);
            const url = await getDownloadURL(storageRef);

            const response = await fetch(url);
            const text = await response.text();

            return parseFile(text);
          } catch (error) {
            console.error(`failed to load ${id} from global storage`, error);
            return undefined;
          }
        }

        function loadLocalStorage(key: string) {
          const text = localStorage.getItem(key);
          if (!text) {
            return undefined;
          }

          try {
            return parseFile(text);
          } catch (error) {
            console.error(`failed to load ${key} from local storage`, error);
            return undefined;
          }
        }

        const localFile = loadLocalStorage(saveKey);
        if (localFile) {
          return localFile;
        }

        return undefined;
      })();

      if (cancellation.canceled) {
        return;
      }

      if (file) {
        applyContent(file.content);
      }

      setApplyId((id) => (id ?? 0) + 1);
    })();
    return () => {
      cancellation.canceled = true;
    };
  }, [applyContent, applyId, setApplyId]);

  return <></>;
}
