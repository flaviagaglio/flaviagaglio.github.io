import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { cn } from '../lib/utils';

export function Reveal({
  children,
  className,
  as = 'div',
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
  id?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const cls = cn(
    'transition-all duration-700 ease-out',
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
    className,
  );

  if (as === 'section') {
    return (
      <section ref={ref} id={id} className={cls} style={style}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} id={id} className={cls} style={style}>
      {children}
    </div>
  );
}
