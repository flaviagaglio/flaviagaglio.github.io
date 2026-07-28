// 1600x900 reference canvas — units are roughly "pixels at a normal desktop
// hero size", which keeps the star/silhouette/flower proportions predictable
// across very different viewport aspect ratios (unlike a 0-100 square
// viewBox, where "slice" scaling blew everything up on wide screens).
const VB_W = 1600;
const VB_H = 900;

const STARS = Array.from({ length: 70 }, (_, i) => {
  const seed = i * 137.5;
  const x = (seed * 11.3) % VB_W;
  const y = (seed * 4.7) % (VB_H * 0.62);
  const r = 1 + ((i * 13) % 10) / 6;
  const delay = (i % 20) / 5;
  const duration = 2.4 + (i % 7) * 0.5;
  return { id: i, x, y, r, delay, duration };
});

const FLOWERS = Array.from({ length: 16 }, (_, i) => {
  const x = (i / 16) * VB_W + ((i * 53) % 60) - 30;
  const scale = 0.6 + ((i * 29) % 10) / 18;
  const sway = i % 2 === 0 ? 1 : -1;
  return { id: i, x, scale, sway, delay: (i % 5) / 2 };
});

function Flower({ x, scale, sway, delay }: { x: number; scale: number; sway: number; delay: number }) {
  const stem = 26;
  return (
    <g
      transform={`translate(${x} ${VB_H - 6}) scale(${scale})`}
      className="hero-flower"
      style={{ transformOrigin: `${x}px ${VB_H - 6}px`, animationDelay: `${delay}s`, ['--sway' as string]: sway }}
    >
      <line x1="0" y1="0" x2="0" y2={-stem} stroke="hsl(var(--signal))" strokeOpacity="0.5" strokeWidth="2" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={Math.cos((a * Math.PI) / 180) * 8}
          cy={-stem + Math.sin((a * Math.PI) / 180) * 8}
          r="6"
          fill="hsl(var(--signal))"
          fillOpacity="0.55"
        />
      ))}
      <circle cx="0" cy={-stem} r="4.5" fill="hsl(var(--signal))" fillOpacity="0.85" />
    </g>
  );
}

export function HeroScene() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020817" />
          <stop offset="55%" stopColor="#04213a" />
          <stop offset="100%" stopColor="#0a3a57" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--signal))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--signal))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#sky)" />

      {/* whole scene breathes very slowly, so the hero reads as alive even
          before anyone notices the individual star/flower/glow animations */}
      <g className="hero-sky-drift">
        {STARS.map((s) => (
          <circle
            key={s.id}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#ffffff"
            className="hero-star"
            style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
          />
        ))}

        {/* screen glow, behind the silhouette */}
        <ellipse cx={VB_W / 2} cy="800" rx="130" ry="105" fill="url(#glow)" className="hero-screen-glow" />

        {/* desk */}
        <rect x={VB_W / 2 - 110} y="858" width="220" height="6" fill="#0a0d12" opacity="0.6" />

        {/* silhouette, seen from behind, at a laptop — a generic figure, not a likeness */}
        <g fill="#050708">
          {/* afro */}
          <circle cx={VB_W / 2} cy="762" r="52" />
          <circle cx={VB_W / 2 - 38} cy="774" r="40" />
          <circle cx={VB_W / 2 + 38} cy="774" r="40" />
          <circle cx={VB_W / 2} cy="722" r="38" />
          {/* shoulders + back */}
          <path
            d={`M${VB_W / 2 - 62} 862 C${VB_W / 2 - 62} 826 ${VB_W / 2 - 32} 806 ${VB_W / 2} 806
                C${VB_W / 2 + 32} 806 ${VB_W / 2 + 62} 826 ${VB_W / 2 + 62} 862 Z`}
          />
          {/* arms toward the laptop */}
          <path
            d={`M${VB_W / 2 - 62} 862 C${VB_W / 2 - 68} 842 ${VB_W / 2 - 58} 828 ${VB_W / 2 - 40} 822
                L${VB_W / 2 - 28} 852 Z`}
          />
          <path
            d={`M${VB_W / 2 + 62} 862 C${VB_W / 2 + 68} 842 ${VB_W / 2 + 58} 828 ${VB_W / 2 + 40} 822
                L${VB_W / 2 + 28} 852 Z`}
          />
        </g>

        {/* laptop */}
        <rect x={VB_W / 2 - 66} y="850" width="132" height="8" rx="3" fill="#050708" />
        <rect x={VB_W / 2 - 58} y="782" width="116" height="70" rx="4" fill="#050708" />
        <rect x={VB_W / 2 - 52} y="788" width="104" height="58" rx="2" fill="hsl(var(--signal))" className="hero-screen-flicker" />

        {FLOWERS.map((f) => (
          <Flower key={f.id} {...f} />
        ))}
      </g>
    </svg>
  );
}
