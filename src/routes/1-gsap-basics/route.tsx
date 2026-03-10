import { createFileRoute } from '@tanstack/react-router'
import '@fontsource-variable/antonio'
import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export const Route = createFileRoute('/1-gsap-basics')({
  component: GsapBasics,
})

function GsapBasics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create('.title', { type: 'chars' })

      gsap.from(split.chars, {
        autoAlpha: 0,
        y: 200,
        duration: 0.4,
        stagger: 0.03,
        ease: 'circ.out',
      })
    },
    {
      scope: containerRef,
    },
  )

  return (
    <div
      className="bg-blue-300 text-black"
      style={{ fontFamily: "'Antonio Variable', sans-serif" }}
    >
      <div
        ref={containerRef}
        className="bg-blue-300 text-black flex h-screen items-end justify-left overflow-hidden"
      >
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          GSAP
          <br />
          tweens
        </h1>
      </div>
    </div>
  )
}
