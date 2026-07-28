import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { categoryLabels } from '../data/projects';
import { CategoryMotif } from './CategoryMotif';
import { StatusBadge } from './StatusBadge';

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border-t border-l border-border">
      {items.map((p) => (
        <Link
          key={p.slug}
          to={`/projects/${p.slug}`}
          className="group relative bg-background hover:bg-secondary/60 transition-colors p-5 flex flex-col gap-3 min-h-[160px] border-r border-b border-border"
        >
          <CategoryMotif category={p.category} className="absolute top-4 right-4 w-6 h-6 text-signal/40 group-hover:text-signal/70 transition-colors" />
          <span className="font-mono text-[0.62rem] uppercase tracking-wide text-signal">{categoryLabels[p.category]}</span>
          <h4 className="text-lg leading-snug max-w-[22ch]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {p.title}
          </h4>
          <StatusBadge project={p} className="mt-auto w-fit" />
        </Link>
      ))}
    </div>
  );
}
