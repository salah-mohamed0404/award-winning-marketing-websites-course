const SEQUENCE_FRAMES = ['001', '075', '150', '225', '300']
const SEQ_FRAME_W = 36
const SEQ_FRAME_H = 46
const SEQ_GAP = 6
const SEQ_TOTAL_W = SEQUENCE_FRAMES.length * (SEQ_FRAME_W + SEQ_GAP) - SEQ_GAP
const SEQ_START_X = (280 - SEQ_TOTAL_W) / 2
const ACTIVE_FRAME = 2

export function ImageSequenceDiagram() {
  return (
    <svg viewBox="0 0 280 175" fill="none" className="w-full max-w-95" aria-hidden>
      <defs>
        <linearGradient id="seq-progress" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--lagoon)" />
          <stop offset="100%" stopColor="var(--palm)" />
        </linearGradient>
      </defs>

      {/* Film strip */}
      {SEQUENCE_FRAMES.map((num, i) => {
        const x = SEQ_START_X + i * (SEQ_FRAME_W + SEQ_GAP)
        const active = i === ACTIVE_FRAME
        const fillOpacity = active ? 0.18 : 0.06
        const strokeOpacity = active ? 0.8 : 0.2
        const strokeWidth = active ? 1.2 : 0.7
        return (
          <g key={num}>
            {/* Sprocket holes */}
            <rect x={x + 3} y="12" width="4" height="4" rx="1" fill="var(--lagoon)" fillOpacity="0.18" />
            <rect x={x + SEQ_FRAME_W - 7} y="12" width="4" height="4" rx="1" fill="var(--lagoon)" fillOpacity="0.18" />
            <rect x={x + 3} y={12 + SEQ_FRAME_H + 4} width="4" height="4" rx="1" fill="var(--lagoon)" fillOpacity="0.18" />
            <rect x={x + SEQ_FRAME_W - 7} y={12 + SEQ_FRAME_H + 4} width="4" height="4" rx="1" fill="var(--lagoon)" fillOpacity="0.18" />

            {/* Frame border */}
            <rect className="showcase-svg-path"
              x={x} y={20} width={SEQ_FRAME_W} height={SEQ_FRAME_H} rx="2"
              fill="var(--lagoon)" fillOpacity={fillOpacity}
              stroke="var(--lagoon)" strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} />

            {/* Image preview lines */}
            <rect x={x + 4} y={24} width={SEQ_FRAME_W - 8} height={active ? 20 : 14} rx="1.5"
              fill="var(--lagoon)" fillOpacity={active ? 0.3 : 0.1} />
            <rect x={x + 4} y={28 + (active ? 22 : 16)} width={(SEQ_FRAME_W - 8) * 0.6} height="3" rx="1"
              fill="var(--lagoon)" fillOpacity={active ? 0.2 : 0.07} />
            <rect x={x + 4} y={32 + (active ? 22 : 16)} width={(SEQ_FRAME_W - 8) * 0.4} height="2.5" rx="1"
              fill="var(--lagoon)" fillOpacity={active ? 0.15 : 0.05} />

            {/* Frame number */}
            <text x={x + SEQ_FRAME_W / 2} y={20 + SEQ_FRAME_H + 10}
              textAnchor="middle" fontSize="5.5"
              fill={active ? 'var(--lagoon)' : 'var(--sea-ink-soft)'}
              fontFamily="monospace" fillOpacity={active ? 0.9 : 0.45}>
              {num}
            </text>

            {/* Active frame pointer */}
            {active && (
              <>
                <path className="showcase-svg-path"
                  d={`M ${x + SEQ_FRAME_W / 2} ${20 - 8} L ${x + SEQ_FRAME_W / 2} ${20 - 2}`}
                  stroke="var(--lagoon)" strokeWidth="1" strokeOpacity="0.7" />
                <polygon
                  points={`${x + SEQ_FRAME_W / 2 - 3},${20 - 2} ${x + SEQ_FRAME_W / 2 + 3},${20 - 2} ${x + SEQ_FRAME_W / 2},${20 + 2}`}
                  fill="var(--lagoon)" fillOpacity="0.8" />
              </>
            )}
          </g>
        )
      })}

      {/* Canvas element */}
      <rect className="showcase-svg-path" x="96" y="84" width="88" height="50" rx="3"
        fill="var(--lagoon)" fillOpacity="0.06" stroke="var(--lagoon)" strokeOpacity="0.35" strokeWidth="1" />
      <text x="140" y="97" textAnchor="middle" fontSize="6" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">canvas</text>
      <rect x="104" y="100" width="72" height="26" rx="2" fill="var(--lagoon)" fillOpacity="0.12" />
      <text x="140" y="115" textAnchor="middle" fontSize="7" fill="var(--lagoon)" fontFamily="monospace" fillOpacity="0.7">
        frame 150
      </text>

      {/* Scroll progress bar */}
      <rect x="16" y="144" width="248" height="5.5" rx="2.5" fill="var(--lagoon)" fillOpacity="0.08" />
      <rect className="showcase-svg-path" x="16" y="144" width="124" height="5.5" rx="2.5" fill="url(#seq-progress)" fillOpacity="0.65" />
      <circle cx="140" cy="146.75" r="5" fill="var(--lagoon)" />
      <text x="16" y="160" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">scroll → 0</text>
      <text x="264" y="160" textAnchor="end" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.6">300 frames</text>

      <text x="140" y="172" textAnchor="middle" fontSize="5.5" fill="var(--sea-ink-soft)" fontFamily="monospace" fillOpacity="0.5">
        ctx.drawImage(frames[i], 0, 0)
      </text>
    </svg>
  )
}
