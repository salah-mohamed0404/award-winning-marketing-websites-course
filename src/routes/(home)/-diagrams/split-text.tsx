const SPLIT_CHARS = ['A', 'N', 'I', 'M', 'A', 'T', 'E']
const CHAR_BOX_W = 28
const CHAR_BOX_H = 34
const CHAR_GAP = 4
const CHARS_TOTAL_W = SPLIT_CHARS.length * (CHAR_BOX_W + CHAR_GAP) - CHAR_GAP
const CHARS_START_X = (240 - CHARS_TOTAL_W) / 2

export function SplitTextDiagram() {
  return (
    <svg viewBox="0 0 240 130" fill="none" className="w-full max-w-90" aria-hidden>
      <defs>
        <linearGradient id="st-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--lagoon)" />
          <stop offset="100%" stopColor="var(--palm)" />
        </linearGradient>
      </defs>

      {SPLIT_CHARS.map((ch, i) => {
        const x = CHARS_START_X + i * (CHAR_BOX_W + CHAR_GAP)
        const delay = i * 0.022
        return (
          <g key={ch + i}>
            {/* Entry arrow */}
            <path className="showcase-svg-path"
              d={`M ${x + CHAR_BOX_W / 2} ${95 - i * 1.5} L ${x + CHAR_BOX_W / 2} 76`}
              stroke={`rgba(79,184,178,${0.3 + i * 0.08})`} strokeWidth="0.7" strokeDasharray="1.5 1.2" />
            <polygon className="showcase-svg-path"
              points={`${x + CHAR_BOX_W / 2 - 2.5},76 ${x + CHAR_BOX_W / 2 + 2.5},76 ${x + CHAR_BOX_W / 2},70`}
              fill={`rgba(79,184,178,${0.4 + i * 0.07})`} />

            {/* Character box */}
            <rect className="showcase-svg-path" x={x} y={34} width={CHAR_BOX_W} height={CHAR_BOX_H} rx="3"
              fill="var(--lagoon)" fillOpacity={0.08 + i * 0.015}
              stroke="var(--lagoon)" strokeOpacity={0.2 + i * 0.06} strokeWidth="0.7" />
            <text x={x + CHAR_BOX_W / 2} y={34 + CHAR_BOX_H * 0.68}
              textAnchor="middle" fontSize="14" fontWeight="700"
              fill="var(--lagoon)" fillOpacity={0.5 + i * 0.06} fontFamily="Fraunces, serif">
              {ch}
            </text>

            {/* Stagger delay label */}
            <text x={x + CHAR_BOX_W / 2} y="118"
              textAnchor="middle" fontSize="5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.65">
              +{delay.toFixed(3)}s
            </text>
          </g>
        )
      })}

      {/* rotationX arc on first char */}
      <path className="showcase-svg-path" d="M 28 34 A 10 6 0 0 1 56 34"
        stroke="var(--palm)" strokeWidth="0.9" strokeOpacity="0.6" strokeDasharray="2 1.5" />
      <text x="42" y="28" textAnchor="middle" fontSize="5" fill="var(--palm)" fontFamily="monospace" fillOpacity="0.75">rotX -90°</text>

      {/* transformOrigin baseline */}
      <line className="showcase-svg-path"
        x1={CHARS_START_X} y1="68" x2={CHARS_START_X + CHARS_TOTAL_W} y2="68"
        stroke="var(--lagoon)" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
      <text x="120" y="126" textAnchor="middle" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">
        transformOrigin: 50% 100%
      </text>
    </svg>
  )
}
