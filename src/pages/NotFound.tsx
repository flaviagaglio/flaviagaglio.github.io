import { Link } from 'react-router-dom';
import { NAV_HEIGHT } from '../components/Nav';
import { Button } from '../components/ui/button';

export function NotFound() {
  return (
    <div className={`${NAV_HEIGHT} min-h-[70vh] flex flex-col items-center justify-center text-center px-5`}>
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">404</p>
      <h1 className="text-4xl italic mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Nothing here.
      </h1>
      <Button variant="glass" asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
}
