import { useEffect } from "react";
import { X } from "lucide-react";
import type { OffTheClockEntry } from "@/content/off-the-clock";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { mediaUrl } from "@/lib/media";

export function Lightbox({
  entry,
  onClose,
}: {
  entry: OffTheClockEntry;
  onClose: () => void;
}) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    stop();
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      start();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [stop, start, onClose]);

  const media = entry.media;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={entry.title}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-[4px] border border-line text-ink-muted transition-colors hover:border-accent hover:text-ink"
      >
        <X className="h-5 w-5" />
      </button>

      <figure
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full max-w-5xl flex-col items-center gap-5"
      >
        {media?.type === "video" ? (
          <video
            src={mediaUrl(media.url)}
            poster={mediaUrl(media.poster)}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[74vh] w-auto max-w-full rounded-[6px] border border-line object-contain"
          />
        ) : media?.type === "image" ? (
          <img
            src={mediaUrl(media.url)}
            alt={entry.title}
            className="max-h-[74vh] w-auto max-w-full rounded-[6px] border border-line object-contain"
          />
        ) : (
          <div className="grid h-[50vh] w-[80vw] max-w-2xl place-items-center rounded-[6px] border border-line bg-surface-2">
            <span className="mono-label text-ink-muted">No media yet</span>
          </div>
        )}

        <figcaption className="max-w-2xl text-center">
          <h3 className="text-lg text-ink">{entry.title}</h3>
          {entry.caption && (
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {entry.caption}
            </p>
          )}
          {(entry.location || entry.date) && (
            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-amber">
              {[entry.location, entry.date].filter(Boolean).join(" · ")}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
