import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectGrid } from '../components/ProjectGrid';
import { featuredProjects, otherProjects } from '../data/projects';

const skillGroups = [
  { title: 'AI, Machine Learning & Security', items: ['Machine Learning', 'Cybersecurity', 'Biometrics'] },
  { title: 'Programming & Systems', items: ['Python', 'C', 'Java', 'SQL', 'Git', 'TypeScript', 'UNIX / Linux'] },
  { title: 'Music Production', items: ['Logic Pro', 'Luna', 'UA Plugins'] },
];

const education = [
  { title: 'High School Diploma, Liceo Scientifico Leonardo', meta: 'Completed', body: 'Scientific studies track, graduated with full marks and honors.' },
  {
    title: 'Bachelor’s Degree, Computer Engineering',
    meta: 'Completed',
    body: 'Built the foundations: algorithms, systems, databases and networking, alongside a thesis on vulnerability analysis in biometric systems.',
  },
  {
    title: 'Master’s Degree, Artificial Intelligence & Cybersecurity',
    meta: 'Ongoing',
    body: 'Deepening machine learning, biometrics and security research, with coursework spanning model design, attack surfaces and defensive countermeasures.',
  },
];

export function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden bg-background" style={{ height: '100dvh' }}>
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundColor: '#00263b',
            backgroundImage:
              "linear-gradient(180deg, rgba(0,20,32,0.35) 0%, rgba(0,20,32,0.25) 45%, rgba(0,20,32,0.85) 100%), url('/images/hero-desk.jpg')",
          }}
          role="img"
          aria-label="Flavia working at her desk, seen from behind"
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-mono text-xs tracking-[0.16em] uppercase text-white/70 mb-6 animate-fade-rise">
            Portfolio — 2026 · <span className="text-signal">AI &amp; Cybersecurity Student</span>
          </p>
          <h1
            className="text-white leading-[0.95] text-5xl sm:text-7xl md:text-8xl animate-fade-rise"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span className="block italic font-normal" style={{ letterSpacing: '-0.05em' }}>
              Where signals
            </span>
            <span className="block font-normal -mt-1" style={{ letterSpacing: '-0.08em' }}>
              reveal the truth.
            </span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            Computer Engineering graduate with a growing focus on machine learning and biometric systems — and on the
            ways these systems can be broken. Currently pursuing a Master's in AI &amp; Cybersecurity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-12 animate-fade-rise-delay-2">
            <Button variant="glass" size="lg" asChild>
              <Link to="/projects">View my work</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">About</p>
        <h2 className="text-3xl sm:text-4xl mb-10 max-w-2xl italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Structure, improvisation and attention to detail.
        </h2>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-foreground text-lg">
              I like building things that work and understanding exactly why they might not.
            </p>
            <p>
              I hold a Bachelor's degree in Computer Engineering and I'm currently pursuing a Master's in Artificial
              Intelligence and Cybersecurity. My academic path has given me a strong foundation in problem-solving,
              system design and security, with a particular focus on machine learning and biometric systems — both
              building them and studying how they can be attacked.
            </p>
            <p>
              My current research looks at anti-spoofing in biometric authentication and I keep an ongoing interest
              in applied security topics like anomaly detection and modern authentication standards.
            </p>
            <p>
              I want to bring together technical depth and curiosity — building things that are not only functional
              but well understood. When I'm not at a keyboard writing code, I'm usually at one making music — guitar,
              piano, bass and synth.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Education', value: 'B.Eng, Computer Engineering' },
              { label: 'Currently', value: 'M.Sc, AI & Cybersecurity' },
              { label: 'Focus areas', value: 'ML, biometrics, security' },
            ].map((f) => (
              <div key={f.label} className="liquid-glass rounded-2xl p-5">
                <span className="block font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground mb-1">{f.label}</span>
                <span className="block text-foreground">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Skills</p>
        <h2 className="text-3xl sm:text-4xl mb-10 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Tools I reach for.
        </h2>
        <div className="space-y-6">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted-foreground mb-3">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="liquid-glass rounded-full px-4 py-1.5 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Featured</p>
            <h2 className="text-3xl sm:text-4xl italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Selected work.
            </h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-signal min-h-11">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* ============ MORE PROJECTS (compact grid) ============ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          More work — {otherProjects.length} more projects
        </p>
        <ProjectGrid items={otherProjects} />
      </section>

      {/* ============ EDUCATION ============ */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Education</p>
        <h2 className="text-3xl sm:text-4xl mb-10 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          A short, real timeline.
        </h2>
        <div className="space-y-0 border-t border-border">
          {education.map((e, i) => (
            <div key={e.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 border-b border-border">
              <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-lg mb-1">{e.title}</h3>
                <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">{e.meta}</span>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CONTACT TEASER ============ */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-28 sm:pb-36 text-center">
        <h2 className="text-3xl sm:text-4xl italic mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Let's talk.
        </h2>
        <Button variant="primary" size="lg" asChild>
          <Link to="/contact">Get in touch</Link>
        </Button>
      </section>
    </>
  );
}
