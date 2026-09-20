import { useEffect, useState } from "react";
import { onCLS, onINP, onLCP } from "web-vitals";
import { cn } from "@/lib/utils";

function format(name: string, value: number): string {
  if (name === "CLS") return value.toFixed(2);
  if (name === "LCP") return `${(value / 1000).toFixed(1)}s`;
  return `${Math.round(value)}ms`;
}

/**
 * Live Core Web Vitals readout — reports the current visitor's real LCP, CLS
 * and INP as they are measured, with no fallback when unsupported.
 */
export function WebVitals({ className }: { className?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const report = (metric: { name: string; value: number }) => {
      setValues((prev) => ({
        ...prev,
        [metric.name]: format(metric.name, metric.value),
      }));
    };
    onCLS(report);
    onINP(report);
    onLCP(report);
  }, []);

  const items = [
    ["LCP", values.LCP],
    ["CLS", values.CLS],
    ["INP", values.INP],
  ] as const;

  return (
    <p
      className={cn(
        "font-mono text-[0.6875rem] tracking-[0.06em] text-ink-muted",
        className,
      )}
    >
      {items.map(([label, value], index) => (
        <span key={label}>
          {index > 0 && <span className="mx-2 text-ink-line">·</span>}
          {label} <span className="text-ink">{value ?? "…"}</span>
        </span>
      ))}
    </p>
  );
}
