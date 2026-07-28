import { NAV_HEIGHT } from '../components/Nav';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectGrid } from '../components/ProjectGrid';
import { featuredProjects, otherProjects, projects } from '../data/projects';

export function Projects() {
  return (
    <div className={NAV_HEIGHT}>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-16 sm:pb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
          Projects — {projects.length} total
        </p>
        <h1 className="text-4xl sm:text-5xl italic max-w-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Selected and complete work.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-5">
          From the Master's thesis in progress to coursework built at 2am — every project here links to a real case
          study. Where the code isn't public, that's noted plainly instead of a dead end.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Featured</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">All other work</h2>
        <ProjectGrid items={otherProjects} />
      </section>
    </div>
  );
}
