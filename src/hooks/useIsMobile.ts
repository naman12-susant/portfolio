import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= breakpoint || window.matchMedia('(pointer: coarse)').matches
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint || window.matchMedia('(pointer: coarse)').matches)
    }

    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    mql.addEventListener('change', checkMobile)
    return () => mql.removeEventListener('change', checkMobile)
  }, [breakpoint])

  return isMobile
}
