import { ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useMemo, useState } from "react";
import { exampleId } from "./exampleId";
import { findUrlValue } from "./findUrlValue";
import { storage } from "./firestore";
import { getFilePath, prefixRaise } from "./getFilePath";
import { SaveContext } from "./SaveContext";
import "./Share.css";

export const shareKey = "shareId";

export function Share() {
  const [uploadState, setUploadState] = useState(UploadState.Uploading);

  const [shareId, setShareId] = useState<string>();
  useEffect(() => {
    if (shareId) {
      return;
    }

    const urlId = findUrlValue(shareKey);
    if (urlId && urlId !== exampleId) {
      try {
        getFilePath(urlId);

        setShareId(urlId);
        return;
      } catch {
        console.error(`invalid shareId ${urlId}`);
      }
    }

    const prefix = Math.floor(Math.random() * 1000);
    const time = Date.now();

    const idValue = prefix * prefixRaise + time;
    const idText = idValue.toString(36);

    history.pushState(null, "", `?shareId=${idText}`);

    setShareId(idText);
  }, [shareId]);

  const { file } = useContext(SaveContext);
  useEffect(() => {
    if (!shareId) {
      return;
    }

    if (!file) {
      return;
    }

    setUploadState(UploadState.Uploading);

    const fileText = JSON.stringify(file);
    const filePath = getFilePath(shareId);

    const cancellation = { cancelled: false };
    (async function () {
      const blob = new Blob([fileText], { type: "application/json" });
      const storageRef = ref(storage, filePath);

      const success = await (async function () {
        try {
          await uploadBytes(storageRef, blob);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      })();

      if (cancellation.cancelled) {
        return;
      }

      setUploadState(success ? UploadState.Uploaded : UploadState.Error);
    })();
    return () => {
      cancellation.cancelled = true;
    };
  }, [file, shareId]);

  const shareUrl = useMemo(
    () =>
      `${location.protocol}//${location.host}${location.pathname}?shareId=${shareId}`,
    [shareId]
  );

  return (
    <div className="saves-Share">
      <div
        className={`loading ${
          uploadState === UploadState.Uploading ? "active" : ""
        }`}
      />

      <div
        className={`url ${
          uploadState === UploadState.Uploaded ? "active" : ""
        }`}
        onClick={async () => {
          try {
            navigator.clipboard.writeText(shareUrl);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {shareUrl}
      </div>

      <div
        className={`copy ${
          uploadState === UploadState.Uploaded ? "active" : ""
        }`}
        onClick={async () => {
          try {
            navigator.clipboard.writeText(shareUrl);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </div>
  );
}

enum UploadState {
  Uploading = "uploading",
  Uploaded = "uploaded",
  Error = "error",
}
