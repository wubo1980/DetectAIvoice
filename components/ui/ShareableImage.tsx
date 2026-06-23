interface ShareableImageProps {
  src: string;
  alt: string;
  pageUrl: string;
  description: string;
  className?: string;
}

/**
 * Converts a possibly relative media path into an absolute URL for social
 * sharing targets such as Pinterest.
 */
function toAbsoluteImageUrl(src: string): string {
  if (/^https?:\/\//.test(src)) {
    return src;
  }

  return `https://detectaivoice.vercel.app${src.startsWith("/") ? src : `/${src}`}`;
}

/**
 * Renders an image wrapper that reveals a Pinterest share action on hover.
 */
export function ShareableImage({
  src,
  alt,
  pageUrl,
  description,
  className
}: ShareableImageProps): JSX.Element {
  const imageUrl = toAbsoluteImageUrl(src);
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] ${className || ""}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/25" />
      <a
        href={pinterestUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Share image on Pinterest"
        className="absolute right-4 top-4 inline-flex min-h-11 items-center justify-center rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 shadow-lg transition group-hover:opacity-100"
      >
        Save on Pinterest
      </a>
    </div>
  );
}
