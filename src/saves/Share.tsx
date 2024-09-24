import { ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { storage } from "./firestore";
import { getShareId } from "./getShareId";
import { SaveContext } from "./SaveContext";
import "./Share.css";

export function Share() {
  const [uploadState, setUploadState] = useState(UploadState.Uploading);

  const shareId = getShareId();
  useEffect(() => {
    if (!shareId) {
      const newId = (
        Date.now() * 1000 +
        Math.floor(Math.random() * 1000)
      ).toString(36);
      history.pushState(null, "", `?shareId=${newId}`);
    }
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

    const cancellation = { cancelled: false };
    (async function () {
      const blob = new Blob([fileText], { type: "application/json" });
      const storageRef = ref(storage, `shares/${shareId}.json`);

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

  return (
    <div className="saves-Share">
      {shareId && <div className="url">{location.toString()}</div>}

      <div
        className={`loading ${
          uploadState === UploadState.Uploading ? "active" : ""
        }`}
      />
    </div>
  );
}

enum UploadState {
  Uploading = "uploading",
  Uploaded = "uploaded",
  Error = "error",
}
