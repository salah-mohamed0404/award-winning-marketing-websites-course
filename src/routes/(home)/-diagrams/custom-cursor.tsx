const LERP_POSITIONS = [
  { cx: 130, cy: 98, r: 34, opacity: 0.2, label: 'frame n-3' },
  { cx: 158, cy: 82, r: 30, opacity: 0.35, label: 'frame n-1' },
  { cx: 180, cy: 68, r: 26, opacity: 0.5,  label: 'frame n-2' },
]

export function CustomCursorDiagram() {
  return (
    <svg viewBox="0 0 260 170" fill="none" className="w-full max-w-85" aria-hidden>
      <defs>
        <radialGradient id="blob-glow">
          <stop offset="0%" stopColor="var(--lagoon)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--lagoon)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lerp trail blobs */}
      {LERP_POSITIONS.map((p) => (
        <g key={p.label}>
          <circle cx={p.cx} cy={p.cy} r={p.r + 12} fill="url(#blob-glow)" />
          <circle className="showcase-svg-path" cx={p.cx} cy={p.cy} r={p.r}
            fill="var(--lagoon)" fillOpacity={p.opacity}
            stroke="var(--lagoon)" strokeOpacity={p.opacity + 0.15} strokeWidth="0.8" />
          <text x={p.cx} y={p.cy + 2} textAnchor="middle" fontSize="5"
            fill="var(--lagoon)" fontFamily="monospace" fillOpacity="0.5">{p.label}</text>
        </g>
      ))}

      {/* Pointer icon (target) */}
      <path className="showcase-svg-path"
        d="M 205 52 L 205 82 L 213 74 L 218 86 L 222 84 L 217 72 L 226 72 Z"
        fill="var(--sea-ink)" fillOpacity="0.8" stroke="var(--lagoon)" strokeWidth="0.8" strokeLinejoin="round" />
      <text x="225" y="52" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.7">target</text>

      {/* Lerp formula */}
      <rect x="16" y="118" width="228" height="26" rx="4"
        fill="var(--lagoon)" fillOpacity="0.06" stroke="var(--lagoon)" strokeOpacity="0.15" strokeWidth="0.7" />
      <text x="26" y="131" fontSize="6.5" fill="var(--lagoon)" fontFamily="monospace" fillOpacity="0.8">
        x += (target.x − x) × 0.1
      </text>
      <text x="26" y="140" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.55">
        y += (target.y − y) × 0.1  — per gsap.ticker tick
      </text>

      {/* Trail path */}
      <path className="showcase-svg-path"
        d="M 130 98 Q 155 88 180 68 Q 192 60 205 67"
        stroke="var(--lagoon)" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2.5 2" />

      {/* Ticker pulse rings */}
      <circle cx="214" cy="68" r="14" stroke="var(--lagoon)" strokeWidth="0.7" strokeOpacity="0.2" />
      <circle cx="214" cy="68" r="20" stroke="var(--lagoon)" strokeWidth="0.5" strokeOpacity="0.1" />

      <text x="130" y="16" textAnchor="middle" fontSize="6" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.5">
        blob trails pointer with silky interpolation
      </text>
    </svg>
  )
}
