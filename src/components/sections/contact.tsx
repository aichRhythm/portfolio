import { lazy } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/motion/section";
import { Reveal } from "@/components/motion/reveal";
import { SocialLinks } from "@/components/contact/social-links";
import { Deferred } from "@/components/layout/deferred";
import { useLocalTime } from "@/hooks/use-local-time";

const ContactForm = lazy(() =>
  import("@/components/contact/contact-form").then((m) => ({
    default: m.ContactForm,
  })),
);

export function Contact() {
  const time = useLocalTime(site.timeZone);

  return (
    <Section
      id="contact"
      index="05"
      label="Contact"
      title="Let's build something"
      description="Open to select work, and always happy to talk through a problem. The form is the fastest way in."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="velocity-skew lg:col-span-5">
          <Reveal y={18}>
            <SocialLinks />
          </Reveal>

          <Reveal y={18} delay={0.08} className="mt-10">
            <div className="rounded-[6px] border border-line bg-surface p-6">
              <p className="mono-label text-ink-muted">Currently in</p>
              <p className="mt-4 flex items-center gap-2.5 text-lg text-ink">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </p>
              <p className="mt-3 font-mono text-sm text-accent">
                {time || "—"}{" "}
                <span className="text-ink-muted">local time</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="velocity-skew lg:col-span-7">
          <Deferred rootMargin="400px 0px">
            <ContactForm />
          </Deferred>
        </div>
      </div>
    </Section>
  );
}
