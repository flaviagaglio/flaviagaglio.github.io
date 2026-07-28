import { Mail } from 'lucide-react';
import { NAV_HEIGHT } from '../components/Nav';
import { LinkedinIcon as Linkedin, GithubIcon as Github, InstagramIcon as Instagram } from '../components/icons/BrandIcons';

const cards = [
  { icon: Mail, label: 'Email', value: 'flaviagaglio9@gmail.com', href: 'mailto:flaviagaglio9@gmail.com' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Flavia Gaglio',
    href: 'https://www.linkedin.com/in/flavia-gaglio-4a30b0335/',
  },
  { icon: Github, label: 'GitHub', value: 'flaviagaglio', href: 'https://github.com/flaviagaglio' },
  { icon: Instagram, label: 'Instagram', value: '@flaviagaglio', href: 'https://www.instagram.com/flaviagaglio/' },
];

export function Contact() {
  return (
    <div className={NAV_HEIGHT}>
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Contact</p>
        <h1 className="text-4xl sm:text-5xl italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Let's talk.
        </h1>
      </section>

      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32 grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener' : undefined}
            className="liquid-glass rounded-2xl p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform min-h-11"
          >
            <c.icon size={22} className="text-signal shrink-0" />
            <span className="flex flex-col">
              <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">{c.label}</span>
              <span className="text-foreground">{c.value}</span>
            </span>
          </a>
        ))}
      </section>
    </div>
  );
}
