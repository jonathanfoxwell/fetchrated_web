import { Star } from 'lucide-react';
import type { GoogleFeaturedReview } from '@/lib/data/locations';

interface LocationReviewsProps {
  reviews: GoogleFeaturedReview[];
  locationName: string;
}

export function LocationReviews({ reviews, locationName }: LocationReviewsProps) {
  const top = [...reviews]
    .filter((r) => r.text?.text?.trim() || r.originalText?.text?.trim())
    .sort((a, b) => {
      const aT = a.publishTime ? Date.parse(a.publishTime) : 0;
      const bT = b.publishTime ? Date.parse(b.publishTime) : 0;
      return bT - aT;
    })
    .slice(0, 3);

  if (!top.length) return null;

  return (
    <section
      aria-label={`Recent Google reviews for ${locationName}`}
      className="bg-card rounded-xl border border-outline-variant/10 shadow-card p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-on-surface">Recent reviews</h2>
        <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wide">
          via Google
        </span>
      </div>

      <ul className="space-y-5">
        {top.map((review, i) => (
          <li key={review.name ?? i} className="border-t border-outline-variant/10 pt-5 first:border-t-0 first:pt-0">
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReviewCard({ review }: { review: GoogleFeaturedReview }) {
  const author = review.authorAttribution?.displayName ?? 'Anonymous';
  const photo = review.authorAttribution?.photoUri;
  const rating = review.rating ?? 0;
  const text = review.text?.text ?? review.originalText?.text ?? '';
  const when = review.relativePublishTimeDescription;

  return (
    <article>
      <header className="flex items-center gap-3 mb-2">
        {photo ? (
          // Plain img (not next/image) — Google avatar URLs are 40px and
          // don't need optimisation; avoids touching next.config.ts allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={40}
            height={40}
            className="rounded-full bg-surface-container"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant font-semibold">
            {author.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-on-surface truncate">{author}</p>
          <div className="flex items-center gap-2">
            <StarRow rating={rating} />
            {when && <span className="text-xs text-on-surface-variant">{when}</span>}
          </div>
        </div>
      </header>
      {text && (
        <p className="text-on-surface-variant leading-relaxed">
          {text}
        </p>
      )}
    </article>
  );
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(Math.max(0, Math.min(5, rating)));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < filled ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
