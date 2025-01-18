import { getDownloadURL, ref } from "firebase/storage";
import { lazy, Suspense, useContext, useEffect, useMemo } from "react";
import { exampleId } from "./exampleId";
import { File } from "./file";
import { findUrlValue } from "./findUrlValue";
import { storage } from "./firestore";
import { getFilePath } from "./getFilePath";
import { Json } from "./Json";
import { retypeFile } from "./retypeFile";
import { saveKey } from "./Save";
import { SaveContext } from "./SaveContext";
import { shareKey } from "./Share";
import { useApplyFileContent } from "./useApplyFileContent";
const Example = lazy(() => import("./Example"));

export const loadKey = "loadId";

export function Load() {
  const loadId = useMemo(() => findUrlValue(loadKey), []);
  const shareId = useMemo(() => findUrlValue(shareKey), []);

  const exampled = loadId === exampleId || shareId === exampleId;

  const { applyId, setApplyId } = useContext(SaveContext);
  const applyContent = useApplyFileContent();

  useEffect(() => {
    if (applyId) {
      return;
    }

    if (exampled) {
      return;
    }

    const cancellation = { canceled: false };
    (async function () {
      const file = await (async function () {
        if (loadId) {
          const loadFile = await loadStorage(loadId);
          if (loadFile) {
            return loadFile;
          }
        }

        if (shareId) {
          const shareFile = await loadStorage(shareId);
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

            const json = JSON.parse(text) as Json<File>;
            return retypeFile(json);
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
            const json = JSON.parse(text) as Json<File>;
            return retypeFile(json);
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
  }, [applyContent, applyId, exampled, loadId, setApplyId, shareId]);

  return (
    <>
      {exampled && (
        <Suspense>
          <Example />
        </Suspense>
      )}
    </>
  );
}
