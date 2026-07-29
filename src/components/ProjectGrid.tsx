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

function GridBox({ p }: { p: Project }) {
  const navigate = useNavigate();
  const to = `/projects/${p.slug}`;
  return (
    <Link
      to={to}
      onClick={withTransitionClick(navigate, to)}
      className="group liquid-glass relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors p-5 flex flex-col gap-3 min-h-[160px]"
    >
      <CategoryMotif category={p.category} className="absolute top-4 right-4 w-6 h-6 text-signal/40 transition-transform duration-300 group-hover:text-signal/70 group-hover:-rotate-6 group-hover:scale-110" />
      <span className="font-mono text-[0.62rem] uppercase tracking-wide text-signal">{categoryLabels[p.category]}</span>
      <h4 className="text-lg leading-snug max-w-[22ch] transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {p.title}
      </h4>
      <StatusBadge project={p} className="mt-auto w-fit" />
    </Link>
  );
}

export function ProjectGrid({ items, groupByCategory = false }: { items: Project[]; groupByCategory?: boolean }) {
  if (!groupByCategory) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <GridBox key={p.slug} p={p} />
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
        <Reveal key={g.cat} id={`category-${g.cat}`}>
          <div className="flex items-center gap-3 mb-3">
            <CategoryMotif category={g.cat} className="w-4 h-4 text-signal" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {categoryLabels[g.cat]} <span className="text-signal/70">— {g.items.length}</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.items.map((p) => (
              <GridBox key={p.slug} p={p} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
