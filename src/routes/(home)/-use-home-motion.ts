import { useEffect, useState } from 'react'
import { getGPUTier } from 'detect-gpu'
import { useBattery } from '@/hooks/use-battery'

export interface HomeMotionState {
  reducedMotion: boolean
  isLowPower: boolean
}

export function useHomeMotion(): HomeMotionState {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [gpuTier, setGpuTier] = useState<number | null>(null)
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
    getGPUTier().then((gpu) => setGpuTier(gpu.tier))
  }, [])

  const batteryLow = battery.isSupported && battery.fetched && battery.level < 0.2
  const isLowPower = batteryLow || (typeof gpuTier === 'number' && gpuTier < 2)

  return { reducedMotion, isLowPower }
}
