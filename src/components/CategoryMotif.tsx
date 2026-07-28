import type { ProjectCategory } from '../data/projects';

const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, strokeLinecap: 'round' as const };

export function CategoryMotif({ category, className }: { category: ProjectCategory; className?: string }) {
  switch (category) {
    case 'ml':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <circle cx="6" cy="20" r="2" {...common} />
          <circle cx="20" cy="8" r="2" {...common} />
          <circle cx="14" cy="16" r="2" {...common} />
          <circle cx="6" cy="8" r="2" {...common} />
          <path d="M6 10 L14 14 M14 14 L20 8 M6 10 L6 18" {...common} strokeWidth={0.6} />
        </svg>
      );
    case 'audio':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <path d="M2 13 L5 9 L8 17 L11 5 L14 21 L17 9 L20 15 L24 13" {...common} />
        </svg>
      );
    case 'security':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <path d="M13 2 L22 6 V13 C22 18.5 18 22.5 13 24 C8 22.5 4 18.5 4 13 V6 Z" {...common} />
          <path d="M9 13 L12 16 L18 9" {...common} strokeWidth={0.7} />
        </svg>
      );
    case 'biometrics':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <circle cx="13" cy="13" r="3" {...common} />
          <circle cx="13" cy="13" r="7" {...common} strokeWidth={0.6} />
          <circle cx="13" cy="13" r="11" {...common} strokeWidth={0.4} />
        </svg>
      );
    case 'astrophysics':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <ellipse cx="13" cy="13" rx="11" ry="4.5" {...common} />
          <circle cx="13" cy="13" r="2.4" {...common} />
        </svg>
      );
    case 'systems':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <rect x="4" y="4" width="7" height="7" {...common} />
          <rect x="15" y="15" width="7" height="7" {...common} />
          <path d="M11 7.5 H15 M15 7.5 V15 M7.5 11 V15 H15" {...common} strokeWidth={0.6} />
        </svg>
      );
    case 'data':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <path d="M5 22 V14 M13 22 V6 M21 22 V17" {...common} strokeWidth={1.4} />
          <path d="M2 22 H24" {...common} strokeWidth={0.6} />
        </svg>
      );
    case 'nlp':
      return (
        <svg viewBox="0 0 26 26" className={className}>
          <path d="M4 5 H22 V16 H10 L5 21 V16 H4 Z" {...common} />
          <path d="M8 9 H18 M8 12.5 H14" {...common} strokeWidth={0.6} />
        </svg>
      );
    default:
      return null;
  }
}
