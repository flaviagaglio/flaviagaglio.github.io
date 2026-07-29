import { LinkedinIcon as Linkedin, GithubIcon as Github, InstagramIcon as Instagram } from './icons/BrandIcons';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">&copy; 2026 Flavia Gaglio. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/flavia-gaglio-4a30b0335/" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors min-h-11 min-w-11 flex items-center justify-center">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com/flaviagaglio" target="_blank" rel="noopener" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors min-h-11 min-w-11 flex items-center justify-center">
            <Github size={18} />
          </a>
          <a href="https://www.instagram.com/flaviagaglio/" target="_blank" rel="noopener" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors min-h-11 min-w-11 flex items-center justify-center">
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
