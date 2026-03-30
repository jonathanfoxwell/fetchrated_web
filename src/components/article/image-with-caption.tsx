import { cn } from "@/lib/utils";

export interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  variant?: "default" | "rounded" | "hero";
  aspectRatio?: "auto" | "video" | "square" | "portrait";
  className?: string;
}

/**
 * ImageWithCaption - Image with optional caption and credit
 *
 * @example
 * <ImageWithCaption
 *   src="/images/vet-clinic.jpg"
 *   alt="Modern veterinary clinic interior"
 *   caption="A state-of-the-art facility with modern diagnostic equipment"
 *   credit="Photo: FetchRated"
 * />
 */
export function ImageWithCaption({
  src,
  alt,
  caption,
  credit,
  variant = "default",
  aspectRatio = "auto",
  className,
}: ImageWithCaptionProps) {
  const aspectRatios = {
    auto: "",
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const variants = {
    default: "rounded-lg shadow-card",
    rounded: "rounded-2xl shadow-card-hover",
    hero: "rounded-full shadow-2xl border-4 border-surface-container-lowest",
  };

  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "overflow-hidden",
          aspectRatios[aspectRatio],
          variants[variant]
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover",
            variant === "default" && "hover:scale-105 transition-transform duration-500"
          )}
        />
      </div>

      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
          {caption && (
            <span className="text-sm text-on-surface-variant italic">
              {caption}
            </span>
          )}
          {credit && (
            <span className="text-xs text-on-surface-variant/70">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
