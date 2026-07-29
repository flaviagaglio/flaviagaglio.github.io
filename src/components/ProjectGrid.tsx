import { Link, useNavigate } from 'react-router-dom';
import type { Project, ProjectCategory } from '../data/projects';
import { categoryLabels } from '../data/projects';
import { CategoryMotif } from './CategoryMotif';
import { StatusBadge } from './StatusBadge';
import { withTransitionClick } from '../lib/viewTransition';
import { Reveal } from './Reveal';

export const CATEGORY_ORDER: ProjectCategory[] = [
  'biometrics',
  'security',
  'ml',
  'nlp',
  'audio',
  'music',
  'astrophysics',
  'systems',
  'data',
];

function GridBox({ p, index }: { p: Project; index: number }) {
  const navigate = useNavigate();
  const to = `/projects/${p.slug}`;
  return (
    <Reveal className="rounded-2xl h-full" style={{ transitionDelay: `${(index % 3) * 90}ms` }}>
      <Link
        to={to}
        onClick={withTransitionClick(navigate, to)}
        className="group liquid-glass relative overflow-hidden rounded-2xl hover:bg-white/[0.14] transition-colors h-48 p-5 flex flex-col gap-3"
      >
        <CategoryMotif category={p.category} className="absolute z-10 top-4 right-4 w-6 h-6 text-signal/60 transition-transform duration-300 group-hover:text-signal/90 group-hover:-rotate-6 group-hover:scale-110" />
        <span className="relative z-10 font-mono text-[0.62rem] uppercase tracking-wide text-signal">{categoryLabels[p.category]}</span>
        <h4
          className="relative z-10 text-lg leading-snug line-clamp-2 max-w-[22ch] transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {p.title}
        </h4>
        <StatusBadge project={p} className="relative z-10 mt-auto w-fit" />
      </Link>
    </Reveal>
  );
}

export function ProjectGrid({ items, groupByCategory = false }: { items: Project[]; groupByCategory?: boolean }) {
  if (!groupByCategory) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p, i) => (
          <GridBox key={p.slug} p={p} index={i} />
        ))}
      </div>
    );
  }

  const groups = CATEGORY_ORDER.map((cat) => ({ cat, items: items.filter((p) => p.category === cat) })).filter(
    (g) => g.items.length > 0,
  );

  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div key={g.cat} id={`category-${g.cat}`}>
          <div className="flex items-center gap-3 mb-3">
            <CategoryMotif category={g.cat} className="w-4 h-4 text-signal" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {categoryLabels[g.cat]} <span className="text-signal/70">— {g.items.length}</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.items.map((p, i) => (
              <GridBox key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
