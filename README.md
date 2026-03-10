# Award-Winning Marketing Websites

Code implementations following the Frontend Masters course [Award-Winning Marketing Websites](https://frontendmasters.com/courses/winning-websites/).

Built with Vite, React 19, TanStack Router, GSAP, Three.js, and Tailwind CSS v4.

## Experiments

| # | Experiment | Technique |
|---|-----------|-----------|
| 1 | GSAP Basics | GSAP tweening with SplitText character animation |
| 2 | CSS Version | Pure CSS animation equivalent of the GSAP basics |
| 3 | Timelines | Complex GSAP timeline with GSDevTools scrubber |
| 4 | ScrollTrigger | Scroll-triggered SVG DrawSVG animations |
| 5 | Follow Scroll | Scroll-pinned SVG logo path reveal |
| 6 | Variables | CSS custom properties reactive to mouse movement |
| 7 | Custom Cursor | Smooth cursor following with GSAP lerp |
| 8 | Image Sequence | Canvas-based scroll-synced 300-frame image sequence |
| 9 | Reduced Motion | Accessibility-first animation with prefers-reduced-motion |
| 10 | Device Profiling | GPU/battery-aware conditional WebGL rendering |
| 11 | Animating 3D Scenes | GSAP animating Three.js / React Three Fiber objects |

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open http://localhost:3000 to view the experiments.

## Tech Stack

- **Framework:** Vite + React 19 + TypeScript
- **Routing:** TanStack Router (file-based)
- **Animation:** GSAP 3 (SplitText, ScrollTrigger, DrawSVG, GSDevTools)
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Styling:** Tailwind CSS v4
- **Device Detection:** detect-gpu, react-device-detect
- **UI Controls:** Leva

## Resources

- https://easings.net/
- https://gsap.com/docs/v3/
- https://react-scan.com/
- https://www.npmjs.com/package/react-device-detect
- https://www.npmjs.com/package/detect-gpu
- https://github.com/pmndrs/leva
- https://www.npmjs.com/package/zustand
- https://www.npmjs.com/package/lenis
- https://tailwindcss.com/
