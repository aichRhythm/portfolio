import { Zap } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small inline "performance" annotation — a lime lightning marker + a quiet
 * mono caption. Scattered through the site to point at where an optimization
 * actually happens.
 */
export function PerfNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-ink-muted",
        className,
      )}
    >
      <Zap className="mt-0.5 h-3 w-3 shrink-0 text-accent" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
