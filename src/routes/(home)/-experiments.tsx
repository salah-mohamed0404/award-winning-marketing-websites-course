import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin, ScrollTrigger, SplitText } from 'gsap/all'
import { Link } from '@tanstack/react-router'
import { experiments, resources } from './-home-data'
import { useHomeMotion } from './-use-home-motion'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText)

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

// Store quickTo setters per card element
const quickToMap = new WeakMap<
  HTMLElement,
  {
    rotX: gsap.QuickToFunc
    rotY: gsap.QuickToFunc
    y: gsap.QuickToFunc
    scale: gsap.QuickToFunc
  }
>()

// Cache child element lookups per card
const childCache = new WeakMap<
  HTMLElement,
  { shadow: Element | null; arrow: Element | null; bar: Element | null }
>()

function getChildren(card: HTMLElement) {
  let refs = childCache.get(card)
  if (!refs) {
    refs = {
      shadow: card.querySelector('.exp-shadow'),
      arrow: card.querySelector('.exp-arrow'),
      bar: card.querySelector('.exp-accent-bar'),
    }
    childCache.set(card, refs)
  }
  return refs
}

function getQuickTo(card: HTMLElement) {
  let qt = quickToMap.get(card)
  if (!qt) {
    qt = {
      rotX: gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' }),
      rotY: gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' }),
      y: gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power2.out' }),
      scale: gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power2.out' }),
    }
    quickToMap.set(card, qt)
  }
  return qt
}

export function ExperimentsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const entranceComplete = useRef(false)
  const { reducedMotion, isLowPower } = useHomeMotion()

  // Magnetic hover — card tilts toward cursor via quickTo (no tween pile-up)
  const handleCardMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion || isLowPower || !entranceComplete.current) return
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      const qt = getQuickTo(card)
      qt.rotY(nx * 6)
      qt.rotX(ny * -4)
      qt.y(-6)
      qt.scale(1.025)
    },
    [reducedMotion, isLowPower],
  )

  const handleCardEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion || isLowPower || !entranceComplete.current) return
      const card = e.currentTarget
      const { shadow, arrow, bar } = getChildren(card)
      if (shadow) {
        gsap.to(shadow, { opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      }
      if (arrow) {
        gsap.to(arrow, {
          autoAlpha: 1,
          x: 0,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
      if (bar) {
        gsap.to(bar, { scaleX: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' })
      }
    },
    [reducedMotion, isLowPower],
  )

  const handleCardLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion || isLowPower || !entranceComplete.current) return
      const card = e.currentTarget
      // Smooth spring-back for transform props
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      // Shadow layer fades out
      const { shadow, arrow, bar } = getChildren(card)
      if (shadow) {
        gsap.to(shadow, { opacity: 0, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' })
      }
      if (arrow) {
        gsap.to(arrow, {
          autoAlpha: 0,
          x: -12,
          duration: 0.25,
          ease: 'power2.in',
          overwrite: 'auto',
        })
      }
      if (bar) {
        gsap.to(bar, { scaleX: 0, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' })
      }
    },
    [reducedMotion, isLowPower],
  )

  useGSAP(
    () => {
      // Reduced-motion / low-power: simple opacity fades
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

      // A. Kicker — blur-to-sharp + letter-spacing cinematic reveal
      headingTl.from('.section-heading .island-kicker', {
        autoAlpha: 0,
        y: 20,
        letterSpacing: '0.5em',
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'expo.out',
      })

      // B. SplitText — chars cascade with blur dissolve + 3D rotation
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

      // C. DrawSVG wavy underline sweeps in
      headingTl.from(
        '.underline-path',
        { drawSVG: 0, duration: 1, ease: 'power3.inOut' },
        '-=0.5',
      )

      // --- Card entrances — diagonal wave with layered reveals ---
      entranceComplete.current = false
      const cards = gsap.utils.toArray<HTMLElement>('.exp-card')

      // Set initial states
      gsap.set('.exp-arrow', { autoAlpha: 0, x: -12 })
      gsap.set('.exp-accent-bar', { scaleX: 0 })

      // Cards enter with clip-path wipe + 3D transform
      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        onComplete: () => { entranceComplete.current = true },
      })

      cards.forEach((card, i) => {
        // Compute grid position for diagonal stagger (row * cols + col)
        const parent = card.parentElement
        const cols = Math.max(1, Math.round((parent ? parent.clientWidth : 360) / 360))
        const row = Math.floor(i / cols)
        const col = i % cols
        const diagonalDelay = (row + col) * 0.1

        cardTl.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 80,
            rotationX: -12,
            scale: 0.88,
            filter: 'blur(6px)',
          },
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

        // Inner content slides up slightly after card shell appears (layered reveal)
        const inner = card.querySelector('.exp-inner')
        if (inner) {
          cardTl.from(
            inner,
            { autoAlpha: 0, y: 16, duration: 0.5, ease: 'power3.out' },
            diagonalDelay + 0.15,
          )
        }

        // Accent bar sweeps across top edge
        const bar = card.querySelector('.exp-accent-bar')
        if (bar) {
          cardTl.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'expo.out' },
            diagonalDelay + 0.25,
          )
          // Then fade the bar back out
          cardTl.to(bar, { scaleX: 0, duration: 0.4, ease: 'power2.in' }, diagonalDelay + 0.9)
        }

        // Brief accent glow on arrival — uses a wrapper so it doesn't conflict with hover boxShadow
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
          {/* DrawSVG wavy underline */}
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
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            transformStyle: 'preserve-3d',
          }}
        >
          {experiments.map((exp) => (
            <Link
              key={exp.url}
              to={exp.url}
              data-accent={exp.accent}
              onMouseMove={handleCardMove}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
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
                style={{
                  boxShadow: `0 12px 32px ${exp.accent}30`,
                  opacity: 0,
                }}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export function ResourcesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.res-intro > *', {
        scrollTrigger: { trigger: '.resources-panel', start: 'top 80%' },
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.13,
        ease: 'power3.out',
      })
      gsap.from('.res-row', {
        scrollTrigger: { trigger: '.resources-list', start: 'top 85%' },
        autoAlpha: 0,
        x: 36,
        duration: 0.55,
        stagger: 0.065,
        ease: 'power3.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="page-wrap">
        <div className="resources-panel">
          {/* Decorative background glyph */}
          <span className="resources-deco" aria-hidden="true">
            ✦
          </span>

          {/* Left: editorial intro */}
          <div className="res-intro">
            <p className="island-kicker" style={{ color: 'var(--lagoon)' }}>
              Further Reading
            </p>
            <h2 className="display-title res-title">The&nbsp;Toolkit</h2>
            <p className="res-desc">
              Libraries, references &amp; tools that power every experiment in this course.
            </p>
            <div className="res-badge">
              <span className="res-badge-num">{resources.length}</span>
              <span className="res-badge-label">
                hand-picked
                <br />
                resources
              </span>
            </div>
          </div>

          {/* Right: numbered rows */}
          <ol className="resources-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {resources.map((r, i) => (
              <li key={r.url} className="res-row">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="res-link"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="res-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="res-label">{r.label}</span>
                  <span className="res-arrow-icon">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 13L13 3M13 3H6M13 3V10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer
      className="site-footer py-8 px-6 text-center text-sm"
      style={{ color: 'var(--sea-ink-soft)' }}
    >
      Built following the{' '}
      <a
        href="https://frontendmasters.com/courses/winning-websites/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Frontend Masters — Award-Winning Marketing Websites
      </a>{' '}
      course
    </footer>
  )
}
