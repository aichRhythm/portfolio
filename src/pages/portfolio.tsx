import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { OffTheClock } from "@/components/sections/off-the-clock";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/motion/marquee";

const TICKER = [
  "React",
  "React Native",
  "TypeScript",
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Redux Toolkit",
  "Azure",
  "Docker",
  "Jest",
];

/**
 * Velocity skew is applied to discrete blocks (cards, rows, the ticker) rather
 * than a page-level wrapper: a transform on an ancestor would turn
 * ScrollTrigger's pinned section into an absolutely-positioned element and
 * break the horizontal gallery.
 */
export default function Portfolio() {
  return (
    <>
      <Hero />
      <Marquee items={TICKER} />
      <Work />
      <Experience />
      <Skills />
      <OffTheClock />
      <Contact />
    </>
  );
}
