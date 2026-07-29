import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from '../components/icons/BrandIcons';
import { NAV_HEIGHT } from '../components/Nav';
import { CategoryMotif } from '../components/CategoryMotif';
import { StatusBadge } from '../components/StatusBadge';
import { getProjectBySlug, categoryLabels } from '../data/projects';
import { withTransitionClick } from '../lib/viewTransition';

const sections: { key: 'problem' | 'approach' | 'architecture' | 'results' | 'limits'; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'results', label: 'Results' },
  { key: 'limits', label: 'Honest limits' },
];

export function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? '');

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className={NAV_HEIGHT}>
      <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 pb-24 sm:pb-32">
        <Link
          to="/projects"
          onClick={withTransitionClick(navigate, '/projects')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 min-h-11"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <CategoryMotif category={project.category} className="w-6 h-6 text-signal" />
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{categoryLabels[project.category]}</span>
          <StatusBadge project={project} />
        </div>

        <h1 className="text-4xl sm:text-5xl italic leading-tight mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{project.summary}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-xs border border-border rounded-full px-3 py-1 text-muted-foreground">
              {s}
            </span>
          ))}
        </div>

        {(project.links.demo || project.links.code) && (
          <div className="flex flex-wrap gap-6 mb-12 pb-10 border-b border-border">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-signal font-medium min-h-11">
                <ExternalLink size={16} /> Try it online
              </a>
            )}
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-foreground font-medium min-h-11">
                <Github size={16} /> View code
              </a>
            )}
          </div>
        )}

        {project.status === 'academic-private' && (
          <div className="liquid-glass rounded-2xl p-5 mb-12 text-sm text-foreground/90 leading-relaxed">
            The code for this project isn't public — it's academic work, and publishing it isn't always appropriate.
            Depending on the specific project, I may be able to share it privately on request:{' '}
            <Link to="/contact" className="text-signal font-medium hover:text-signal/80">
              get in touch
            </Link>
            .
          </div>
        )}

        {project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12 pb-10 border-b border-border">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <span className="block font-mono text-[0.62rem] uppercase tracking-wide text-muted-foreground mb-1">{m.label}</span>
                <span className="block font-mono text-sm">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.key}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">{s.label}</h2>
              <p className="text-foreground/90 leading-relaxed">{project.body[s.key]}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
