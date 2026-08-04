import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setVisible(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const interactive = target?.closest('a, button, .project, .skill-card, .award, .contact__link')
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!visible) return null

  return (
    <motion.div
      className={`cursor${hovering ? ' is-hover' : ''}`}
      style={{ translateX: sx, translateY: sy }}
      aria-hidden
    />
  )
}
