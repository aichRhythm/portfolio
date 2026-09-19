import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
};

/**
 * Shared section shell: hairline top border, 12-column canvas, mono index +
 * eyebrow, and a fluid display headline.
 */
export function Section({
  id,
  index,
  label,
  title,
  description,
  className,
  headerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 border-t border-line py-24 md:py-40",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <header className={cn("mb-14 md:mb-24", headerClassName)}>
          <Reveal y={16}>
            <div className="flex items-center gap-3">
              <span className="mono-label text-accent">{index}</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="mono-label text-ink-muted">{label}</span>
            </div>
          </Reveal>

          {title && (
            <Reveal delay={0.06} className="mt-6">
              <h2 className="display text-[clamp(2rem,5.4vw,3.75rem)] text-ink">
                {title}
              </h2>
            </Reveal>
          )}

          {description && (
            <Reveal delay={0.12} className="mt-6 max-w-2xl">
              <p className="text-base leading-relaxed text-ink-muted md:text-lg">
                {description}
              </p>
            </Reveal>
          )}
        </header>

        {children}
      </div>
    </section>
  );
}
