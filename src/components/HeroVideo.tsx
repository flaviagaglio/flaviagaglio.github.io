import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced && ref.current) {
      // Show the first frame as a still image instead of looping —
      // the browser still needs metadata loaded to paint that frame.
      ref.current.pause();
    }
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      src="/videos/hero.mp4"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  );
}
