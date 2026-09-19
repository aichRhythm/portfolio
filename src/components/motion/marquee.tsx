import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollVelocity } from "@/hooks/use-scroll-velocity";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Seconds for one full loop at rest. */
  duration?: number;
  reverse?: boolean;
};

/**
 * Kinetic ticker. Its speed follows scroll velocity, so the band accelerates
 * as you flick through the page and settles when you stop.
 */
export function Marquee({
  items,
  className,
  duration = 36,
  reverse = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { speed } = useScrollVelocity();
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    const tween = gsap.to(track, {
      xPercent: reverse ? 50 : -50,
      duration,
      ease: "none",
      repeat: -1,
    });

    let frame = 0;
    const follow = () => {
      tween.timeScale(0.6 + speedRef.current * 4.5);
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);

    return () => {
      cancelAnimationFrame(frame);
      tween.kill();
    };
  }, [reduced, duration, reverse]);

  const group = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="mono-label whitespace-nowrap text-ink-muted">
            {item}
          </span>
          <span className="mx-6 text-[0.5rem] text-accent-faint" aria-hidden>
            ◆
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "velocity-skew relative overflow-hidden border-y border-line py-5",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
