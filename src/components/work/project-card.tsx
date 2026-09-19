import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/content/projects";

function LinkIcon({ url }: { url: string }) {
  return url.includes("github") ? (
    <Github className="h-3.5 w-3.5" />
  ) : (
    <ArrowUpRight className="h-3.5 w-3.5" />
  );
}

export function ProjectCard({
  project,
  total,
}: {
  project: Project;
  total: number;
}) {
  return (
    <article
      className="work-card group relative overflow-hidden rounded-[6px] border border-line bg-surface"
      style={{ transformOrigin: "top center" }}
      aria-labelledby={`project-${project.slug}`}
    >
      {/* dim layer — animated by the stack as the next card slides over */}
      <div
        className="work-dim pointer-events-none absolute inset-0 z-20 bg-carbon opacity-0"
        aria-hidden
      />

      {/* hover accent hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(198,255,74,0.5), transparent)",
        }}
      />

      <div className="relative z-10 grid gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-10 md:p-10 lg:p-12">
        <div className="md:col-span-7">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">{project.index}</span>
            <span className="h-px w-7 bg-line-strong" aria-hidden />
            <span className="mono-label text-ink-muted">{project.context}</span>
          </div>

          <h3
            id={`project-${project.slug}`}
            className="display mt-5 text-[clamp(1.6rem,3.2vw,2.6rem)] text-ink"
          >
            {project.title}
          </h3>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
            {project.problem}
          </p>

          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="mono-label text-ink-muted">Role</dt>
              <dd className="mt-2 text-sm text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="mono-label text-ink-muted">Year</dt>
              <dd className="mt-2 text-sm text-ink">{project.year}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {project.stack.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <LinkIcon url={link.url} />
                {link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            ))}
            {project.note && (
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
                {project.note}
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-5 md:border-l md:border-line md:pl-10">
          <p className="mono-label text-ink-muted">Impact</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-[clamp(1.15rem,2.2vw,1.6rem)] leading-none text-accent">
                  {metric.value}
                </dt>
                <dd className="mt-2.5 text-xs leading-snug text-ink-muted">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ghost index, editorial watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-5 right-3 z-0 select-none font-mono text-[clamp(4rem,10vw,8rem)] leading-none"
        style={{ color: "rgba(237,237,237,0.03)" }}
      >
        {project.index}/{String(total).padStart(2, "0")}
      </span>
    </article>
  );
}
