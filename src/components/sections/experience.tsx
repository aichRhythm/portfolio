import * as Accordion from "@radix-ui/react-accordion";
import { FileText, Minus, Plus } from "lucide-react";
import { achievements, education, roles } from "@/content/experience";
import { site } from "@/content/site";
import { Section } from "@/components/motion/section";
import { Reveal } from "@/components/motion/reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="Where I've worked"
      description="Product engineering and consulting across banking, insurance and enterprise — with a metric attached to most of it."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <div className="space-y-8 lg:sticky lg:top-28">
            <Reveal y={18}>
              <div className="rounded-[6px] border border-line bg-surface p-5">
                <p className="mono-label text-ink-muted">Now</p>
                <p className="mt-4 text-sm leading-snug text-ink">
                  Software Engineer at Bain &amp; Company
                </p>
                <p className="mt-2 font-mono text-xs text-accent">
                  Oct 2025 — Present
                </p>
              </div>
            </Reveal>

            <Reveal y={18} delay={0.06}>
              <dl className="space-y-5">
                <div>
                  <dt className="mono-label text-ink-muted">Based in</dt>
                  <dd className="mt-2 text-sm text-ink">{site.location}</dd>
                </div>
                <div>
                  <dt className="mono-label text-ink-muted">Focus</dt>
                  <dd className="mt-2 text-sm text-ink">
                    Product frontends, fullstack delivery
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal y={18} delay={0.12}>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline inline-flex"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-9">
          <Accordion.Root
            type="single"
            collapsible
            defaultValue={`${roles[0].company}-${roles[0].title}`}
            className="border-t border-line"
          >
            {roles.map((role) => {
              const value = `${role.company}-${role.title}-${role.period}`;
              return (
                <Accordion.Item
                  key={value}
                  value={value}
                  className="border-b border-line"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-start justify-between gap-5 py-6 text-left">
                      <span className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                        <span className="flex items-center gap-3 md:w-[40%]">
                          <span className="display text-xl text-ink transition-colors duration-300 group-hover:text-accent md:text-2xl">
                            {role.title}
                          </span>
                          {role.current && (
                            <span
                              className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-accent"
                              aria-hidden
                            />
                          )}
                        </span>
                        <span className="text-sm text-ink-muted md:w-[28%]">
                          {role.company}
                        </span>
                        <span className="mono-label text-ink-muted md:flex-1 md:text-right">
                          {role.period}
                        </span>
                      </span>
                      <span className="shrink-0 pt-1 text-ink-muted transition-colors duration-300 group-data-[state=open]:text-accent">
                        <Plus
                          className="block h-4 w-4 group-data-[state=open]:hidden"
                          aria-hidden
                        />
                        <Minus
                          className="hidden h-4 w-4 group-data-[state=open]:block"
                          aria-hidden
                        />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="grid gap-7 pb-9 md:grid-cols-12">
                      <div className="md:col-span-4">
                        <p className="text-sm leading-relaxed text-ink-muted">
                          {role.summary}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {role.stack.map((item) => (
                            <span key={item} className="tag">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-3.5 md:col-span-7 md:col-start-6">
                        {role.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 bg-accent"
                              aria-hidden
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </div>
      </div>

      <Reveal y={20} className="mt-16 md:mt-20">
        <div className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-3">
          <div className="bg-surface p-6 md:p-7">
            <p className="mono-label text-accent">Education</p>
            <p className="mt-4 text-base leading-snug text-ink">
              {education.school}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{education.degree}</p>
            <p className="mt-3 font-mono text-xs text-ink-muted">
              {education.period} · {education.detail}
            </p>
          </div>

          {achievements.map((achievement) => (
            <div key={achievement.title} className="bg-surface p-6 md:p-7">
              <p className="mono-label text-accent">Achievement</p>
              <p className="mt-4 text-base leading-snug text-ink">
                {achievement.title}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{achievement.org}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
