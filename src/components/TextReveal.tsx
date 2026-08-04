import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span'
  delay?: number
}

export function TextReveal({ text, className = '', as = 'span', delay = 0 }: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(' ')

  if (reduce) {
    const Static = as
    return <Static className={className}>{text}</Static>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span className="text-reveal__word" key={`${word}-${wi}`}>
          {word.split('').map((char, ci) => (
            <motion.span
              className="text-reveal__char"
              key={`${wi}-${ci}`}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                delay: delay + wi * 0.08 + ci * 0.02,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Tag>
  )
}
