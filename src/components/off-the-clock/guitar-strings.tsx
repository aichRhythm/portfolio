import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useHasFinePointer } from "@/hooks/use-media-query";
import { useScrollVelocity } from "@/hooks/use-scroll-velocity";
import {
  CHORDS,
  CHORD_IDS,
  fretFrequency,
  pluckNote,
  unlockAudio,
  type ChordId,
} from "@/lib/audio";

const WIDTH = 360;
const HEIGHT = 122;

const STRINGS = Array.from({ length: 6 }, (_, index) => ({
  y: 18 + index * 16.4,
  strokeWidth: 1.5 - index * 0.16,
  opacity: 0.72 - index * 0.1,
}));

/**
 * Six SVG strings that bow and ring when you hover them — and pick up a faint
 * hum from scroll velocity. Select a chord and strum to hear it via a
 * Karplus-Strong plucked-string synth. Decorative visuals stay out of the a11y
 * tree; the chord buttons are real, labelled controls.
 */
export function GuitarStrings({ className }: { className?: string }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const proxiesRef = useRef(STRINGS.map(() => ({ amp: 0 })));
  const pluckingRef = useRef<boolean[]>(STRINGS.map(() => false));
  const speedRef = useRef(0);
  const reduced = useReducedMotion();
  const fine = useHasFinePointer();
  const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  const isTouch = !fine || hasTouch;
  const { speed } = useScrollVelocity();
  speedRef.current = speed;

  const [chord, setChord] = useState<ChordId>("C");

  const draw = (index: number) => {
    const path = pathRefs.current[index];
    if (!path) return;
    const { y } = STRINGS[index];
    const amp = proxiesRef.current[index].amp;
    path.setAttribute(
      "d",
      `M0 ${y} Q ${WIDTH / 2} ${y + amp} ${WIDTH} ${y}`,
    );
  };

  useEffect(() => {
    STRINGS.forEach((_, index) => draw(index));
    if (reduced) return;

    let frame = 0;
    let current = 0;

    const tick = () => {
      const target = speedRef.current * 7;
      current += (target - current) * 0.07;

      STRINGS.forEach((_, index) => {
        if (pluckingRef.current[index]) return;
        const next = current * (0.55 + index * 0.1);
        if (Math.abs(proxiesRef.current[index].amp - next) > 0.05) {
          proxiesRef.current[index].amp = next;
          draw(index);
        }
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const pluckVisual = (index: number) => {
    if (reduced) return;
    const proxy = proxiesRef.current[index];
    const path = pathRefs.current[index];
    if (!path) return;

    pluckingRef.current[index] = true;
    gsap.killTweensOf(proxy);

    gsap
      .timeline({
        onComplete: () => {
          pluckingRef.current[index] = false;
          proxy.amp = 0;
          draw(index);
        },
      })
      .to(proxy, {
        amp: 15,
        duration: 0.08,
        ease: "power2.out",
        onUpdate: () => draw(index),
      })
      .to(proxy, {
        amp: 0,
        duration: 1.9,
        ease: "elastic.out(1, 0.16)",
        onUpdate: () => draw(index),
      });

    gsap.fromTo(
      path,
      { strokeOpacity: 1 },
      {
        strokeOpacity: STRINGS[index].opacity,
        duration: 1,
        ease: "power2.out",
      },
    );
  };

  // Hover a string: pluck that note (desktop strum).
  const pluck = (index: number) => {
    if (chord) {
      const fret = CHORDS[chord].frets[index];
      if (fret >= 0) pluckNote(fretFrequency(index, fret));
    }
    pluckVisual(index);
  };

  // Tap a chord: strum the whole thing (touch — can't drag across strings).
  const strumChord = (id: ChordId) => {
    CHORDS[id].frets.forEach((fret, index) => {
      if (fret < 0) return; // muted string — no note
      window.setTimeout(() => {
        pluckNote(fretFrequency(index, fret));
        pluckVisual(index);
      }, index * 30);
    });
  };

  const selectChord = (id: ChordId) => {
    unlockAudio();
    setChord(id);
    if (isTouch) strumChord(id);
  };

  return (
    <div
      className={cn("select-none", className)}
      onPointerDown={() => unlockAudio()}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-[122px] w-full max-w-[360px]"
        role="presentation"
        aria-hidden
      >
        {STRINGS.map((string, index) => (
          <g key={index}>
            <path
              ref={(element) => {
                pathRefs.current[index] = element;
              }}
              d={`M0 ${string.y} Q ${WIDTH / 2} ${string.y} ${WIDTH} ${string.y}`}
              className="stroke-amber"
              strokeWidth={string.strokeWidth}
              strokeOpacity={string.opacity}
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x={0}
              y={string.y - 7}
              width={WIDTH}
              height={14}
              fill="transparent"
              onPointerEnter={() => pluck(index)}
              data-cursor="hover"
            />
          </g>
        ))}
      </svg>

      <div className="mt-3 flex max-w-[360px] flex-wrap items-center gap-2">
        {CHORD_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => selectChord(id)}
            aria-pressed={chord === id}
            aria-label={CHORDS[id].name}
            className={cn(
              "rounded-[4px] border px-3 py-2 font-mono text-[0.6875rem] uppercase leading-none tracking-[0.14em] transition-colors",
              chord === id
                ? "border-amber text-amber"
                : "border-line text-ink-muted hover:border-amber hover:text-amber",
            )}
          >
            {CHORDS[id].name}
          </button>
        ))}
      </div>
    </div>
  );
}
