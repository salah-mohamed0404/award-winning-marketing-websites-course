import { useRef, useState, useEffect, memo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin, ScrollTrigger } from 'gsap/all'
import { useHomeMotion } from './-use-home-motion'
import { PANELS } from './-pinned-data'
import { DIAGRAMS } from './-pinned-diagrams'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

// ─── Full motion variant ───────────────────────────────────────────────────────

// Memoize diagrams so hidden ones don't re-render
const MemoizedDiagrams = DIAGRAMS.map((D, i) => memo(D))

function PinnedShowcaseFull() {
  const outerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const activePanelRef = useRef(0)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activePanel, setActivePanel] = useState(0)
  const n = PANELS.length

  useGSAP(
    () => {
      // Scrub a single value 0→1 across the full scroll distance
      gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      }).to(progressRef, { current: 1, ease: 'none' })

      // Map progress to panel index without triggering 60fps re-renders
      const tick = () => {
        const next = Math.min(Math.floor(progressRef.current * n), n - 1)
        if (next !== activePanelRef.current) {
          activePanelRef.current = next
          setActivePanel(next)
        }
      }
      gsap.ticker.add(tick)
      return () => gsap.ticker.remove(tick)
    },
    { scope: outerRef },
  )

  // Animate panels in/out using cached refs
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === activePanel) {
        gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
        gsap.from(el.querySelectorAll('.showcase-svg-path'), {
          drawSVG: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: true,
        })
      } else {
        gsap.to(el, { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' })
      }
    })
  }, [activePanel])

  return (
    <div ref={outerRef} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Section label */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <p className="island-kicker text-center" style={{ color: 'var(--kicker)', fontSize: '0.68rem' }}>
            Core Techniques
          </p>
        </div>

        {/* Progress indicator */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-10"
          role="tablist"
          aria-label="Technique panels"
        >
          {PANELS.map((panel, i) => (
            <div
              key={panel.kicker}
              role="tab"
              aria-selected={i === activePanel}
              aria-label={panel.title}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === activePanel ? 7 : 5,
                height: i === activePanel ? 7 : 5,
                background: i === activePanel ? panel.accent : 'rgba(79,184,178,0.25)',
              }}
            />
          ))}
          <span className="mt-1 font-mono" style={{ fontSize: '0.6rem', color: 'var(--sea-ink-soft)', opacity: 0.5 }}>
            {String(activePanel + 1).padStart(2, '0')}/{n}
          </span>
        </div>

        {/* Panels — stacked absolutely, shown one at a time */}
        {PANELS.map((panel, i) => {
          const Diagram = MemoizedDiagrams[i]
          // Only render diagram for active and adjacent panels
          const shouldRenderDiagram = Math.abs(i - activePanel) <= 1
          return (
            <div
              key={panel.kicker}
              ref={(el) => { panelRefs.current[i] = el }}
              role="tabpanel"
              aria-label={panel.title}
              className={`showcase-panel-${i} absolute inset-0 flex items-center justify-center px-6`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="page-wrap w-full">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                  <div>
                    <p className="island-kicker mb-3" style={{ color: panel.accent, fontSize: '0.7rem' }}>
                      {panel.kicker}
                    </p>
                    <h2
                      className="display-title font-bold mb-4 leading-tight"
                      style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', color: 'var(--sea-ink)' }}
                    >
                      {panel.title}
                    </h2>
                    <p className="leading-relaxed mb-6"
                      style={{ color: 'var(--sea-ink-soft)', fontSize: '1rem', maxWidth: '40ch' }}>
                      {panel.desc}
                    </p>
                    <span className="inline-block font-mono text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: `${panel.accent}14`,
                        color: panel.accent,
                        border: `1px solid ${panel.accent}30`,
                      }}>
                      {panel.tag}
                    </span>
                  </div>

                  <div className="flex items-center justify-center min-h-50">
                    {shouldRenderDiagram && <Diagram />}
                  </div>

                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

// ─── Reduced-motion / low-power fallback ─────────────────────────────────────

function PinnedShowcaseStacked() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.showcase-stack-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="page-wrap">
        <p className="island-kicker mb-8 text-center" style={{ color: 'var(--kicker)' }}>
          Core Techniques
        </p>
        <div className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%),1fr))' }}>
          {PANELS.map((panel, i) => {
            const Diagram = DIAGRAMS[i]
            return (
              <div key={panel.kicker} className="showcase-stack-item island-shell rounded-2xl p-7 border"
                style={{ borderColor: 'var(--line)' }}>
                <p className="island-kicker mb-2" style={{ color: panel.accent, fontSize: '0.68rem' }}>
                  {panel.kicker}
                </p>
                <h3 className="display-title font-bold mb-2"
                  style={{ fontSize: '1.25rem', color: 'var(--sea-ink)' }}>
                  {panel.title}
                </h3>
                <p style={{ color: 'var(--sea-ink-soft)', fontSize: '0.86rem', lineHeight: 1.65 }}>
                  {panel.desc}
                </p>
                <div className="mt-5 flex justify-center">
                  <Diagram />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Public export ────────────────────────────────────────────────────────────

export function PinnedShowcase() {
  const { reducedMotion, isLowPower } = useHomeMotion()
  return reducedMotion || isLowPower ? <PinnedShowcaseStacked /> : <PinnedShowcaseFull />
}
