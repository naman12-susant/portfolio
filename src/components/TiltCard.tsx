import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function TiltCard({ children, className = '', style }: Props) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const softX = useSpring(rx, { stiffness: 180, damping: 18 })
  const softY = useSpring(ry, { stiffness: 180, damping: 18 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(232,168,124,0.18), transparent 45%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 10)
    rx.set((0.5 - py) * 8)
    mx.set(px * 100)
    my.set(py * 100)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      className={`tilt ${className}`}
      style={{
        ...style,
        rotateX: softX,
        rotateY: softY,
        transformStyle: 'preserve-3d',
        backgroundImage: glow,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
