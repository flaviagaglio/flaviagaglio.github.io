import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { withTransitionClick } from '../lib/viewTransition';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export const NAV_HEIGHT = 'pt-24 sm:pt-28';

export function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 inset-x-0 z-[100]">
      <div
        className="absolute inset-x-0 top-0 h-28 sm:h-36 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(180deg, rgba(2,8,23,0.65) 0%, rgba(2,8,23,0.28) 60%, rgba(2,8,23,0) 100%)' }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 max-w-7xl mx-auto">
        <NavLink
          to="/"
          className="text-2xl sm:text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          onClick={(e) => {
            setOpen(false);
            withTransitionClick(navigate, '/')(e);
          }}
        >
          Flavia Gaglio<sup className="text-xs align-super">.</sup>
        </NavLink>

        <div className="hidden md:flex liquid-glass rounded-full px-2 py-2 items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={withTransitionClick(navigate, l.to)}
              className={({ isActive }) =>
                cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                  isActive ? 'text-foreground bg-white/10' : 'text-muted-foreground hover:bg-white/10 hover:text-foreground',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="md:hidden liquid-glass rounded-full p-2.5 text-foreground min-h-11 min-w-11 flex items-center justify-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <NavLink
          to="/contact"
          onClick={withTransitionClick(navigate, '/contact')}
          className="hidden md:inline-flex liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform"
        >
          Get in touch
        </NavLink>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-x-4 top-20 z-[100] liquid-glass rounded-3xl bg-background/95 p-2 flex flex-col gap-1"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={(e) => {
                setOpen(false);
                withTransitionClick(navigate, l.to)(e);
              }}
              className={({ isActive }) =>
                cn(
                  'px-5 py-3.5 rounded-2xl text-base font-medium min-h-11',
                  isActive ? 'text-foreground bg-white/10' : 'text-muted-foreground',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
