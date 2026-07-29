import type { Project } from '../data/projects';
import { categoryLabels } from '../data/projects';
import { CATEGORY_ORDER } from './ProjectGrid';

export function CategoryJump({ items }: { items: Project[] }) {
  const present = CATEGORY_ORDER.filter((cat) => items.some((p) => p.category === cat));

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (!val) return;
    const el = document.getElementById(`category-${val}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    e.target.value = '';
  }

  return (
    <label className="inline-flex items-center gap-2 liquid-glass rounded-full pl-4 pr-2 py-2">
      <span className="font-mono text-[0.68rem] uppercase tracking-wide text-muted-foreground">Jump to category</span>
      <select
        onChange={handleChange}
        defaultValue=""
        className="bg-transparent text-sm text-foreground font-medium rounded-full px-2 py-1 min-h-9 outline-none cursor-pointer"
        aria-label="Jump to a project category"
      >
        <option value="" disabled>
          Choose…
        </option>
        {present.map((cat) => (
          <option key={cat} value={cat} className="bg-background text-foreground">
            {categoryLabels[cat]}
          </option>
        ))}
      </select>
    </label>
  );
}
