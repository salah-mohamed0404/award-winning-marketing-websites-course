export interface ShowcasePanel {
  title: string
  kicker: string
  desc: string
  tag: string
  accent: string
}

export const PANELS: ShowcasePanel[] = [
  {
    title: 'GSAP Timelines',
    kicker: 'Technique 01',
    desc: 'Orchestrate multi-phase sequences with overlapping tweens, labels, and GSDevTools scrubbing for frame-perfect control.',
    tag: 'gsap.timeline()',
    accent: '#f4a460',
  },
  {
    title: 'SplitText',
    kicker: 'Technique 02',
    desc: 'Decompose headlines into individual characters, words, or lines — then animate each fragment with staggered, physics-driven entrance effects.',
    tag: 'SplitText · stagger',
    accent: '#4fb8b2',
  },
  {
    title: 'DrawSVG',
    kicker: 'Technique 03',
    desc: 'Animate stroke-dashoffset to make SVG paths appear to draw themselves — synchronized to scroll or triggered on entry.',
    tag: 'DrawSVGPlugin · scrub',
    accent: '#5cb85c',
  },
  {
    title: 'ScrollTrigger',
    kicker: 'Technique 04',
    desc: 'Pin sections, scrub any GSAP animation to exact scroll position, and trigger effects precisely as elements enter and leave the viewport.',
    tag: 'pin · scrub · markers',
    accent: '#e8a0bf',
  },
  {
    title: 'Custom Cursor',
    kicker: 'Technique 05',
    desc: 'Replace the native cursor with a soft blob that lerp-interpolates toward the pointer on every GSAP ticker tick — silky at any framerate.',
    tag: 'gsap.ticker · lerp',
    accent: '#c9a8e0',
  },
  {
    title: 'Canvas Image Sequence',
    kicker: 'Technique 06',
    desc: 'Pre-load hundreds of frames into memory, then paint the correct frame to a Canvas element in perfect lock-step with scroll progress.',
    tag: 'Canvas 2D · 300 frames',
    accent: '#60d7cf',
  },
  {
    title: '3D Animation',
    kicker: 'Technique 07',
    desc: 'GSAP drives position, rotation, and light intensity directly on Three.js objects — combining timeline precision with 3D scene control.',
    tag: 'React Three Fiber · GSAP',
    accent: '#4db8b8',
  },
]
