import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'

type RuntimeApplication = Application & {
  renderMode: 'auto' | 'manual' | 'continuous'
}

export function Background3D() {
  const splineAppRef = useRef<Application | null>(null)

  const applyResponsiveZoom = () => {
    const width = window.innerWidth
    const zoom = width <= 640 ? 0.58 : width <= 960 ? 0.72 : 0.86

    try {
      splineAppRef.current?.setZoom(zoom)
    } catch {
      // Keep the authored Spline camera if responsive zoom is unavailable.
    }
  }

  useEffect(() => {
    window.addEventListener('resize', applyResponsiveZoom)
    applyResponsiveZoom()

    return () => window.removeEventListener('resize', applyResponsiveZoom)
  }, [])

  const handleSplineLoad = (app: Application) => {
    splineAppRef.current = app
    const runtimeApp = app as RuntimeApplication
    runtimeApp.renderMode = 'continuous'
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
  }

  return (
    <div className="bg3d" aria-hidden>
      <SplineErrorBoundary>
        <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <Spline
            scene="/spline/scene.splinecode"
            renderOnDemand={false}
            onLoad={handleSplineLoad}
          />
        </div>
      </SplineErrorBoundary>
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
