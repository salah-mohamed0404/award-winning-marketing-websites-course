export function ScrollTriggerDiagram() {
  return (
    <svg viewBox="0 0 260 190" fill="none" className="w-full max-w-85" aria-hidden>
      <defs>
        <linearGradient id="st-scrub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--lagoon)" />
          <stop offset="100%" stopColor="var(--palm)" />
        </linearGradient>
      </defs>

      {/* Document */}
      <rect className="showcase-svg-path" x="60" y="10" width="90" height="170" rx="4"
        stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.2" fill="var(--lagoon)" fillOpacity="0.03" />
      <text x="105" y="22" textAnchor="middle" fontSize="6" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.5">document</text>

      {/* Content lines */}
      {[32, 40, 48, 56, 128, 136, 144, 152, 160].map((y) => (
        <rect key={y} x="68" y={y} width={y < 70 ? 48 : 56} height="3.5" rx="1.5" fill="var(--lagoon)" fillOpacity="0.12" />
      ))}

      {/* Trigger element */}
      <rect className="showcase-svg-path" x="66" y="108" width="78" height="26" rx="3"
        fill="var(--lagoon)" fillOpacity="0.1" stroke="var(--lagoon)" strokeOpacity="0.35" strokeWidth="0.8" />
      <text x="105" y="124" textAnchor="middle" fontSize="6" fill="var(--lagoon)" fontFamily="monospace">trigger element</text>

      {/* Viewport window */}
      <rect className="showcase-svg-path" x="60" y="55" width="90" height="76" rx="3"
        stroke="var(--palm)" strokeWidth="1.5" strokeOpacity="0.7" fill="var(--palm)" fillOpacity="0.04" strokeDasharray="3 2" />
      <text x="105" y="68" textAnchor="middle" fontSize="6" fill="var(--palm)" fontFamily="monospace" fillOpacity="0.8">viewport</text>

      {/* Start / end markers */}
      <path className="showcase-svg-path" d="M 58 108 L 152 108" stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="2.5 1.5" />
      <text x="156" y="111" fontSize="6" fill="var(--lagoon)" fontFamily="monospace">start</text>
      <path className="showcase-svg-path" d="M 58 134 L 152 134" stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2.5 1.5" />
      <text x="156" y="137" fontSize="6" fill="var(--lagoon)" fontFamily="monospace" fillOpacity="0.7">end</text>

      {/* Scrollbar */}
      <rect x="172" y="10" width="6" height="170" rx="3" fill="var(--lagoon)" fillOpacity="0.08" />
      <rect className="showcase-svg-path" x="172" y="38" width="6" height="58" rx="3" fill="url(#st-scrub)" fillOpacity="0.7" />
      <text x="183" y="68" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">scroll</text>

      {/* Pin spacer bracket */}
      <path className="showcase-svg-path" d="M 20 55 L 20 131" stroke="var(--palm)" strokeWidth="0.8" strokeOpacity="0.5" />
      <path className="showcase-svg-path" d="M 16 55 L 24 55" stroke="var(--palm)" strokeWidth="0.8" strokeOpacity="0.5" />
      <path className="showcase-svg-path" d="M 16 131 L 24 131" stroke="var(--palm)" strokeWidth="0.8" strokeOpacity="0.5" />
      <text x="14" y="94" textAnchor="middle" fontSize="5.5" fill="var(--palm)" fontFamily="monospace" fillOpacity="0.7"
        transform="rotate(-90 14 94)">pin spacer</text>

      <text x="105" y="185" textAnchor="middle" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">
        scrub: 1 — animation follows scroll
      </text>
    </svg>
  )
}
