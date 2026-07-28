import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';

/**
 * Wraps a react-router navigation in the native View Transitions API so
 * switching pages cross-fades/slides instead of hard-cutting. Falls back to
 * a plain navigate() on browsers without support, and is skipped entirely
 * under prefers-reduced-motion.
 */
export function withTransitionClick(navigate: (to: string) => void, to: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransitions = 'startViewTransition' in document;

    if (reduced || !supportsViewTransitions) {
      navigate(to);
      return;
    }

    (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };
}
