import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";

/**
 * Custom cursor: a single blended circle (mix-blend-mode: difference) that
 * inverts whatever is beneath it, so text it passes over changes color.
 * Desktop pointers only — never on touch, never under reduced motion.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set(cursor, { opacity: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });

    let visible = false;
    let active = false;

    const show = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      gsap.to(cursor, { opacity: next ? 1 : 0, duration: 0.25 });
    };

    const setActive = (next: boolean) => {
      if (next === active) return;
      active = next;
      gsap.to(cursor, { scale: next ? 1.2 : 1, duration: 0.3, ease: "power3.out" });
    };

    const onMove = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      show(true);

      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
        ),
      );
      setActive(interactive);
    };

    const onLeave = () => show(false);
    const onEnter = () => show(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.killTweensOf(cursor);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={cursorRef} className="cursor" aria-hidden />;
}
