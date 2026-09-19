import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects, type Project } from "@/content/projects";
import { ProjectCard } from "@/components/work/project-card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsDesktop } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky-stack: each card pins to the top of the viewport and the next one
 * slides over it. The outgoing card scales to 0.94 and dims as it's covered.
 * On mobile (and under reduced motion) it falls back to a plain vertical flow
 * where every card is fully visible.
 */
export function WorkStack({
  projects = allProjects,
}: {
  projects?: Project[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const stacked = isDesktop && !reduced;

  useLayoutEffect(() => {
    if (!stacked || !rootRef.current) return;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".work-item");

      items.forEach((item, index) => {
        const next = items[index + 1];
        if (!next) return;

        const card = item.querySelector<HTMLElement>(".work-card");
        const dim = item.querySelector<HTMLElement>(".work-dim");
        if (!card) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });

        timeline.to(card, { scale: 0.94, ease: "none" }, 0);
        if (dim) timeline.to(dim, { opacity: 0.55, ease: "none" }, 0);
      });
    }, rootRef);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [stacked, projects]);

  return (
    <div
      ref={rootRef}
      className={stacked ? "relative" : "flex flex-col gap-8 md:gap-10"}
    >
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className={
            stacked
              ? "work-item sticky top-0 flex h-[100svh] items-center pb-10 pt-24 md:pb-14"
              : ""
          }
          style={stacked ? { zIndex: index + 1 } : undefined}
        >
          <div className="velocity-skew w-full">
            <ProjectCard project={project} total={projects.length} />
          </div>
        </div>
      ))}
    </div>
  );
}
