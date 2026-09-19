import { skillGroups } from "@/content/skills";
import { Section } from "@/components/motion/section";
import { Reveal } from "@/components/motion/reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Stack"
      title="Tools I reach for"
      description="A working list, not a logo wall — the things I've actually shipped with, grouped by where they sit in a build."
    >
      <div className="border-t border-line">
        {skillGroups.map((group, index) => (
          <div key={group.label} className="velocity-skew">
            <Reveal
              y={16}
              delay={Math.min(index * 0.03, 0.15)}
              className="group grid grid-cols-12 gap-x-4 gap-y-3 border-b border-line py-6 transition-colors duration-300 hover:bg-surface md:py-7"
            >
              <div className="col-span-12 flex items-baseline gap-3 md:col-span-4">
                <span className="mono-label text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg tracking-tight text-ink">
                  {group.label}
                </h3>
              </div>

              <ul className="col-span-12 flex flex-wrap items-center gap-x-3 gap-y-2 md:col-span-8">
                {group.items.map((item, itemIndex) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-sm text-ink-muted transition-colors duration-300 group-hover:text-ink">
                      {item}
                    </span>
                    {itemIndex < group.items.length - 1 && (
                      <span className="text-ink-line" aria-hidden>
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
