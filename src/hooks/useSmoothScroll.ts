import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const onStop = () => lenis.stop()
    const onStart = () => lenis.start()
    window.addEventListener('lenis:stop', onStop)
    window.addEventListener('lenis:start', onStart)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('lenis:stop', onStop)
      window.removeEventListener('lenis:start', onStart)
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
