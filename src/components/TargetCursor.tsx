import { useEffect, useRef } from 'react'
import './TargetCursor.css'

export function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const animationFrame = useRef<number | null>(null)
  const pointer = useRef({ x: -100, y: -100, apiX: -100, apiY: -100 })
  const isFine = typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  const reducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  useEffect(() => {
    if (!isFine || reducedMotion || !cursorRef.current) return

    const cursor = cursorRef.current
    let activeTarget: HTMLElement | null = null

    const updateCursor = () => {
      const { x, y, apiX, apiY } = pointer.current
      pointer.current.apiX += (x - apiX) * 0.18
      pointer.current.apiY += (y - apiY) * 0.18
      cursor.style.transform = `translate3d(${pointer.current.apiX}px, ${pointer.current.apiY}px, 0)`
      animationFrame.current = requestAnimationFrame(updateCursor)
    }

    const setTargetState = (target: HTMLElement | null) => {
      if (activeTarget === target) return
      activeTarget = target
      if (target) {
        cursor.classList.add('target-active')
      } else {
        cursor.classList.remove('target-active')
      }
    }

    const handleMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX
      pointer.current.y = event.clientY
      const target = (event.target as HTMLElement)?.closest('.cursor-target') as HTMLElement | null
      setTargetState(target)
    }

    const handleLeave = () => {
      setTargetState(null)
    }

    const handleDown = () => {
      cursor.classList.add('target-pressed')
    }

    const handleUp = () => {
      cursor.classList.remove('target-pressed')
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseout', handleLeave)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    animationFrame.current = requestAnimationFrame(updateCursor)

    return () => {
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseout', handleLeave)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isFine, reducedMotion])

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <div className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  )
}
