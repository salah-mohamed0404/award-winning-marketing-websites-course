export function DrawSVGDiagram() {
  return (
    <svg viewBox="0 0 280 160" fill="none" className="w-full max-w-90" aria-hidden>
      <defs>
        <linearGradient id="dsv-drawn" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--lagoon)" />
          <stop offset="65%" stopColor="var(--palm)" />
          <stop offset="100%" stopColor="var(--lagoon)" stopOpacity="0.3" />
        </linearGradient>
        <marker id="dsv-arrow" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="var(--lagoon)" fillOpacity="0.6" />
        </marker>
      </defs>

      {/* Drawn portion */}
      <path className="showcase-svg-path"
        d="M 16 80 C 36 40, 56 120, 76 80 C 96 40, 116 120, 136 80 C 156 40, 176 120, 196 80"
        stroke="url(#dsv-drawn)" strokeWidth="2.2" strokeLinecap="round" />

      {/* Pending portion */}
      <path d="M 196 80 C 216 40, 236 120, 256 80 C 262 72, 266 68, 268 70"
        stroke="var(--lagoon)" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.18" strokeDasharray="4 3" />

      {/* Progress cursor */}
      <circle cx="196" cy="80" r="5.5" fill="var(--lagoon)" />
      <circle cx="196" cy="80" r="10" fill="var(--lagoon)" fillOpacity="0.15" />
      <path className="showcase-svg-path" d="M 196 66 L 196 50"
        stroke="var(--lagoon)" strokeWidth="0.8" strokeOpacity="0.5" markerEnd="url(#dsv-arrow)" />

      {/* Scroll progress bar */}
      <rect x="16" y="118" width="248" height="5" rx="2.5" fill="var(--lagoon)" fillOpacity="0.1" />
      <rect className="showcase-svg-path" x="16" y="118" width="155" height="5" rx="2.5" fill="var(--lagoon)" fillOpacity="0.6" />
      <text x="16" y="133" fontSize="6" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.7">scroll progress</text>
      <text x="264" y="133" textAnchor="end" fontSize="6" fill="var(--lagoon)" fontFamily="monospace">62%</text>

      {/* dashoffset caption */}
      <text x="140" y="148" textAnchor="middle" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">
        stroke-dashoffset drives draw position
      </text>

      {/* Drawn / pending brackets */}
      <path className="showcase-svg-path" d="M 16 94 L 16 100 L 196 100 L 196 94"
        stroke="var(--lagoon)" strokeWidth="0.7" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="106" y="110" textAnchor="middle" fontSize="5.5" fill="var(--lagoon)" fontFamily="monospace" fillOpacity="0.75">drawn</text>
      <path className="showcase-svg-path" d="M 196 94 L 196 100 L 265 100 L 265 94"
        stroke="var(--lagoon)" strokeWidth="0.7" strokeOpacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
      <text x="230" y="110" textAnchor="middle" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.4">pending</text>
    </svg>
  )
}
