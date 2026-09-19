import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";

/**
 * Custom cursor: a fast dot with a trailing ring, blended with
 * mix-blend-mode: difference. Desktop pointers only — never on touch, never
 * under reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    let active = false;

    const show = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      gsap.to([dot, ring], { opacity: next ? 1 : 0, duration: 0.25 });
    };

    const setActive = (next: boolean) => {
      if (next === active) return;
      active = next;
      gsap.to(ring, { scale: next ? 1.65 : 1, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: next ? 0.35 : 1, duration: 0.3, ease: "power3.out" });
      ring.dataset.active = next ? "true" : "false";
    };

    const onMove = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
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
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-active="false" aria-hidden />
    </>
  );
}
