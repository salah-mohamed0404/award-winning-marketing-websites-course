import { createFileRoute } from '@tanstack/react-router'
import '#/fonts/lora.css'
import { DrawSVGPlugin, ScrollTrigger } from 'gsap/all'
import gsap from 'gsap'
import { Highlighted1, Highlighted2, Highlighted3 } from './-highlights'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { TitleSection } from './-title'

gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/4-scroll-trigger')({ component: ScrollTriggerPage })

export function ScrollTriggerPage() {
  return (
    <div
      className="bg-(--bg) text-(--font)"
      style={{
        fontFamily: "'Lora', serif",
        '--dark-green': '#1DB000',
        '--light-green': '#3CDE1B',
        '--font': '#3C3C3C',
        '--line': '#C6C6C6',
        '--bg': '#ffffff',
      } as React.CSSProperties}
    >
      <div
        className="fixed inset-0 w-full h-full bg-repeat opacity-10 mix-blend-hard-light z-90 pointer-events-none"
        style={{ backgroundImage: `url(/noise-overlay-300.png)` }}
      />
      <TitleSection />
      <DescriptionSection />
      <div className="h-screen" />
    </div>
  )
}

function DescriptionSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'h2',
          start: 'top center',
          end: 'bottom 10%',
          markers: true,
          toggleActions: 'play reset play reverse',
        },
      })

      tl.from('h2', {
        opacity: 0,
        duration: 1,
      })

      tl.from(
        'path',
        {
          drawSVG: 0,
          stagger: 0.3,
        },
        '-=0.4',
      )
    },
    {
      scope: containerRef,
    },
  )

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen p-10 flex items-stretch justify-stretch"
    >
      <div className="title-container border-2 border-(--line) p-10 w-full flex items-center justify-center">
        <h2 className="text-[6vh] leading-[1.4] text-center text-balance max-w-7xl">
          <ScrollTriggerWord /> enables anyone to create{' '}
          <span className="whitespace-nowrap">jaw-dropping</span>{' '}
          <ScrollBasedWord /> animations with minimal code. Infinitely flexible.
          Scrub, pin, snap, or just <TriggerAnythingWord /> scroll-related, even
          if it has nothing to do{' '}
          <span className="whitespace-nowrap">with animation.</span>
        </h2>
      </div>
    </div>
  )
}

const ScrollTriggerWord = () => (
  <span className="relative">
    <Highlighted1 className="absolute top-[0.2em] left-0 w-[6em] mix-blend-multiply" />
    ScrollTrigger
  </span>
)
const ScrollBasedWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted2 className="absolute bottom-0 left-0 mix-blend-multiply" />
    scroll-based
  </span>
)
const TriggerAnythingWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted3 className="absolute bottom-0 left-0 mix-blend-multiply" />
    trigger anything
  </span>
)
