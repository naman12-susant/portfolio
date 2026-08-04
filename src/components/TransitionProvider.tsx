import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type TransitionContextValue = {
  goTo: (hash: string) => void
  busy: boolean
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

export function useSectionTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('useSectionTransition must be used within TransitionProvider')
  return ctx
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [busy, setBusy] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  const [label, setLabel] = useState('')
  const reduce = useReducedMotion()

  const goTo = useCallback(
    (hash: string) => {
      if (busy) return
      const id = hash.replace('#', '')
      const target = document.getElementById(id)
      if (!target) {
        window.location.hash = hash
        return
      }

      if (reduce) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }

      setBusy(true)
      setLabel(id)
      setPhase('cover')

      window.setTimeout(() => {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
        setPhase('reveal')
      }, 420)

      window.setTimeout(() => {
        setPhase('idle')
        setBusy(false)
      }, 900)
    },
    [busy, reduce],
  )

  const value = useMemo(() => ({ goTo, busy }), [goTo, busy])

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            className="section-gate"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === 'cover' ? 1 : 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: phase === 'cover' ? 'top' : 'bottom' }}
          >
            <motion.span
              className="section-gate__label"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.28 }}
            >
              {label}
            </motion.span>
            <div className="section-gate__bars" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
