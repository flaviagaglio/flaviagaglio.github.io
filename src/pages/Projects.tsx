import { Link, useNavigate } from 'react-router-dom';
import { NAV_HEIGHT } from '../components/Nav';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectGrid } from '../components/ProjectGrid';
import { CategoryJump } from '../components/CategoryJump';
import { Reveal } from '../components/Reveal';
import { withTransitionClick } from '../lib/viewTransition';
import { featuredProjects, otherProjects, projects } from '../data/projects';

export function Projects() {
  const navigate = useNavigate();

  return (
    <div className={NAV_HEIGHT}>
      <Reveal as="section" className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-16 sm:pb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
          Projects — {projects.length} total
        </p>
        <h1 className="text-4xl sm:text-5xl italic max-w-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Selected and complete work.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-5">
          From the Master's thesis in progress to coursework built at 2am — every project here links to a real case
          study. Where the code isn't public, that's noted plainly instead of a dead end: it's academic work, and
          publishing it isn't always appropriate. Depending on the specific project, I may be able to share it
          privately on request —{' '}
          <Link to="/contact" onClick={withTransitionClick(navigate, '/contact')} className="text-signal font-medium hover:text-signal/80">
            get in touch
          </Link>
          .
        </p>
      </Reveal>

      <Reveal as="section" className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Featured</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            All other work, grouped by category
          </h2>
          <CategoryJump items={otherProjects} />
        </div>
        <ProjectGrid items={otherProjects} groupByCategory />
      </Reveal>
    </div>
  );
}
