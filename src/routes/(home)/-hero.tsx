import { useRef, useEffect, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, DrawSVGPlugin } from 'gsap/all'
import { Link } from '@tanstack/react-router'
import { techPills } from './-home-data'
import { useHomeMotion } from './-use-home-motion'

gsap.registerPlugin(SplitText, DrawSVGPlugin)

const heroStats = [
  { value: '11', label: 'experiments' },
  { value: 'GSAP', label: 'animations' },
  { value: 'Three.js', label: '3D graphics' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function AmbientOrbs({
  orb1Ref,
  orb2Ref,
  orb3Ref,
}: {
  orb1Ref: RefObject<HTMLDivElement | null>
  orb2Ref: RefObject<HTMLDivElement | null>
  orb3Ref: RefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <div
        ref={orb1Ref}
        className="absolute rounded-full"
        style={{
          width: 720,
          height: 720,
          top: '-18%',
          left: '-14%',
          background: 'radial-gradient(circle, rgba(79,184,178,0.35) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          bottom: '-12%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(47,106,74,0.3) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: '55%',
          left: '40%',
          background: 'radial-gradient(circle, rgba(139,156,244,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
    </>
  )
}

function GhostNumber() {
  return (
    <div
      className="absolute select-none"
      style={{
        right: '-2%',
        top: '15%',
        fontFamily: 'Fraunces, Georgia, serif',
        fontSize: 'clamp(180px, 22vw, 340px)',
        fontWeight: 700,
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(79,184,178,0.12)',
      }}
    >
      11
    </div>
  )
}

const BRACKET_PATHS = [
  'M 4 16 L 4 4 L 16 4',
  'M 84 4 L 96 4 L 96 16',
  'M 96 84 L 96 96 L 84 96',
  'M 16 96 L 4 96 L 4 84',
]

function CornerBracketsSVG() {
  return (
    <svg
      className="hero-brackets absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {BRACKET_PATHS.map((d) => (
        <path
          key={d}
          className="hero-bracket-path"
          d={d}
          stroke="rgba(79,184,178,0.45)"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

function HeroStats() {
  return (
    <div className="flex items-center gap-6 mb-8 mt-20">
      {heroStats.map((stat, i) => (
        <div key={stat.label} className="contents">
          {i > 0 && (
            <div
              style={{
                width: 1,
                height: 28,
                background: 'var(--line)',
                flexShrink: 0,
              }}
            />
          )}
          <div className="hero-stat text-center">
            <div
              className="font-bold leading-none"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'var(--lagoon-deep)',
              }}
            >
              {stat.value}
            </div>
            <div
              className="text-[10px] uppercase mt-1"
              style={{
                color: 'var(--sea-ink-soft)',
                letterSpacing: '0.14em',
              }}
            >
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function HeroCTAs() {
  return (
    <div className="hero-cta-wrap mt-8 flex flex-wrap gap-3 justify-center">
      <Link
        to="/1-gsap-basics"
        className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm no-underline transition-all"
        style={{
          background: 'linear-gradient(135deg, #0a4a50 0%, #0d3d2e 100%)',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 18px rgba(50,143,151,0.35)',
        }}
      >
        Start with Experiment 01
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="group-hover:translate-x-1 transition-transform"
        >
          <path
            d="M3 7h8M8 4l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <a
        href="https://frontendmasters.com/courses/winning-websites/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm no-underline island-shell transition-all"
        style={{ color: 'var(--sea-ink)', textDecoration: 'none' }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: '#c84b31' }}
        />
        Frontend Masters
      </a>

      <a
        href="https://github.com/salah-mohamed0404/award-winning-marketing-websites-course"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm no-underline island-shell transition-all"
        style={{ color: 'var(--sea-ink)', textDecoration: 'none' }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        GitHub
      </a>
    </div>
  )
}

function TechPills() {
  return (
    <>
      {techPills.map((pill) => (
        <div
          key={pill.label}
          className="tech-pill absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none"
          style={{
            left: pill.x,
            top: pill.y,
            background: 'var(--chip-bg)',
            border: '1px solid var(--chip-line)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px rgba(23,58,64,0.08)',
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--lagoon)' }}
          />
          <span
            className="font-mono text-[11px] font-medium"
            style={{ color: 'var(--sea-ink-soft)' }}
          >
            {pill.label}
          </span>
        </div>
      ))}
    </>
  )
}

function HeroTitle() {
  return (
    <div className="text-center" style={{ perspective: '800px' }}>
      <h1
        className="display-title font-bold tracking-tight"
        style={{ fontSize: 'clamp(3.8rem, 11vw, 10rem)', lineHeight: 0.92 }}
      >
        <span
          className="hero-line-1 block overflow-hidden pb-1"
          style={{ color: 'var(--sea-ink)' }}
        >
          Award-Winning
        </span>
        <span className="hero-line-2 block overflow-hidden pb-2">Marketing Websites</span>
      </h1>
    </div>
  )
}

function HeroDivider() {
  return (
    <div
      className="hero-divider mt-8 origin-left"
      style={{
        width: 'min(480px, 80vw)',
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--lagoon), var(--palm), transparent)',
        opacity: 0.4,
      }}
    />
  )
}

function HeroSubheading() {
  return (
    <p
      className="hero-sub mt-6 text-center max-w-lg leading-relaxed"
      style={{
        color: 'var(--sea-ink-soft)',
        fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
      }}
    >
      11 hands-on experiments exploring GSAP, ScrollTrigger, Three.js, and advanced web animation
      — built alongside the Frontend Masters course.
    </p>
  )
}

function ScrollHint() {
  return (
    <div
      className="scroll-hint absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      style={{ color: 'var(--sea-ink-soft)', opacity: 0.45 }}
    >
      <span
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          fontWeight: 600,
        }}
      >
        SCROLL TO EXPLORE
      </span>
      <div
        style={{
          width: 1,
          height: 40,
          background: 'var(--line)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '40%',
            background: 'var(--lagoon)',
            animation: 'scrollLine 1.6s cubic-bezier(.4,0,.2,1) infinite',
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const { reducedMotion, isLowPower } = useHomeMotion()

  // Parallax orbs follow the mouse — disabled for low-power / reduced-motion
  useEffect(() => {
    if (isLowPower || reducedMotion) return
    const hero = heroRef.current
    if (!hero) return
    const onMouseMove = (e: MouseEvent) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      gsap.to(orb1Ref.current, { x: dx * 40, y: dy * 30, duration: 1.8, ease: 'power2.out' })
      gsap.to(orb2Ref.current, { x: dx * -30, y: dy * -25, duration: 2.2, ease: 'power2.out' })
      gsap.to(orb3Ref.current, { x: dx * 20, y: dy * 35, duration: 1.6, ease: 'power2.out' })
    }
    hero.addEventListener('mousemove', onMouseMove)
    return () => hero.removeEventListener('mousemove', onMouseMove)
  }, [reducedMotion, isLowPower])

  // Hero entrance animation
  useGSAP(
    () => {
      if (reducedMotion || isLowPower) {
        gsap.from(
          [
            '.hero-stat',
            '.hero-line-1',
            '.hero-line-2',
            '.hero-divider',
            '.hero-sub',
            '.hero-cta-wrap',
            '.scroll-hint',
          ],
          { autoAlpha: 0, duration: 0.6, stagger: 0.04, ease: 'power2.out' },
        )
        return
      }

      const title1 = SplitText.create('.hero-line-1', { type: 'chars' })
      const title2 = SplitText.create('.hero-line-2', { type: 'chars' })

      const mainTl = gsap
        .timeline({ delay: 0.15 })
        .from('.hero-stat', {
          autoAlpha: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        })
        .from(
          title1.chars,
          {
            autoAlpha: 0,
            yPercent: 120,
            rotationX: -90,
            transformOrigin: '50% 100% -20px',
            duration: 0.65,
            stagger: 0.022,
            ease: 'expo.out',
          },
          '-=0.3',
        )
        .from(
          title2.chars,
          {
            autoAlpha: 0,
            yPercent: 120,
            rotationX: -90,
            transformOrigin: '50% 100% -20px',
            duration: 0.65,
            stagger: 0.018,
            ease: 'expo.out',
          },
          '-=0.48',
        )
        .from('.hero-divider', { scaleX: 0, duration: 0.6, ease: 'expo.out' }, '-=0.2')
        .from('.hero-sub', { autoAlpha: 0, y: 18, duration: 0.55, ease: 'power3.out' }, '-=0.4')
        .from(
          '.hero-cta-wrap',
          { autoAlpha: 0, y: 14, duration: 0.5, ease: 'power3.out' },
          '-=0.35',
        )
        .from(
          '.tech-pill',
          { autoAlpha: 0, scale: 0.7, duration: 0.4, stagger: 0.06, ease: 'back.out(2)' },
          '-=0.4',
        )
        .from(
          '.scroll-hint',
          { autoAlpha: 0, y: -10, duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        )
        .from(
          '.hero-bracket-path',
          { drawSVG: '50% 50%', duration: 0.7, stagger: 0.1, ease: 'power2.out' },
          '-=0.1',
        )

      // Floating idle animation for pills
      const pillTweens: gsap.core.Tween[] = []
      gsap.utils.toArray<HTMLElement>('.tech-pill').forEach((pill, i) => {
        pillTweens.push(
          gsap.to(pill, {
            y: i % 2 === 0 ? -8 : 8,
            duration: 2 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
          }),
        )
      })

      return () => {
        mainTl.kill()
        pillTweens.forEach((t) => t.kill())
      }
    },
    {
      scope: heroRef,
      dependencies: [reducedMotion, isLowPower],
      revertOnUpdate: true,
    },
  )

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Ambient orbs + decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <AmbientOrbs orb1Ref={orb1Ref} orb2Ref={orb2Ref} orb3Ref={orb3Ref} />
        <GhostNumber />
        <CornerBracketsSVG />
      </div>

      <TechPills />
      <HeroStats />
      <HeroTitle />
      <HeroDivider />
      <HeroSubheading />
      <HeroCTAs />
      <ScrollHint />
    </section>
  )
}
