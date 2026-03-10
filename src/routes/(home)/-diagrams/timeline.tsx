const TRACKS = [
  { label: 'hero-stat',  x: 20,  w: 56, color: '#4fb8b2', row: 0 },
  { label: 'title chars', x: 52, w: 80, color: '#f4a460', row: 1 },
  { label: 'divider',    x: 96,  w: 44, color: '#c9a8e0', row: 2 },
  { label: 'subtitle',   x: 114, w: 52, color: '#5cb85c', row: 3 },
  { label: 'cta',        x: 140, w: 44, color: '#e8a0bf', row: 4 },
]
const ROW_H = 14
const ROW_GAP = 7
const trackY = (row: number) => 16 + row * (ROW_H + ROW_GAP)

export function TimelineDiagram() {
  return (
    <svg viewBox="0 0 300 140" fill="none" className="w-full max-w-95" aria-hidden>
      <defs>
        <linearGradient id="tl-axis" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--lagoon)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--lagoon)" stopOpacity="0.7" />
        </linearGradient>
        {TRACKS.map((t) => (
          <linearGradient key={t.label} id={`tl-${t.row}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={t.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={t.color} stopOpacity="0.4" />
          </linearGradient>
        ))}
      </defs>

      {/* Time axis + arrow */}
      <path className="showcase-svg-path" d="M 16 118 L 286 118" stroke="url(#tl-axis)" strokeWidth="1" strokeLinecap="round" />
      <path className="showcase-svg-path" d="M 282 115 L 286 118 L 282 121" stroke="var(--lagoon)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

      {/* Time ticks */}
      {[16, 76, 136, 196, 256].map((x, i) => (
        <g key={x}>
          <path className="showcase-svg-path" d={`M ${x} 114 L ${x} 122`} stroke="var(--lagoon)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x={x} y="130" textAnchor="middle" fontSize="6.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.7">
            {i * 0.5}s
          </text>
        </g>
      ))}

      {/* Track rows */}
      {TRACKS.map((t) => {
        const y = trackY(t.row)
        const xScaled = 16 + (t.x / 160) * 270
        const wScaled = (t.w / 160) * 270
        return (
          <g key={t.label}>
            <text x="14" y={y + ROW_H * 0.72} textAnchor="end" fontSize="5.5" fill={t.color} fontFamily="monospace" fillOpacity="0.8">
              {t.label}
            </text>
            <rect className="showcase-svg-path" x={xScaled} y={y} width={wScaled} height={ROW_H} rx="2.5"
              fill={`url(#tl-${t.row})`} fillOpacity="0.85" />
            <path className="showcase-svg-path"
              d={`M ${xScaled + 4} ${y + ROW_H - 2} Q ${xScaled + wScaled * 0.4} ${y + 2} ${xScaled + wScaled - 4} ${y + ROW_H * 0.35}`}
              stroke={t.color} strokeWidth="0.8" strokeOpacity="0.7" strokeDasharray="1.5 1" />
          </g>
        )
      })}

      {/* Stagger bracket */}
      <path className="showcase-svg-path" d="M 52 12 L 52 8 L 132 8 L 132 12"
        stroke="var(--lagoon)" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="92" y="6.5" textAnchor="middle" fontSize="5.5" fill="var(--lagoon)" fontFamily="monospace" fillOpacity="0.8">stagger</text>

      {/* GSDevTools playhead */}
      <path className="showcase-svg-path" d="M 160 8 L 160 122" stroke="var(--palm)" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2.5 2" />
      <polygon className="showcase-svg-path" points="156,8 164,8 160,14" fill="var(--palm)" fillOpacity="0.8" />
    </svg>
  )
}
