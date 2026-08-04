import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export type RevealVariant =
  | 'up'
  | 'left'
  | 'right'
  | 'scale'
  | 'blur'
  | 'clip'
  | 'rotate'

const variants: Record<
  RevealVariant,
  { hidden: Record<string, number | string>; show: Record<string, number | string> }
> = {
  up: {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -56 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 56 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    show: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(14px)', y: 24 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  clip: {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    show: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  },
  rotate: {
    hidden: { opacity: 0, rotateX: 28, y: 40 },
    show: { opacity: 1, rotateX: 0, y: 0 },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  variant?: RevealVariant
}) {
  const reduce = useReducedMotion()
  const v = variants[variant]

  return (
    <motion.div
      className={className}
      initial={reduce ? false : v.hidden}
      whileInView={v.show}
      viewport={{ once: false, amount: 0.22, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}
