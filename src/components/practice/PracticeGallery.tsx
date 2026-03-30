'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PracticeGalleryProps {
  images: string[];
  practiceName: string;
}

export function PracticeGallery({ images, practiceName }: PracticeGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="bg-card rounded-xl border border-outline-variant/10 shadow-card p-6">
        <h2 className="text-lg font-semibold text-on-surface mb-4">Gallery</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.slice(0, 6).map((url, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={url}
                alt={`${practiceName} photo ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
              {index === 5 && images.length > 6 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    +{images.length - 6} more
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="relative w-full max-w-4xl aspect-[4/3] mx-16">
            <Image
              src={images[currentIndex]}
              alt={`${practiceName} photo ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={goNext}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
