import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin, ScrollTrigger } from 'gsap/all'
import { Link } from '@tanstack/react-router'
import { experiments, resources } from './-home-data'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

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

export function ExperimentsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setReducedMotion(query.matches)
    handleChange()
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useGSAP(
    () => {
      gsap.from('.section-heading', {
        scrollTrigger: { trigger: '.section-heading', start: 'top 85%' },
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
      })
      gsap.from('.exp-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        autoAlpha: 0,
        y: 44,
        duration: 0.6,
        stagger: 0.055,
        ease: 'power3.out',
      })

      // DrawSVG wavy underline under heading
      if (!reducedMotion) {
        gsap.from('.underline-path', {
          scrollTrigger: { trigger: '.section-heading', start: 'top 85%' },
          drawSVG: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.3,
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="page-wrap">
        <div className="section-heading mb-14">
          <p className="island-kicker mb-3" style={{ color: 'var(--kicker)' }}>
            The Experiments
          </p>
          <h2
            className="display-title font-bold"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--sea-ink)' }}
          >
            11 Techniques to Master
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
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))' }}
        >
          {experiments.map((exp) => (
            <Link
              key={exp.url}
              to={exp.url}
              className="exp-card feature-card island-shell rounded-2xl p-6 no-underline block group border"
              style={{ borderColor: 'var(--line)', textDecoration: 'none', color: 'inherit' }}
            >
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
                className="mt-4 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--lagoon-deep)' }}
              >
                Open experiment
                <ArrowIcon size={12} />
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
