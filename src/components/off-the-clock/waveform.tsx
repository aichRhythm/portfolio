import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollVelocity } from "@/hooks/use-scroll-velocity";

const BAR_COUNT = 48;

/**
 * Ambient waveform. Bar heights follow scroll velocity, so the strip rises
 * when the page is moving fast and settles into a slow idle pulse.
 */
export function Waveform({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0);
  const reduced = useReducedMotion();
  const { speed } = useScrollVelocity();
  speedRef.current = speed;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bars = Array.from(container.children) as HTMLElement[];
    let frame = 0;
    let time = 0;

    const render = () => {
      time += 0.05;
      const amplitude = reduced ? 0.36 : 0.2 + speedRef.current * 0.8;

      bars.forEach((bar, index) => {
        const position = index / (bars.length - 1);
        const envelope = Math.pow(Math.sin(Math.PI * position), 0.55);
        const wave = 0.55 + 0.45 * Math.sin(time * 1.7 + index * 0.42);
        const height = Math.max(
          0.06,
          Math.min(1, amplitude * envelope * wave + 0.06),
        );
        bar.style.transform = `scaleY(${height.toFixed(3)})`;
      });

      if (!reduced) frame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("flex h-10 items-center justify-between", className)}
    >
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <span
          key={index}
          className="h-full w-[2px] origin-center bg-amber-faint"
        />
      ))}
    </div>
  );
}
