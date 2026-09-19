import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { SocialIconRow } from "@/components/contact/social-links";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

export function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-carbon-glass backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-6 md:h-20 md:px-10"
        >
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(0);
            }}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-[3px] border border-line text-[0.7rem] font-mono font-semibold tracking-[0.08em] text-ink transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
              {site.initials}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
            <span className="hidden text-sm tracking-tight text-ink sm:block">
              {site.name}
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    go(link.href);
                  }}
                  aria-current={active === link.href ? "true" : undefined}
                  className={cn(
                    "mono-label relative py-2 transition-colors duration-300",
                    active === link.href
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300",
                      active === link.href ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <SocialIconRow size="sm" className="hidden md:flex" />
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label hidden items-center gap-2 rounded-[4px] border border-line-strong px-3.5 py-2.5 text-ink transition-colors duration-300 hover:border-accent hover:text-accent lg:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-[4px] border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} onNavigate={go} />
    </>
  );
}
