import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { resources } from './-home-data'

gsap.registerPlugin(ScrollTrigger)

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
