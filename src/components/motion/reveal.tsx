import {
  createElement,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
};

/**
 * Scroll-triggered fade + rise. The hidden state is applied inside a layout
 * effect, so it can never strand content in an invisible state — and reduced
 * motion skips the effect entirely, rendering the final state immediately.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
      gsap.set(element, { clearProps: "opacity,visibility,transform" });
    };
  }, [reduced, delay, y, duration, start]);

  return createElement(
    as,
    { ref, className } as Record<string, unknown>,
    children,
  );
}
