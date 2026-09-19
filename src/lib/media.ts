// Resolve media paths against a configurable base URL.
// Defaults to the local /media folder. Set VITE_MEDIA_BASE_URL to a Vercel Blob
// (or R2/CDN) origin in production to serve media from object storage.
const BASE = import.meta.env.VITE_MEDIA_BASE_URL ?? "/media";

export function mediaUrl(path: string | undefined): string | undefined {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\/media\//, "").replace(/^\//, "");
  return `${BASE.replace(/\/+$/, "")}/${clean}`;
}
