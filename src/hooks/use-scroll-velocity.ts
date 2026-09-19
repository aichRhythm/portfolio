import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type ScrollVelocity = {
  /** Smoothed velocity, clamped to ±1. */
  velocity: number;
  /** Absolute value of `velocity`, 0 → 1. */
  speed: number;
};

const IDLE: ScrollVelocity = { velocity: 0, speed: 0 };

/**
 * Reads the clamped velocity from the smooth-scroll provider, smooths it once
 * more and exposes it as React state for motion that needs JS values.
 */
export function useScrollVelocity(): ScrollVelocity {
  const { velocityRef } = useSmoothScroll();
  const reduced = useReducedMotion();
  const [state, setState] = useState<ScrollVelocity>(IDLE);

  useEffect(() => {
    if (reduced) {
      setState(IDLE);
      return;
    }

    let frame = 0;
    let smoothed = 0;
    let last = 0;

    const tick = () => {
      const raw = Math.max(-1, Math.min(1, velocityRef.current ?? 0));
      smoothed += (raw - smoothed) * 0.18;
      if (Math.abs(smoothed) < 0.002) smoothed = 0;

      if (Math.abs(smoothed - last) > 0.005) {
        last = smoothed;
        setState({ velocity: smoothed, speed: Math.abs(smoothed) });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, velocityRef]);

  return state;
}
