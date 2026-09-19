import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { SocialIconRow } from "@/components/contact/social-links";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
};

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    stop();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      start();
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, stop, start]);

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-carbon lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-6 md:h-20">
            <span className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[3px] border border-line text-[0.7rem] font-mono font-semibold tracking-[0.08em] text-ink">
                {site.initials}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-sm tracking-tight text-ink">
                {site.name}
              </span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-[4px] border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <motion.nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center px-6 pb-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduced ? 0 : 0.07,
                  delayChildren: reduced ? 0 : 0.1,
                },
              },
            }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="overflow-hidden border-b border-line py-4"
                variants={{
                  hidden: {
                    y: reduced ? "0%" : "108%",
                    opacity: reduced ? 1 : 0,
                  },
                  visible: { y: "0%", opacity: 1 },
                }}
                transition={transition}
              >
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.href);
                  }}
                  className="flex items-baseline gap-4"
                >
                  <span className="mono-label text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-[clamp(2rem,9vw,3rem)] text-ink">
                    {link.label}
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="flex shrink-0 flex-col gap-6 px-6 pb-10"
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.45, duration: 0.4 }}
          >
            <p className="eyebrow">
              {site.role} · {site.location}
            </p>
            <div className="flex items-center justify-between gap-4">
              <SocialIconRow />
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label inline-flex items-center gap-2 rounded-[4px] border border-line-strong px-3.5 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
