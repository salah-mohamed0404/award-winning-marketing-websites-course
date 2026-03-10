import type { ComponentType } from 'react'
import { TimelineDiagram } from './timeline'
import { SplitTextDiagram } from './split-text'
import { DrawSVGDiagram } from './draw-svg'
import { ScrollTriggerDiagram } from './scroll-trigger'
import { CustomCursorDiagram } from './custom-cursor'
import { ImageSequenceDiagram } from './image-sequence'
import { ThreeJsDiagram } from './three-js'

export const DIAGRAMS: ComponentType[] = [
  TimelineDiagram,
  SplitTextDiagram,
  DrawSVGDiagram,
  ScrollTriggerDiagram,
  CustomCursorDiagram,
  ImageSequenceDiagram,
  ThreeJsDiagram,
]
