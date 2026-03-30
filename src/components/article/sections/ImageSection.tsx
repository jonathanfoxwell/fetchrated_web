import Image from 'next/image';

interface ImageSectionProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export function ImageSection({ src, alt, caption, credit }: ImageSectionProps) {
  return (
    <figure className="rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-surface-container">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      {(caption || credit) && (
        <figcaption className="mt-3 text-sm text-on-surface-variant">
          {caption && <p>{caption}</p>}
          {credit && <p className="text-xs mt-1 opacity-70">{credit}</p>}
        </figcaption>
      )}
    </figure>
  );
}
