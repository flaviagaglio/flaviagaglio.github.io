import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon as Github } from './icons/BrandIcons';
import type { Project } from '../data/projects';
import { categoryLabels } from '../data/projects';
import { CategoryMotif } from './CategoryMotif';
import { StatusBadge } from './StatusBadge';
import { withTransitionClick } from '../lib/viewTransition';

export function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const to = `/projects/${project.slug}`;
  return (
    <article className="liquid-glass rounded-3xl overflow-hidden flex flex-col">
      <div className="relative aspect-[16/9] flex items-center justify-center bg-secondary/60 border-b border-border overflow-hidden">
        <div className="warm-glow absolute w-40 h-40 rounded-full" />
        <CategoryMotif category={project.category} className="relative z-10 w-16 h-16 text-signal/70" />
        <span className="absolute top-3 left-3 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
          {categoryLabels[project.category]}
        </span>
        <StatusBadge project={project} className="absolute top-3 right-3 bg-background/60" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal mb-2">Featured</p>
        <h3 className="text-2xl mb-3 leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.summary}</p>

        <div className="grid grid-cols-3 gap-3 py-4 mb-5 border-t border-b border-border">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="min-w-0 flex flex-col gap-0.5">
              <span className="font-mono text-[0.6rem] uppercase tracking-wide text-muted-foreground truncate">{m.label}</span>
              <span className="font-mono text-sm tabular-nums break-words">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-signal hover:text-signal/80 min-h-11">
              <ExternalLink size={14} /> Try it
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-foreground hover:text-signal min-h-11">
              <Github size={14} /> Code
            </a>
          )}
          <Link to={to} onClick={withTransitionClick(navigate, to)} className="inline-flex items-center gap-1.5 text-foreground hover:text-signal min-h-11">
            Case study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
