import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

export default function NotFound() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="flex min-h-[100svh] items-center pt-28 pb-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <p className="mono-label text-accent">Error 404</p>
        <h1 className="display mt-6 text-[clamp(2.5rem,9vw,6rem)] text-ink">
          Nothing here.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
          This page doesn't exist — or it moved somewhere quieter.
        </p>
        <button
          type="button"
          onClick={() => scrollTo("#top")}
          className="btn btn-outline mt-10 inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to {site.name}
        </button>
      </div>
    </section>
  );
}
