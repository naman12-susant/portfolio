import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import type { Application, SPEObject } from '@splinetool/runtime'

const HIDE_OBJECT_NAME = /(rectangle|rect|box|panel|plane|ground|floor|back|shadow|screen|card)/i

function hideBlackObject(obj: SPEObject) {
  if (!obj.name) return
  const name = obj.name.toString().trim()
  if (HIDE_OBJECT_NAME.test(name)) {
    obj.hide()
  }
}

export function Background3D() {
  const bgRef = useRef<HTMLDivElement | null>(null)
  const motionRef = useRef({ tx: 0, ty: 0, rx: 0, ry: 0, targetX: 0, targetY: 0, targetRX: 0, targetRY: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      motionRef.current.targetX = nx * 28
      motionRef.current.targetY = ny * 28
      motionRef.current.targetRX = -ny * 9
      motionRef.current.targetRY = nx * 9
    }

    const update = () => {
      const motion = motionRef.current
      motion.tx += (motion.targetX - motion.tx) * 0.16
      motion.ty += (motion.targetY - motion.ty) * 0.16
      motion.rx += (motion.targetRX - motion.rx) * 0.16
      motion.ry += (motion.targetRY - motion.ry) * 0.16

      if (bgRef.current) {
        bgRef.current.style.transform = `perspective(1400px) translate3d(${motion.tx}px, ${motion.ty}px, 0) rotateX(${motion.rx}deg) rotateY(${motion.ry}deg) scale(1.02)`
      }

      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', handlePointerMove)
    rafRef.current = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleSplineLoad = (app: Application) => {
    try {
      ;(window as any).splineApp = app
    } catch (e) {
      // ignore
    }

    try {
      app.setBackgroundColor && app.setBackgroundColor('transparent')
    } catch (e) {
      // ignore
    }

    try {
      const objs = app.getAllObjects ? app.getAllObjects() : []
      // eslint-disable-next-line no-console
      console.log('Spline loaded, objects:', objs?.map((o: any) => o?.name).slice(0, 200))
      objs?.forEach(hideBlackObject)
    } catch (e) {
      // ignore
    }
  }

  return (
    <div ref={bgRef} className="bg3d" aria-hidden>
      <SplineErrorBoundary>
        <div style={{ width: '100%', height: '100%', pointerEvents: 'none', transformStyle: 'preserve-3d' }}>
          <Spline scene="/spline/scene.splinecode" renderOnDemand={false} onLoad={handleSplineLoad} />
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
