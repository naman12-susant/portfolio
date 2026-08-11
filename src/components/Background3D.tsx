import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import type { Application, SPEObject } from '@splinetool/runtime'

const REFERENCE_VIDEO = new URL('../assets/Screen Recording 2026-08-11 201743.mp4', import.meta.url).href

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
  const videosRef = useRef<HTMLVideoElement[]>([])
  const motionRef = useRef({ tx: 0, ty: 0, rx: 0, ry: 0, targetX: 0, targetY: 0, targetRX: 0, targetRY: 0 })
  const rafRef = useRef<number | null>(null)
  const overrideIntervalsRef = useRef<number[]>([])

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

      // Replace embedded video textures with the project's MP4 for exact match
      try {
        app._scene.traverse((obj: any) => {
          if (!obj.isMesh) return
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((mat: any) => {
            if (!mat || !mat.uniforms) return
            Object.keys(mat.uniforms).forEach((k) => {
              try {
                const u = mat.uniforms[k]
                const val = u && u.value
                if (!val) return
                // detect video-texture-like objects (runtime marks them)
                if (val.isVideoTexture || (val.isTexture && val.isVideoTexture) || (val.image && val.image && val.image.tagName === 'VIDEO')) {
                  const video = document.createElement('video') as HTMLVideoElement
                  video.src = REFERENCE_VIDEO
                  video.crossOrigin = 'anonymous'
                  video.muted = true
                  video.loop = true
                  video.playsInline = true
                  video.autoplay = true
                  video.style.display = 'none'
                  document.body.appendChild(video)
                  // start playback (best-effort)
                  video.play().catch(() => {})
                  videosRef.current.push(video)

                  // assign the video element into the texture object used by the shader
                  if (val.image) {
                    val.image = video
                  } else if (val.isTexture) {
                    val.image = video
                  } else {
                    // fallback: set image property
                    val.image = video
                  }

                  // mark as video texture so runtime treats it appropriately
                  val.isVideoTexture = true
                  if (u && u.needsUpdate !== undefined) u.needsUpdate = true
                }
              } catch (e) {
                // ignore per-uniform errors
              }
            })
          })
        })
      } catch (e) {
        // ignore scene traversal errors
      }

      // Specifically target known frame/goggle mesh names and enforce an upward offset
      try {
        const FRAME_NAMES = ['gogglllee', 'gogglllee.001', 'gogglllee.002']
        const OFFSET_Y = 140 // upward offset in scene units; adjust if you want more/less

        const applyOffset = () => {
          try {
            FRAME_NAMES.forEach((n) => {
              try {
                // some runtimes expose getObjectByName-like helpers; fall back to traverse
                let found: any = null
                if (app.getAllObjects) {
                  const all = app.getAllObjects() || []
                  for (let i = 0; i < all.length; i++) {
                    if ((all[i].name || '').toString() === n) { found = all[i]; break }
                  }
                }
                if (!found && app._scene && app._scene.getObjectByName) {
                  found = app._scene.getObjectByName(n)
                }
                if (!found && app._scene) {
                  app._scene.traverse((obj: any) => { if (!found && obj && obj.isMesh && (obj.name || '').toString() === n) found = obj })
                }
                if (found) {
                  found.position = found.position || { x: 0, y: 0, z: 0 }
                  found.position.y = (found.position.y || 0) + OFFSET_Y
                  if (found.updateMatrix) found.updateMatrix()
                }
              } catch (e) {
                // ignore per-name errors
              }
            })
          } catch (e) {
            // ignore
          }
        }

        // apply immediately and a few more times to beat any runtime resets
        applyOffset()
        setTimeout(applyOffset, 200)
        setTimeout(applyOffset, 600)
        // also enforce for a short period with interval
        const guardId = window.setInterval(applyOffset, 150)
        overrideIntervalsRef.current.push(guardId)
        window.setTimeout(() => { try { clearInterval(guardId) } catch (e) {} }, 3500)
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    return () => {
      // cleanup any created video elements
      videosRef.current.forEach((v) => {
        try {
          v.pause()
          if (v.parentNode) v.parentNode.removeChild(v)
        } catch (e) {
          // ignore
        }
      })
      videosRef.current = []
    }
  }, [])

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
