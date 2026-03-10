import { Link, useRouterState } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import experimentsData from '../../../experiments.json'

const experiments = experimentsData.map((e) => ({
  ...e,
  short: e.name.replace(/^\d+\s+/, ''),
}))

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Slide-in on mount
  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out', delay: 0.4 },
    )
  }, [])

  // Track scroll for style change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentExp = experiments.find((e) => e.url === pathname)
  const isHome = pathname === '/'

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] px-4 pt-4"
      style={{ opacity: 0 }}
    >
      <nav
        className="mx-auto flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300"
        style={{
          maxWidth: 900,
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(10px)',
          background: 'var(--header-bg)',
          border: '1px solid var(--line)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(23,58,64,0.12), 0 1px 0 rgba(255,255,255,0.7) inset'
            : '0 2px 12px rgba(23,58,64,0.06)',
        }}
      >
        {/* Left — Home / breadcrumb */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline group"
          style={{ textDecoration: 'none' }}
        >
          {/* Animated logo mark */}
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{
              width: 28,
              height: 28,
              background: isHome
                ? 'linear-gradient(135deg, var(--lagoon) 0%, var(--palm) 100%)'
                : 'var(--chip-bg)',
              border: '1px solid var(--line)',
              transition: 'all 0.2s ease',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ color: isHome ? 'white' : 'var(--lagoon-deep)' }}
            >
              <path
                d="M2 10L7 3l5 7H2z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
                fill={isHome ? 'currentColor' : 'none'}
                fillOpacity={0.3}
              />
            </svg>
          </div>

          {/* Title or breadcrumb */}
          <div className="flex items-center gap-1.5">
            <span
              className="font-semibold text-sm"
              style={{ color: 'var(--sea-ink)' }}
            >
              {isHome ? (
                <span style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                  Award-Winning Course
                </span>
              ) : (
                <span style={{ color: 'var(--sea-ink-soft)', fontWeight: 400 }}>
                  Home
                </span>
              )}
            </span>

            {currentExp && (
              <>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  style={{ color: 'var(--line)', flexShrink: 0 }}
                >
                  <path
                    d="M3 2l4 3-4 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--sea-ink)' }}
                >
                  {currentExp.short}
                </span>
              </>
            )}
          </div>
        </Link>

        {/* Right — Experiments dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all outline-none"
              style={{
                color: 'var(--sea-ink-soft)',
                background: 'var(--chip-bg)',
                border: '1px solid var(--chip-line)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = 'var(--sea-ink)'
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'var(--lagoon)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color =
                  'var(--sea-ink-soft)'
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'var(--chip-line)'
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ color: 'var(--lagoon-deep)' }}
              >
                <rect
                  x="1"
                  y="2"
                  width="12"
                  height="1.5"
                  rx="0.75"
                  fill="currentColor"
                />
                <rect
                  x="1"
                  y="6.25"
                  width="9"
                  height="1.5"
                  rx="0.75"
                  fill="currentColor"
                />
                <rect
                  x="1"
                  y="10.5"
                  width="11"
                  height="1.5"
                  rx="0.75"
                  fill="currentColor"
                />
              </svg>
              Experiments
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{ color: 'var(--sea-ink-soft)' }}
              >
                <path
                  d="M2 3.5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 rounded-xl overflow-hidden p-1"
            style={{
              background: 'var(--surface-strong)',
              border: '1px solid var(--line)',
              backdropFilter: 'blur(16px)',
              boxShadow:
                '0 16px 40px rgba(23,58,64,0.15), 0 1px 0 rgba(255,255,255,0.8) inset',
            }}
          >
            {/* Home link */}
            <DropdownMenuItem asChild>
              <Link
                to="/"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm no-underline cursor-pointer"
                style={{
                  color:
                    pathname === '/'
                      ? 'var(--lagoon-deep)'
                      : 'var(--sea-ink-soft)',
                  background:
                    pathname === '/' ? 'rgba(79,184,178,0.1)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: pathname === '/' ? 600 : 400,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background:
                      pathname === '/' ? 'var(--lagoon)' : 'var(--line)',
                    flexShrink: 0,
                  }}
                />
                Home
              </Link>
            </DropdownMenuItem>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: 'var(--line)',
                margin: '4px 0',
              }}
            />

            {/* Experiments */}
            {experiments.map((experiment) => {
              const isActive = pathname === experiment.url
              return (
                <DropdownMenuItem key={experiment.url} asChild>
                  <Link
                    to={experiment.url}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm no-underline cursor-pointer"
                    style={{
                      color: isActive
                        ? 'var(--lagoon-deep)'
                        : 'var(--sea-ink-soft)',
                      background: isActive
                        ? 'rgba(79,184,178,0.1)'
                        : 'transparent',
                      textDecoration: 'none',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <span
                      className="font-mono text-[10px] shrink-0"
                      style={{
                        color: isActive
                          ? 'var(--lagoon)'
                          : 'var(--sea-ink-soft)',
                        opacity: 0.7,
                        minWidth: 20,
                      }}
                    >
                      {experiment.url
                        .split('/')[1]
                        .split('-')[0]
                        .padStart(2, '0')}
                    </span>
                    {experiment.short}
                    {isActive && (
                      <span
                        className="ml-auto"
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: 'var(--lagoon)',
                          display: 'inline-block',
                        }}
                      />
                    )}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
