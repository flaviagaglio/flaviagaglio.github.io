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
    // real DOM property (and attribute), not just the JSX prop — without
    // this, some mobile browsers silently block playback and show a
    // native play button instead of looping automatically.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    // Belt-and-suspenders: if the browser's autoplay policy still blocks
    // it, the very first tap/scroll anywhere on the page starts it —
    // effectively instant on mobile, where a touch happens immediately.
    const resume = () => {
      if (video.paused) tryPlay();
    };
    document.addEventListener('touchstart', resume, { once: true, passive: true });
    document.addEventListener('scroll', resume, { once: true, passive: true });
    document.addEventListener('click', resume, { once: true });

    return () => {
      document.removeEventListener('touchstart', resume);
      document.removeEventListener('scroll', resume);
      document.removeEventListener('click', resume);
    };
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
