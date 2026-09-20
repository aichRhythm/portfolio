import { ArrowUp } from "lucide-react";
import { footerLinks, site } from "@/content/site";
import { SocialIconRow } from "@/components/contact/social-links";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { PerfNote } from "@/components/layout/perf-note";
import { WebVitals } from "@/components/layout/web-vitals";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="border-t border-line bg-carbon-raised">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-accent">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="display mt-5 block text-[clamp(1.5rem,4.2vw,2.75rem)] text-ink transition-colors duration-300 hover:text-accent"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-muted">
              {site.positioning}
            </p>
          </div>

          <div className="grid gap-10 md:col-span-5 sm:grid-cols-2">
            <nav aria-label="Footer">
              <p className="mono-label text-ink-muted">Index</p>
              <ul className="mt-5 space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mono-label text-ink-muted">Elsewhere</p>
              <div className="mt-5 space-y-3">
                <SocialIconRow className="-ml-2" />
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
                >
                  Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
          <PerfNote>
            No unused JS · ~147 kB gzip · semantic HTML · and it honors
            reduce-motion, for the calm viewers.
          </PerfNote>
          <WebVitals />
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-ink-muted">
            © 2026 {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ink-muted">
            Built with React + Lenis
          </p>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="mono-label inline-flex items-center gap-2 self-start text-ink-muted transition-colors hover:text-accent md:self-auto"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
