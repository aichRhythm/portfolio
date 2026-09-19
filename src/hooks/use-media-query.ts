import { useEffect, useState } from "react";

function getInitial(query: string): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => getInitial(query));

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Desktop-ish breakpoint used to gate pointer-based enhancements. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}

/** True only for real pointers — no custom cursor or magnetic motion on touch. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
