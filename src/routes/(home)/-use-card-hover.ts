import { useCallback, type RefObject } from 'react'
import gsap from 'gsap'
import type { HomeMotionState } from './-use-home-motion'

// Store quickTo setters per card element
const quickToMap = new WeakMap<
  HTMLElement,
  {
    rotX: gsap.QuickToFunc
    rotY: gsap.QuickToFunc
    y: gsap.QuickToFunc
    scale: gsap.QuickToFunc
  }
>()

// Cache child element lookups per card
const childCache = new WeakMap<
  HTMLElement,
  { shadow: Element | null; arrow: Element | null; bar: Element | null }
>()

function getChildren(card: HTMLElement) {
  let refs = childCache.get(card)
  if (!refs) {
    refs = {
      shadow: card.querySelector('.exp-shadow'),
      arrow: card.querySelector('.exp-arrow'),
      bar: card.querySelector('.exp-accent-bar'),
    }
    childCache.set(card, refs)
  }
  return refs
}

function getQuickTo(card: HTMLElement) {
  let qt = quickToMap.get(card)
  if (!qt) {
    qt = {
      rotX: gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' }),
      rotY: gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' }),
      y: gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power2.out' }),
      scale: gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power2.out' }),
    }
    quickToMap.set(card, qt)
  }
  return qt
}

export function useCardHover(
  motion: HomeMotionState,
  entranceComplete: RefObject<boolean>,
) {
  const { reducedMotion, isLowPower } = motion

  const handleCardMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion || isLowPower || !entranceComplete.current) return
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      const qt = getQuickTo(card)
      qt.rotY(nx * 6)
      qt.rotX(ny * -4)
      qt.y(-6)
      qt.scale(1.025)
    },
    [reducedMotion, isLowPower],
  )

  const handleCardEnter = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion || isLowPower || !entranceComplete.current) return
      const card = e.currentTarget
      const { shadow, arrow, bar } = getChildren(card)
      if (shadow) {
        gsap.to(shadow, { opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      }
      if (arrow) {
        gsap.to(arrow, {
          autoAlpha: 1,
          x: 0,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
      if (bar) {
        gsap.to(bar, { scaleX: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' })
      }
    },
    [reducedMotion, isLowPower],
  )

  const handleCardLeave = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion || isLowPower || !entranceComplete.current) return
      const card = e.currentTarget
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      const { shadow, arrow, bar } = getChildren(card)
      if (shadow) {
        gsap.to(shadow, { opacity: 0, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' })
      }
      if (arrow) {
        gsap.to(arrow, {
          autoAlpha: 0,
          x: -12,
          duration: 0.25,
          ease: 'power2.in',
          overwrite: 'auto',
        })
      }
      if (bar) {
        gsap.to(bar, { scaleX: 0, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' })
      }
    },
    [reducedMotion, isLowPower],
  )

  return { handleCardMove, handleCardEnter, handleCardLeave }
}
