import { Section } from "@/components/motion/section";
import { WorkStack } from "@/components/work/work-stack";
import { projects } from "@/content/projects";
import { PerfNote } from "@/components/layout/perf-note";

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      label="Work"
      title="Selected work"
      description="A browser extension with 10,000+ users, a companion app on both stores, this site, and an enterprise training platform. Different scales — same instinct: get the interface out of the way."
    >
      <WorkStack projects={projects} />
      <PerfNote className="mt-8">
        Cards pin on the GPU, so the browser never has to do layout math
        mid-scroll. It's earned a break.
      </PerfNote>
    </Section>
  );
}
