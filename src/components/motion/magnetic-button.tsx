import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** 0 → no pull, 0.4 → strong pull. */
  strength?: number;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

/**
 * Cursor-attracted button. Desktop pointers only — on touch and under reduced
 * motion it renders a plain, static button.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.26,
  href,
  onClick,
  type = "button",
  disabled,
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const outerRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const fine = useHasFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useLayoutEffect(() => {
    if (!enabled) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const xTo = gsap.quickTo(outer, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(outer, "y", { duration: 0.6, ease: "power3.out" });
    const ixTo = gsap.quickTo(inner, "x", { duration: 0.8, ease: "power3.out" });
    const iyTo = gsap.quickTo(inner, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo(dx * strength * 0.4);
      iyTo(dy * strength * 0.4);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      ixTo(0);
      iyTo(0);
    };

    outer.addEventListener("mousemove", onMove);
    outer.addEventListener("mouseleave", onLeave);
    return () => {
      outer.removeEventListener("mousemove", onMove);
      outer.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([outer, inner]);
      gsap.set([outer, inner], { clearProps: "transform" });
    };
  }, [enabled, strength]);

  const content = (
    <span ref={innerRef} className="relative inline-flex items-center gap-2.5">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={outerRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={outerRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
    >
      {content}
    </button>
  );
}
