const LIGHT_RAYS: [number, number][] = [[-10, 12], [-6, 18], [-14, 8]]

export function ThreeJsDiagram() {
  return (
    <svg viewBox="0 0 260 190" fill="none" className="w-full max-w-85" aria-hidden>
      <defs>
        <linearGradient id="th-x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e05252" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e05252" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="th-y" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#52e052" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#52e052" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="th-z" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5252e0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5252e0" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Coordinate axes */}
      <path className="showcase-svg-path" d="M 120 110 L 185 110" stroke="url(#th-x)" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="183,107 190,110 183,113" fill="#e05252" fillOpacity="0.7" />
      <text x="193" y="113" fontSize="6" fill="#e05252" fontFamily="monospace" fillOpacity="0.7">X</text>

      <path className="showcase-svg-path" d="M 120 110 L 120 44" stroke="url(#th-y)" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="117,46 120,40 123,46" fill="#52e052" fillOpacity="0.7" />
      <text x="123" y="36" fontSize="6" fill="#52e052" fontFamily="monospace" fillOpacity="0.7">Y</text>

      <path className="showcase-svg-path" d="M 120 110 L 68 140" stroke="url(#th-z)" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="70,142 64,146 68,138" fill="#5252e0" fillOpacity="0.7" />
      <text x="55" y="150" fontSize="6" fill="#5252e0" fontFamily="monospace" fillOpacity="0.7">Z</text>

      {/* Wireframe cube — front, top, right faces */}
      <path className="showcase-svg-path" d="M 100 72 L 140 72 L 140 100 L 100 100 Z"
        stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.7" fill="var(--lagoon)" fillOpacity="0.07" />
      <path className="showcase-svg-path" d="M 100 72 L 118 60 L 158 60 L 140 72 Z"
        stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.5" fill="var(--lagoon)" fillOpacity="0.04" />
      <path className="showcase-svg-path" d="M 140 72 L 158 60 L 158 88 L 140 100 Z"
        stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.4" fill="var(--lagoon)" fillOpacity="0.03" />

      {/* GSAP rotation arc */}
      <path className="showcase-svg-path" d="M 155 56 A 22 10 0 0 1 100 70"
        stroke="var(--palm)" strokeWidth="1" strokeOpacity="0.65" strokeDasharray="2.5 2" />
      <polygon points="100,70 96,64 104,65" fill="var(--palm)" fillOpacity="0.7" />
      <text x="165" y="52" fontSize="5.5" fill="var(--palm)" fontFamily="monospace" fillOpacity="0.7">
        gsap.to(mesh.rotation…)
      </text>

      {/* Point light */}
      <circle cx="170" cy="44" r="5" fill="#ffe066" fillOpacity="0.8" />
      <circle cx="170" cy="44" r="10" fill="#ffe066" fillOpacity="0.12" />
      <circle cx="170" cy="44" r="16" fill="#ffe066" fillOpacity="0.06" />
      <text x="180" y="44" fontSize="5.5" fill="#ffe066" fontFamily="monospace" fillOpacity="0.75">PointLight</text>
      {LIGHT_RAYS.map(([dx, dy]) => (
        <path key={`${dx}-${dy}`} className="showcase-svg-path"
          d={`M ${170 + dx * 0.6} ${44 + dy * 0.4} L ${170 + dx} ${44 + dy}`}
          stroke="#ffe066" strokeWidth="0.7" strokeOpacity="0.35" />
      ))}

      {/* Camera frustum */}
      <path className="showcase-svg-path" d="M 22 22 L 54 36 L 54 86 L 22 100 Z"
        stroke="var(--sea-ink-soft)" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="2 2" />
      <rect x="14" y="14" width="16" height="16" rx="2"
        fill="var(--sea-ink-soft)" fillOpacity="0.08" stroke="var(--sea-ink-soft)" strokeOpacity="0.25" strokeWidth="0.8" />
      <text x="22" y="7" textAnchor="middle" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.5">Camera</text>

      {/* R3F caption */}
      <rect x="16" y="158" width="228" height="18" rx="3"
        fill="var(--lagoon)" fillOpacity="0.05" stroke="var(--lagoon)" strokeOpacity="0.12" strokeWidth="0.7" />
      <text x="130" y="170" textAnchor="middle" fontSize="6" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">
        &lt;Canvas&gt; · useFrame() · &lt;mesh position rotation&gt;
      </text>
    </svg>
  )
}
