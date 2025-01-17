import { useEffect, useState } from "react";

export function useCount() {
  const storageKey = "guides-useCount";

  const [count, setCount] = useState(() => {
    const text = localStorage.getItem(storageKey);
    if (!text) {
      return 0;
    }

    const value = parseInt(text);
    if (isNaN(value)) {
      return 0;
    }

    return value;
  });

  useEffect(() => localStorage.setItem(storageKey, count.toString()), [count]);

  return { count, setCount };
}
