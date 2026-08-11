import React from 'react'
import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'

export function Background3D() {
  const handleSplineLoad = (app: Application) => {
    // Debug: print scene objects so we can identify any unwanted panels.
    const objects = app.getAllObjects().map((obj) => ({
      name: obj.name,
      uuid: obj.uuid,
      visible: obj.visible,
    }))
    console.log('Spline scene objects:', objects)

    // Expose the loaded app for manual debugging from the browser console.
    ;(window as any).splineApp = app
  }

  return (
    <div className="bg3d" aria-hidden>
      <SplineErrorBoundary>
        <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <Spline scene="/spline/scene.splinecode" onLoad={handleSplineLoad} />
        </div>
      </SplineErrorBoundary>
      <div className="bg3d__vignette" />
    </div>
  )
}

class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
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
