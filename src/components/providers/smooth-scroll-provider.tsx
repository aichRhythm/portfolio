import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export type LenisScrollToOptions = {
  offset?: number;
  immediate?: boolean;
  lock?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
  force?: boolean;
};

type SmoothScrollValue = {
  lenis: Lenis | null;
  /** Clamped ±1 normalised scroll velocity, updated every frame. */
  velocityRef: MutableRefObject<number>;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: LenisScrollToOptions,
  ) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollValue | null>(null);

export function useSmoothScroll(): SmoothScrollValue {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>");
  }
  return context;
}

const NAV_OFFSET = 72;
/** Raw lenis velocity (px/frame) that maps to a full ±1. */
const VELOCITY_SCALE = 30;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    if (reduced) {
      velocityRef.current = 0;
      return;
    }

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenisRef.current = instance;
    setLenis(instance);

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    let smoothed = 0;
    let lastScroll = instance.scroll as number;

    /* One ticker drives lenis, the velocity signal and the CSS variables that
       power skew, grid breath and the waveform — no React renders involved. */
    const tick = (time: number) => {
      instance.raf(time * 1000);

      const scroll = instance.scroll as number;
      const normalised = Math.max(
        -1,
        Math.min(1, (scroll - lastScroll) / VELOCITY_SCALE),
      );
      lastScroll = scroll;
      velocityRef.current = normalised;

      smoothed += (normalised - smoothed) * 0.16;
      if (Math.abs(smoothed) < 0.001) smoothed = 0;

      const root = document.documentElement;
      root.style.setProperty("--velocity", smoothed.toFixed(4));
      root.style.setProperty(
        "--velocity-abs",
        Math.abs(smoothed).toFixed(4),
      );
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      velocityRef.current = 0;
      const root = document.documentElement;
      root.style.setProperty("--velocity", "0");
      root.style.setProperty("--velocity-abs", "0");
    };
  }, [reduced]);

  const value = useMemo<SmoothScrollValue>(() => {
    const scrollTo: SmoothScrollValue["scrollTo"] = (target, options) => {
      const instance = lenisRef.current;

      if (instance) {
        instance.scrollTo(target, {
          offset: -NAV_OFFSET,
          duration: 1.4,
          ...options,
        });
        return;
      }

      /* reduced motion / no smooth scroll — jump, don't glide */
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
        return;
      }
      const element =
        typeof target === "string"
          ? document.querySelector<HTMLElement>(target)
          : target;
      if (!element) return;
      const top =
        element.getBoundingClientRect().top +
        window.scrollY +
        (options?.offset ?? -NAV_OFFSET);
      window.scrollTo({ top, behavior: "auto" });
    };

    return {
      lenis,
      velocityRef,
      scrollTo,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    };
  }, [lenis]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
