import {
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { offTheClock, type OffTheClockEntry } from "@/content/off-the-clock";
import { MediaCard } from "@/components/off-the-clock/media-card";
import { Lightbox } from "@/components/off-the-clock/lightbox";
import { Waveform } from "@/components/off-the-clock/waveform";
import { GuitarStrings } from "@/components/off-the-clock/guitar-strings";
import { Reveal } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { PerfNote } from "@/components/layout/perf-note";

/** Auto-advance drift speed in px/s. */
const SPEED = 80;

/**
 * One horizontal gallery for everything off the clock. The track drifts
 * sideways on its own (slow, ping-pong), pauses on hover, and can be dragged
 * to explore — so the page scrolls straight down past it. Under reduced motion
 * (or on touch) it becomes a plain swipe strip.
 */
export function OffTheClock() {
  const reduced = useReducedMotion();
  const fine = useHasFinePointer();
  const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  const isTouch = !fine || hasTouch;
  const autoScroll = !reduced && !isTouch;

  const [active, setActive] = useState<OffTheClockEntry | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const directionRef = useRef(-1);
  const hoveredRef = useRef(false);
  const pressedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, pos: 0 });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !autoScroll) return;

    const distance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + 80);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!draggingRef.current && !hoveredRef.current) {
        let x = xRef.current + directionRef.current * SPEED * dt;
        if (x <= -distance()) {
          x = -distance();
          directionRef.current = 1;
        } else if (x >= 0) {
          x = 0;
          directionRef.current = -1;
        }
        xRef.current = x;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [autoScroll]);

  const onPointerEnter = () => {
    hoveredRef.current = true;
  };
  const onPointerLeave = () => {
    hoveredRef.current = false;
    pressedRef.current = false;
    draggingRef.current = false;
  };
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!autoScroll) return;
    pressedRef.current = true;
    draggingRef.current = false;
    dragStartRef.current = { x: event.clientX, pos: xRef.current };
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!autoScroll || !pressedRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    const delta = event.clientX - dragStartRef.current.x;
    if (!draggingRef.current && Math.abs(delta) < 5) return; // let taps through
    draggingRef.current = true;
    const x = Math.max(
      -distance,
      Math.min(0, dragStartRef.current.pos + delta),
    );
    xRef.current = x;
    if (x <= -distance) directionRef.current = 1;
    else if (x >= 0) directionRef.current = -1;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };
  const onPointerUp = () => {
    pressedRef.current = false;
    draggingRef.current = false;
  };

  return (
    <section
      id="off-the-clock"
      className="relative scroll-mt-24 border-t border-line"
      aria-labelledby="off-the-clock-title"
    >
      <div className="py-24 md:py-32">
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

        <div
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "mt-12 select-none cursor-grab active:cursor-grabbing md:mt-14",
            autoScroll && "edge-fade overflow-hidden",
          )}
        >
          <div
            ref={trackRef}
            {...(autoScroll ? {} : { "data-lenis-prevent": "true" })}
            className={cn(
              "flex gap-5 px-6 md:gap-6 md:px-10",
              autoScroll
                ? "w-max will-change-transform"
                : "snap-x snap-mandatory overflow-x-auto pb-4 scrollbar-none",
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
            <p className="mono-label shrink-0 text-ink-muted">
              {autoScroll ? "Drag to explore" : "Swipe"}
            </p>
          </div>
        </div>
      </div>

      {active && (
        <Lightbox entry={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
