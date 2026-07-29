import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // Show the first frame as a still image instead of looping.
      video.pause();
      return;
    }

    // Mobile Safari/Chrome only honor autoplay when `muted` is set as a
    // real DOM property, not just the JSX/HTML attribute — without this,
    // some mobile browsers silently block playback and show a native
    // play button instead of looping automatically.
    video.muted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video absolute inset-0 w-full h-full object-cover"
      src="/videos/hero.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
