import { useEffect, RefObject } from "react";

export default function useClickOutside(
  // Accept one ref OR an array of refs
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;
      const refsArray = Array.isArray(refs) ? refs : [refs];

      // If the click is inside ANY of the provided refs, do nothing
      const isInside = refsArray.some(
        (ref) => ref.current && ref.current.contains(target)
      );

      if (isInside) return;

      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler]);
}