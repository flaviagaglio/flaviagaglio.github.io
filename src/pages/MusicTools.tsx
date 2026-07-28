import { ExternalLink } from 'lucide-react';
import { NAV_HEIGHT } from '../components/Nav';

const tools = [
  {
    name: 'passwords',
    href: '/passwords/',
    tagline: 'Password generator with a cyberpunk terminal look.',
    body: 'Customize length and character types, and watch the real-time strength meter — scanline background, cyan border, lime readout.',
    stack: ['JavaScript', 'HTML / CSS'],
  },
  {
    name: 'keys',
    href: '/keys/',
    tagline: 'Key signature finder.',
    body: 'Find the key signature of any major or minor tonality: number of accidentals and which notes are sharp or flat.',
    stack: ['JavaScript', 'Music Theory'],
  },
  {
    name: 'mode-finder',
    href: '/mode-finder/',
    tagline: 'Modal scale finder.',
    body: 'Look up the modes of any key and hear how each one shifts the color of the same set of notes.',
    stack: ['JavaScript', 'Music Theory'],
  },
];

export function MusicTools() {
  return (
    <div className={NAV_HEIGHT}>
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-6 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Music Tools</p>
        <h1 className="text-4xl sm:text-5xl italic max-w-xl mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Small tools, built for practice.
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Three standalone apps built alongside guitar, piano, bass and synth practice — each with its own visual
          identity, kept intact rather than folded into the rest of the site.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32 space-y-6">
        {tools.map((t) => (
          <a
            key={t.name}
            href={t.href}
            className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 group"
          >
            <div className="flex-1">
              <h2 className="text-2xl italic mb-1 group-hover:text-signal transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {t.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">{t.tagline}</p>
              <p className="text-sm text-foreground/80 leading-relaxed max-w-md">{t.body}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {t.stack.map((s) => (
                  <span key={s} className="font-mono text-[0.65rem] border border-border rounded-full px-2.5 py-1 text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-signal shrink-0 min-h-11">
              Open <ExternalLink size={14} />
            </span>
          </a>
        ))}
      </section>
    </div>
  );
}
