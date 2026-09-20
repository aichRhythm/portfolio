import { useRef } from "react";
import {
  ArrowUpRight,
  Code2,
  ImageIcon,
  MapPin,
  Maximize2,
  Music4,
  Plane,
} from "lucide-react";
import type { OffTheClockEntry, OffTheClockType } from "@/content/off-the-clock";
import { mediaUrl } from "@/lib/media";

const TYPE_META: Record<
  OffTheClockType,
  { label: string; Icon: typeof Music4 }
> = {
  music: { label: "Music", Icon: Music4 },
  travel: { label: "Travel", Icon: Plane },
  snippet: { label: "Snippet", Icon: Code2 },
};

function Placeholder({ index }: { index: number }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "linear-gradient(152deg, #0a0a0a 0%, #14110d 52%, rgba(255,184,107,0.20) 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 31px, rgba(237,237,237,0.4) 31px 32px)",
          opacity: 0.08,
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-[3.25rem] leading-none text-amber-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
        <ImageIcon className="h-3 w-3" />
        Media coming soon
      </span>
    </div>
  );
}

export function MediaCard({
  entry,
  index,
  onOpen,
}: {
  entry: OffTheClockEntry;
  index: number;
  onOpen?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const meta = entry.type ? TYPE_META[entry.type] : null;
  const media = entry.media;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-surface-2">
      <div className="group/media relative block aspect-[4/5] w-full overflow-hidden bg-carbon-raised lg:aspect-[4/3]">
        {media?.type === "video" ? (
          <video
            ref={videoRef}
            src={mediaUrl(media.url)}
            poster={mediaUrl(media.poster)}
            preload="none"
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            onMouseEnter={() => {
              void videoRef.current?.play().catch(() => undefined);
            }}
            onMouseLeave={() => videoRef.current?.pause()}
          />
        ) : media?.type === "image" ? (
          <img
            src={mediaUrl(media.url)}
            alt={entry.title}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <Placeholder index={index} />
        )}

        {meta && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[3px] border border-amber-faint bg-carbon-glass px-2.5 py-1 backdrop-blur-sm">
            <meta.Icon className="h-3.5 w-3.5 text-amber" />
            <span className="font-mono text-[0.625rem] uppercase leading-none tracking-[0.14em] text-amber">
              {meta.label}
            </span>
          </span>
        )}

        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${entry.title}`}
          className="media-expand absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-[4px] border border-line bg-carbon-glass text-ink-muted opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:text-amber group-hover/media:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug text-ink">{entry.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {entry.caption}
        </p>

        {(entry.location || entry.date || entry.links?.length) && (
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
            {entry.location && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                <MapPin className="h-3 w-3 text-amber-faint" />
                {entry.location}
              </span>
            )}
            {entry.date && (
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                {entry.date}
              </span>
            )}
            {entry.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-amber"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
