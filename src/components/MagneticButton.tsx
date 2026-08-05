import type { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'
import { useRef } from 'react'

type Props = {
  children: ReactNode
  className?: string
  href?: string
  download?: boolean | string
  target?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  strength?: number
  style?: CSSProperties
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export function MagneticButton({
  children,
  className = '',
  href,
  download,
  target,
  icon,
  iconPosition = 'right',
  strength = 28,
  style,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }

  const shared = {
    style: {
      ...style,
      transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
    } as CSSProperties,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
  }
  const pos = iconPosition || 'right'
  const iconElement = icon ? <span className="btn__icon">{icon}</span> : null
  const mergedClass = `${className || ''} ${pos === 'right' ? 'btn--icon-right' : 'btn--icon-left'}`.trim()

  if (href) {
    return (
      <a ref={ref as RefObject<HTMLAnchorElement>} href={href} download={download} target={target} {...shared} className={mergedClass}>
        {pos === 'left' ? iconElement : null}
        {children}
        {pos === 'right' ? iconElement : null}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      {...shared}
      className={mergedClass}
    >
      {pos === 'left' ? iconElement : null}
      {children}
      {pos === 'right' ? iconElement : null}
    </button>
  )
}
