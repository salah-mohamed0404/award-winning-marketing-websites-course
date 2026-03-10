import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from './-hero'
import { ExperimentsGrid, ResourcesSection, SiteFooter } from './-experiments'
import { PinnedShowcase } from './-pinned-showcase'
import { marqueeItems } from './-home-data'

export const Route = createFileRoute('/(home)/')({ component: HomePage })

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div
      className="relative overflow-hidden py-3 border-y"
      style={{ borderColor: 'var(--line)', background: 'var(--chip-bg)' }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-6 text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--sea-ink-soft)', letterSpacing: '0.1em' }}
          >
            <span
              style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--lagoon)', display: 'inline-block', flexShrink: 0 }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MarqueeStrip />
      <PinnedShowcase />
      <ExperimentsGrid />
      <ResourcesSection />
      <SiteFooter />
    </div>
  )
}
