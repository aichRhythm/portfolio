import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { offTheClock, type OffTheClockEntry } from "@/content/off-the-clock";
import { MediaCard } from "@/components/off-the-clock/media-card";
import { Lightbox } from "@/components/off-the-clock/lightbox";
import { Waveform } from "@/components/off-the-clock/waveform";
import { GuitarStrings } from "@/components/off-the-clock/guitar-strings";
import { Reveal } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PerfNote } from "@/components/layout/perf-note";

gsap.registerPlugin(ScrollTrigger);

/**
 * One horizontal gallery for everything off the clock. On large screens with
 * vertical room the section pins and the track is scrubbed sideways, with each
 * media card revealing through scale + clip-path as it enters. Everywhere else
 * it degrades to a native, snap-scrolling swipe strip.
 */
export function OffTheClock() {
  const reduced = useReducedMotion();
  const hasRoom = useMediaQuery(
    "(min-width: 1024px) and (min-height: 640px)",
  );
  const pinned = hasRoom && !reduced;

  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState<OffTheClockEntry | null>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector<HTMLElement>(".gallery-card");
    const step = (first ? first.offsetWidth : 340) + 24;
    if (pinned) {
      // pinned mode maps page scroll 1:1 to horizontal travel
      scrollTo(window.scrollY + dir * step, { offset: 0, duration: 1.1 });
    } else {
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pinned || !pin || !track) return;

    const context = gsap.context(() => {
      const distance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 80);

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.97, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 96%",
              end: "left 58%",
              scrub: true,
            },
          },
        );
      });
    }, pinRef);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [pinned]);

  return (
    <section
      id="off-the-clock"
      className="relative scroll-mt-24 border-t border-line"
      aria-labelledby="off-the-clock-title"
    >
      <div
        ref={pinRef}
        className={cn(
          "relative overflow-hidden",
          pinned
            ? "flex h-[100svh] flex-col justify-between py-14"
            : "py-24 md:py-32",
        )}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <Reveal y={16}>
            <div className="flex items-center gap-3">
              <span className="mono-label text-amber">04</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="mono-label text-ink-muted">Off the Clock</span>
            </div>
          </Reveal>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <Reveal className="max-w-xl">
              <h2
                id="off-the-clock-title"
                className="display text-[clamp(2rem,5.4vw,3.75rem)] text-ink"
              >
                Away from the keyboard
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Music, travel, and small snippets of code. None of it ships to
                production — that's rather the point.
              </p>
              <PerfNote className="mt-4">
                Media is lazy — the good kind, where it only loads when you
                hover.
              </PerfNote>
            </Reveal>

            <div className="hidden shrink-0 lg:block">
              <GuitarStrings />
              <p className="mono-label mt-3 text-right text-ink-muted">
                Tap a string to play
              </p>
            </div>
          </div>
        </div>

        <div className={pinned ? "" : "mt-12 md:mt-14"}>
          <div
            ref={trackRef}
            {...(pinned ? {} : { "data-lenis-prevent": "true" })}
            className={cn(
              "flex gap-5 md:gap-6",
              pinned
                ? "w-max px-6 will-change-transform md:px-10"
                : "snap-x snap-mandatory overflow-x-auto px-6 pb-4 scrollbar-none md:px-10",
            )}
          >
            {offTheClock.map((entry, index) => (
              <div
                key={`${entry.title}-${index}`}
                className="velocity-skew w-[78vw] shrink-0 snap-center sm:w-[320px] lg:w-[340px]"
              >
                <div className="gallery-card h-full">
                  <MediaCard
                    entry={entry}
                    index={index}
                    onOpen={() => setActive(entry)}
                  />
                </div>
              </div>
            ))}
            {pinned && <div className="w-[8vw] shrink-0" aria-hidden />}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <div className="lg:hidden">
            <GuitarStrings className="mb-6" />
          </div>
          <div className="flex items-end justify-between gap-8 border-t border-line pt-5">
            <div className="min-w-0 flex-1">
              <Waveform />
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <p className="mono-label text-ink-muted">
                {pinned ? "Scroll" : "Swipe"}
              </p>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous media"
                className="grid h-9 w-9 place-items-center rounded-[4px] border border-line text-ink-muted transition-colors hover:border-amber hover:text-amber"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next media"
                className="grid h-9 w-9 place-items-center rounded-[4px] border border-line text-ink-muted transition-colors hover:border-amber hover:text-amber"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {active && (
        <Lightbox entry={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
