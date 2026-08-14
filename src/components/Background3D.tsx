import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'

type RuntimeApplication = Application & {
  renderMode: 'auto' | 'manual' | 'continuous' | 'on-demand'
}

export function Background3D() {
  const splineAppRef = useRef<Application | null>(null)
  const splineSceneRef = useRef<HTMLDivElement | null>(null)

  // Detect mobile (coarse pointer) once, outside effects
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  const applyResponsiveZoom = () => {
    const width = window.innerWidth
    const zoom = width <= 640 ? 0.58 : width <= 960 ? 0.72 : 0.86

    try {
      splineAppRef.current?.setZoom(zoom)
    } catch {
      // Keep the authored Spline camera if responsive zoom is unavailable.
    }
  }

  // Debounced resize handler — avoids thrashing during orientation changes
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        applyResponsiveZoom()
      }, 200)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    applyResponsiveZoom()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [])

  // Parallax effect — desktop only (pointer:fine)
  useEffect(() => {
    const scene = splineSceneRef.current
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Skip parallax on coarse-pointer devices — saves event-loop cost on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    let active = true
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const clamp = (value: number) => Math.max(-1, Math.min(1, value))

    const applyParallax = () => {
      if (!active) return

      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      const translateX = currentX * 18
      const translateY = currentY * 12
      const rotateX = currentY * -2.2
      const rotateY = currentX * 2.8

      scene.style.setProperty('--bg3d-x', `${translateX.toFixed(2)}px`)
      scene.style.setProperty('--bg3d-y', `${translateY.toFixed(2)}px`)
      scene.style.setProperty('--bg3d-rotate-x', `${rotateX.toFixed(2)}deg`)
      scene.style.setProperty('--bg3d-rotate-y', `${rotateY.toFixed(2)}deg`)

      const settled = Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001
      frame = settled ? 0 : window.requestAnimationFrame(applyParallax)
    }

    const scheduleParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(applyParallax)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return

      targetX = clamp((event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1)
      targetY = clamp((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1)
      scheduleParallax()
    }

    const resetParallax = () => {
      targetX = 0
      targetY = 0
      scheduleParallax()
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) resetParallax()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerout', handlePointerOut, { passive: true })
    window.addEventListener('blur', resetParallax)

    return () => {
      active = false
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('blur', resetParallax)
    }
  }, [])

  const handleSplineLoad = (app: Application) => {
    splineAppRef.current = app
    const runtimeApp = app as RuntimeApplication

    // On mobile: use on-demand rendering so Spline only renders when its
    // internal animation system actually needs a new frame, instead of
    // forcing a full 60 fps rAF loop unconditionally.
    // On desktop: keep continuous for the smoothest experience.
    runtimeApp.renderMode = isMobile ? 'on-demand' : 'continuous'
    runtimeApp.play()
    runtimeApp.requestRender()
    applyResponsiveZoom()

    try {
      app.setBackgroundColor('transparent')
      const startEvents = app.getSplineEvents().start ?? {}
      Object.keys(startEvents).forEach((objectId) => app.emitEvent('start', objectId))
      runtimeApp.requestRender()
    } catch {
      // Keep the authored scene running if an optional runtime call is unavailable.
    }

    // Pause Spline rendering when the browser tab is hidden
    const handleVisibilityChange = () => {
      try {
        if (document.hidden) {
          ;(splineAppRef.current as RuntimeApplication).renderMode = 'manual'
        } else {
          ;(splineAppRef.current as RuntimeApplication).renderMode = isMobile
            ? 'on-demand'
            : 'continuous'
          ;(splineAppRef.current as RuntimeApplication).requestRender()
        }
      } catch {
        // Ignore if Spline API is unavailable
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    // Store cleanup on the ref so the component cleanup can reach it
    ;(app as RuntimeApplication & { _visCleanup?: () => void })._visCleanup = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }

  // Cleanup visibility listener when component unmounts
  useEffect(() => {
    return () => {
      const app = splineAppRef.current as (RuntimeApplication & { _visCleanup?: () => void }) | null
      app?._visCleanup?.()
    }
  }, [])

  return (
    <div className="bg3d" aria-hidden>
      <div ref={splineSceneRef} className="bg3d__scene">
        <SplineErrorBoundary>
          <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Spline
              scene="/spline/scene.splinecode"
              renderOnDemand={false}
              onLoad={handleSplineLoad}
            />
          </div>
        </SplineErrorBoundary>
      </div>
      <div className="bg3d__vignette" />
    </div>
  )
}

class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    // Intentionally empty — fallback UI shown below
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }} className="bg3d--fallback" />
    }
    return this.props.children as React.ReactElement
  }
}
