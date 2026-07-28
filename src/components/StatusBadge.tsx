import type { Project } from '../data/projects';
import { cn } from '../lib/utils';

export function StatusBadge({ project, className }: { project: Project; className?: string }) {
  const label = project.stage
    ? project.stage
    : project.status === 'live-demo'
      ? 'Live demo'
      : project.status === 'public-code'
        ? 'Public — code'
        : 'Academic — private';

  const isPrivate = project.status === 'academic-private' && !project.stage;

  return (
    <span
      className={cn(
        'font-mono text-[0.65rem] uppercase tracking-wide px-2 py-1 rounded-full border',
        isPrivate ? 'border-border text-muted-foreground' : 'border-signal/40 text-signal',
        className,
      )}
    >
      {label}
    </span>
  );
}
