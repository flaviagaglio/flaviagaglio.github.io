import { useEffect, useState } from 'react';

// An <img> (animated GIF) instead of a <video>: mobile browsers gate
// <video> autoplay behind policies that kept silently blocking it in
// practice (showing a native play affordance instead of looping) even
// after setting muted as a real DOM property. An animated image has no
// such policy anywhere — it always plays. The tradeoff is a heavier
// file and no native way to pause it, so under prefers-reduced-motion
// this swaps to a static first-frame image instead.
export function HeroVideo() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <img
      className="hero-video absolute inset-0 w-full h-full object-cover"
      src={reduced ? '/images/hero-static.jpg' : '/videos/hero.gif'}
      alt=""
      aria-hidden="true"
    />
  );
}
