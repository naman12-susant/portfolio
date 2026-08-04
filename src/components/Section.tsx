import { motion, useReducedMotion, type Variants, type Easing } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  id?: string
  className?: string
  children: ReactNode
}

const ease: Easing = [0.22, 1, 0.36, 1]

const sectionVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease,
    },
  },
}

export function Section({ id, className = '', children }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? 'show' : 'show'}
      viewport={{ once: false, amount: 0.2, margin: '-12% 0px -12% 0px' }}
      variants={sectionVariant}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.section>
  )
}
