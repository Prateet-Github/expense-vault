import { useEffect, RefObject } from "react";

export default function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;
      const refsArray = Array.isArray(refs) ? refs : [refs];

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