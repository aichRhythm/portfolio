import { Section } from "@/components/motion/section";
import { WorkStack } from "@/components/work/work-stack";
import { projects } from "@/content/projects";

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
    </Section>
  );
}
