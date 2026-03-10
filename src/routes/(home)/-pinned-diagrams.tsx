// SVG diagrams for the pinned technique showcase.
// Each component is self-contained and uses design-system CSS variables.
// Paths with className="showcase-svg-path" are animated via DrawSVG on panel entry.

// ─── Panel 0 — Multi-track Timeline ──────────────────────────────────────────

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

// ─── Panel 1 — SplitText character decomposition ──────────────────────────────

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
            {/* Entry arrow — yPercent 120→0 */}
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

// ─── Panel 2 — DrawSVG path drawing ───────────────────────────────────────────

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

// ─── Panel 3 — ScrollTrigger viewport model ───────────────────────────────────

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

// ─── Panel 4 — Custom Cursor lerp trail ───────────────────────────────────────

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

// ─── Panel 5 — Canvas Image Sequence ─────────────────────────────────────────

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

// ─── Panel 6 — Three.js 3D scene ─────────────────────────────────────────────

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

export const DIAGRAMS = [
  TimelineDiagram,
  SplitTextDiagram,
  DrawSVGDiagram,
  ScrollTriggerDiagram,
  CustomCursorDiagram,
  ImageSequenceDiagram,
  ThreeJsDiagram,
]
