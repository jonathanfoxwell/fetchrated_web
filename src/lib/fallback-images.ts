import manifestData from '../../public/images/directory/_manifest.json';

interface ManifestPhoto {
  subcat: string;
  local_path: string;
  color: string | null;
}

export interface FallbackImage {
  src: string;
  // Dominant colour from the Unsplash API. Used as the wrapper background so
  // the placeholder matches the image and there's no visible transition when
  // the JPG paints over it.
  color: string | null;
}

const allPhotos = manifestData.photos as ManifestPhoto[];
const profiles: FallbackImage[] = allPhotos
  .filter((p) => p.subcat === 'profiles')
  .map((p) => ({ src: p.local_path, color: p.color ?? null }));
const banners: FallbackImage[] = allPhotos
  .filter((p) => p.subcat === 'banners')
  .map((p) => ({ src: p.local_path, color: p.color ?? null }));

function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) + s.charCodeAt(i);
  }
  return Math.abs(h | 0);
}

export function fallbackProfileImage(slug: string): FallbackImage | null {
  if (!profiles.length) return null;
  return profiles[hash(slug) % profiles.length];
}

export function fallbackBannerImage(slug: string): FallbackImage | null {
  if (!banners.length) return null;
  return banners[hash(slug) % banners.length];
}
