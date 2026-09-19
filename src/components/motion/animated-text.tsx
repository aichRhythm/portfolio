import { createElement, useLayoutEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextProps = {
  /** Use `\n` to break the string into individually masked lines. */
  text: string;
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  mode?: "load" | "scroll";
  start?: string;
};

export function AnimatedText({
  text,
  as = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  duration = 1.05,
  mode = "load",
  start = "top 85%",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const lines = text.split("\n");

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const inner = root.querySelectorAll<HTMLElement>("[data-line-inner]");
    if (!inner.length) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: "expo.out",
          ...(mode === "scroll"
            ? {
                scrollTrigger: {
                  trigger: root,
                  start,
                  toggleActions: "play none none none",
                },
              }
            : {}),
        },
      );
    }, root);

    return () => context.revert();
  }, [reduced, text, delay, stagger, duration, mode, start]);

  const children = lines.map((line, index) => (
    <span
      key={index}
      className={cn("block overflow-hidden", lineClassName)}
    >
      <span data-line-inner className="block will-change-transform">
        {line || "\u00A0"}
      </span>
    </span>
  ));

  return createElement(
    as,
    { ref, className } as Record<string, unknown>,
    children,
  );
}
