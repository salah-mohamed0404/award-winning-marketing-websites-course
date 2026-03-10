import { useEffect, useState } from 'react'
import { getGPUTier } from 'detect-gpu'
import { useBattery } from '@/hooks/use-battery'

export interface HomeMotionState {
  reducedMotion: boolean
  isLowPower: boolean
}

// Cache GPU tier at module level so it only runs once per session
let cachedGpuTier: number | null = null
let gpuTierPromise: Promise<number> | null = null

function fetchGpuTier(): Promise<number> {
  if (!gpuTierPromise) {
    gpuTierPromise = getGPUTier().then((gpu) => {
      cachedGpuTier = gpu.tier
      return gpu.tier
    })
  }
  return gpuTierPromise
}

export function useHomeMotion(): HomeMotionState {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [gpuTier, setGpuTier] = useState<number | null>(cachedGpuTier)
  const battery = useBattery()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setReducedMotion(query.matches)
    handleChange()
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (cachedGpuTier !== null) {
      setGpuTier(cachedGpuTier)
      return
    }
    fetchGpuTier().then((tier) => setGpuTier(tier))
  }, [])

  const batteryLow = battery.isSupported && battery.fetched && battery.level < 0.2
  const isLowPower = batteryLow || (typeof gpuTier === 'number' && gpuTier < 2)

  return { reducedMotion, isLowPower }
}
