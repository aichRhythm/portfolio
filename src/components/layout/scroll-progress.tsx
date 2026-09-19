import { useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

/** 2px lime progress line pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { lenis } = useSmoothScroll();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const apply = (scroll: number, limit: number) => {
      const progress = limit > 0 ? scroll / limit : 0;
      const clamped = Math.max(0, Math.min(1, progress));
      bar.style.transform = `scaleX(${clamped})`;
    };

    if (lenis) {
      const onScroll = (event: { scroll: number; limit: number }) =>
        apply(event.scroll, event.limit);
      lenis.on("scroll", onScroll);
      apply(lenis.scroll as number, lenis.limit as number);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    const onNativeScroll = () => {
      const limit =
        document.documentElement.scrollHeight - window.innerHeight;
      apply(window.scrollY, limit);
    };
    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onNativeScroll);
    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", onNativeScroll);
    };
  }, [lenis]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
