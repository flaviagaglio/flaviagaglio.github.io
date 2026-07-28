import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';

export function Reveal({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const cls = cn(
    'transition-all duration-700 ease-out',
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
    className,
  );

  if (as === 'section') {
    return (
      <section ref={ref} className={cls}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cls}>
      {children}
    </div>
  );
}
