import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedText } from "@/components/motion/animated-text";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";
import { SocialIconRow } from "@/components/contact/social-links";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="hero-grid hero-grid-breath absolute inset-0" />
        <div
          className="absolute inset-x-0 bottom-0 h-3/5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.7) 55%, #050505 100%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <Reveal y={14} duration={0.7}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              <span className="mono-label text-ink">{site.role}</span>
            </span>
            <span
              className="hidden h-px w-10 bg-line-strong sm:block"
              aria-hidden
            />
            <span className="mono-label text-ink-muted">
              {site.location} · IST
            </span>
            <span
              className="hidden h-px w-10 bg-line-strong sm:block"
              aria-hidden
            />
            <span className="mono-label text-ink-muted">
              {site.availability}
            </span>
          </div>
        </Reveal>

        <AnimatedText
          as="h1"
          text={"Rhythm\nAich"}
          mode="load"
          delay={0.12}
          stagger={0.11}
          className="display mt-8 text-[clamp(3rem,13vw,10.5rem)] text-ink md:mt-10"
        />

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <Reveal delay={0.55} className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.04em] text-accent">
              {site.credential}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              {site.positioning}
            </p>
          </Reveal>

          <Reveal
            delay={0.68}
            y={16}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton
              onClick={() => scrollTo("#work")}
              className="btn btn-primary"
            >
              View work
              <ArrowDown className="h-3.5 w-3.5" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("#contact")}
              className="btn btn-outline"
            >
              Get in touch
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-6 px-6 md:px-10">
        <a
          href="#work"
          onClick={(event) => {
            event.preventDefault();
            scrollTo("#work");
          }}
          className="group inline-flex items-center gap-3 text-ink-muted transition-colors hover:text-ink"
        >
          <span className="mono-label">Scroll</span>
          <span className="scroll-cue" aria-hidden />
        </a>
        <p className="mono-label hidden text-ink-muted md:block">
          Portfolio — 2026
        </p>
        <SocialIconRow size="sm" />
      </div>
    </section>
  );
}
