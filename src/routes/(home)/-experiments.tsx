import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin, ScrollTrigger, SplitText } from 'gsap/all'
import { Link } from '@tanstack/react-router'
import { experiments } from './-home-data'
import { useHomeMotion } from './-use-home-motion'
import { useCardHover } from './-use-card-hover'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText)

// ─── Sub-components ──────────────────────────────────────────────────────────

const ArrowIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path
      d="M3 7h8M8 4l3 3-3 3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function SectionHeading() {
  return (
    <div className="section-heading mb-14">
      <p className="island-kicker mb-3" style={{ color: 'var(--kicker)' }}>
        The Experiments
      </p>
      <h2
        className="experiments-title display-title font-bold"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--sea-ink)',
          perspective: '600px',
        }}
      >
        <span className="block overflow-hidden pb-1">11 Techniques to Master</span>
      </h2>
      <WavyUnderline />
    </div>
  )
}

function WavyUnderline() {
  return (
    <div className="mt-3" style={{ width: 'min(380px, 100%)' }}>
      <svg viewBox="0 0 380 18" fill="none" className="w-full overflow-visible">
        <defs>
          <linearGradient
            id="underline-grad"
            x1="0"
            y1="0"
            x2="380"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--lagoon)" />
            <stop offset="50%" stopColor="var(--palm)" />
            <stop offset="100%" stopColor="var(--lagoon)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          className="underline-path"
          d="M 2 9 C 40 3, 80 15, 120 9 C 160 3, 200 15, 240 9 C 280 3, 320 15, 360 9 C 368 7, 374 8, 378 9"
          stroke="url(#underline-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

function ExperimentCard({
  exp,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: {
  exp: (typeof experiments)[number]
  onMouseMove: React.MouseEventHandler<HTMLAnchorElement>
  onMouseEnter: React.MouseEventHandler<HTMLAnchorElement>
  onMouseLeave: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <Link
      to={exp.url}
      data-accent={exp.accent}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="exp-card feature-card island-shell rounded-2xl no-underline block group border relative"
      style={{
        borderColor: 'var(--line)',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Shadow layer — opacity-only animation, fully GPU-composited */}
      <div
        className="exp-shadow absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 12px 32px ${exp.accent}30`, opacity: 0 }}
      />
      {/* Accent bar — clips to card's rounded top edge */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ height: 2, borderRadius: '1rem 1rem 0 0' }}
      >
        <div
          className="exp-accent-bar w-full h-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${exp.accent}, transparent)`,
            transformOrigin: 'center center',
          }}
        />
      </div>
      <div className="exp-inner p-6">
        <div className="flex items-start justify-between mb-4">
          <span
            className="font-mono font-bold text-xs tracking-widest"
            style={{ color: exp.accent, opacity: 0.9 }}
          >
            {exp.num}
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-mono"
            style={{
              background: `${exp.accent}18`,
              color: exp.accent,
              border: `1px solid ${exp.accent}30`,
            }}
          >
            {exp.tech}
          </span>
        </div>

        <h3
          className="font-bold mb-2 group-hover:text-(--lagoon-deep) transition-colors"
          style={{ fontSize: '1.15rem', color: 'var(--sea-ink)' }}
        >
          {exp.name}
        </h3>
        <p style={{ color: 'var(--sea-ink-soft)', fontSize: '0.88rem', lineHeight: 1.6 }}>
          {exp.desc}
        </p>

        <div
          className="exp-arrow mt-4 flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: 'var(--lagoon-deep)' }}
        >
          Open experiment
          <ArrowIcon size={12} />
        </div>
      </div>
    </Link>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ExperimentsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const entranceComplete = useRef(false)
  const motion = useHomeMotion()
  const { reducedMotion, isLowPower } = motion
  const { handleCardMove, handleCardEnter, handleCardLeave } = useCardHover(motion, entranceComplete)

  useGSAP(
    () => {
      if (reducedMotion || isLowPower) {
        gsap.from('.section-heading > *', { autoAlpha: 0, duration: 0.5, stagger: 0.05 })
        gsap.from('.exp-card', { autoAlpha: 0, duration: 0.4, stagger: 0.03 })
        entranceComplete.current = true
        return
      }

      // --- Heading entrance timeline ---
      const headingTl = gsap.timeline({
        scrollTrigger: { trigger: '.section-heading', start: 'top 85%' },
      })

      headingTl.from('.section-heading .island-kicker', {
        autoAlpha: 0,
        y: 20,
        letterSpacing: '0.5em',
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'expo.out',
      })

      const split = SplitText.create('.experiments-title', { type: 'chars' })
      headingTl.from(
        split.chars,
        {
          autoAlpha: 0,
          yPercent: 100,
          rotationX: -90,
          scale: 0.6,
          filter: 'blur(12px)',
          transformOrigin: '50% 100% -30px',
          duration: 0.85,
          stagger: { amount: 0.5, from: 'center', ease: 'power2.in' },
          ease: 'expo.out',
        },
        '-=0.4',
      )

      headingTl.from(
        '.underline-path',
        { drawSVG: 0, duration: 1, ease: 'power3.inOut' },
        '-=0.5',
      )

      // --- Card entrances — diagonal wave with layered reveals ---
      entranceComplete.current = false
      const cards = gsap.utils.toArray<HTMLElement>('.exp-card')

      gsap.set('.exp-arrow', { autoAlpha: 0, x: -12 })
      gsap.set('.exp-accent-bar', { scaleX: 0 })

      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        onComplete: () => { entranceComplete.current = true },
      })

      cards.forEach((card, i) => {
        const parent = card.parentElement
        const cols = Math.max(1, Math.round((parent ? parent.clientWidth : 360) / 360))
        const row = Math.floor(i / cols)
        const col = i % cols
        const diagonalDelay = (row + col) * 0.1

        cardTl.fromTo(
          card,
          { autoAlpha: 0, y: 80, rotationX: -12, scale: 0.88, filter: 'blur(6px)' },
          {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            filter: 'blur(0px)',
            transformOrigin: '50% 100%',
            duration: 0.9,
            ease: 'expo.out',
          },
          diagonalDelay,
        )

        const inner = card.querySelector('.exp-inner')
        if (inner) {
          cardTl.from(
            inner,
            { autoAlpha: 0, y: 16, duration: 0.5, ease: 'power3.out' },
            diagonalDelay + 0.15,
          )
        }

        const bar = card.querySelector('.exp-accent-bar')
        if (bar) {
          cardTl.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'expo.out' },
            diagonalDelay + 0.25,
          )
          cardTl.to(bar, { scaleX: 0, duration: 0.4, ease: 'power2.in' }, diagonalDelay + 0.9)
        }

        const glowEl = card.querySelector('.exp-accent-bar')
        if (glowEl) {
          cardTl.fromTo(
            glowEl,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: 'power2.out' },
            diagonalDelay + 0.2,
          )
        }
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion, isLowPower], revertOnUpdate: true },
  )

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ perspective: '1200px' }}>
      <div className="page-wrap">
        <SectionHeading />
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            transformStyle: 'preserve-3d',
          }}
        >
          {experiments.map((exp) => (
            <ExperimentCard
              key={exp.url}
              exp={exp}
              onMouseMove={handleCardMove}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
