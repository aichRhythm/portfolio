import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { socials, type SocialIcon } from "@/content/socials";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { cn } from "@/lib/utils";

export const socialIcons: Record<SocialIcon, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const isExternal = (icon: SocialIcon) => icon !== "email";

/** Compact icon-only row used in the nav and footer. */
export function SocialIconRow({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socials.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.ariaLabel}
              {...(isExternal(social.icon)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "grid place-items-center rounded-[4px] border border-transparent text-ink-muted transition-colors hover:border-line hover:text-accent",
                size === "sm" ? "h-8 w-8" : "h-9 w-9",
              )}
            >
              <Icon className={size === "sm" ? "h-4 w-4" : "h-[17px] w-[17px]"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Full-width rows with handle + arrow, used in the contact section. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {socials.map((social) => {
        const Icon = socialIcons[social.icon];
        return (
          <li key={social.label} className="border-b border-line first:border-t">
            <MagneticButton
              href={social.href}
              external={isExternal(social.icon)}
              ariaLabel={social.ariaLabel}
              strength={0.14}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-center gap-4">
                <Icon className="h-5 w-5 shrink-0 text-ink-muted transition-colors group-hover:text-accent" />
                <span className="flex flex-col">
                  <span className="mono-label text-ink transition-colors group-hover:text-accent">
                    {social.label}
                  </span>
                  <span className="mt-1.5 font-mono text-xs normal-case tracking-normal text-ink-muted">
                    {social.handle}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </MagneticButton>
          </li>
        );
      })}
    </ul>
  );
}
