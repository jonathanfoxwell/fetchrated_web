import manifestData from '../../public/images/directory/_manifest.json';

interface ManifestPhoto {
  subcat: string;
  local_path: string;
}

const allPhotos = manifestData.photos as ManifestPhoto[];
const profiles = allPhotos.filter((p) => p.subcat === 'profiles').map((p) => p.local_path);
const banners = allPhotos.filter((p) => p.subcat === 'banners').map((p) => p.local_path);

function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) + s.charCodeAt(i);
  }
  return Math.abs(h | 0);
}

export function fallbackProfileImage(slug: string): string | null {
  if (!profiles.length) return null;
  return profiles[hash(slug) % profiles.length];
}

export function fallbackBannerImage(slug: string): string | null {
  if (!banners.length) return null;
  return banners[hash(slug) % banners.length];
}
