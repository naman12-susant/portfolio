import { type ReactNode } from 'react'
import './GradientText.css'

type GradientTextProps = {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  pauseOnHover?: boolean
  yoyo?: boolean
  showBorder?: boolean
}

export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 3,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
  showBorder = false,
}: GradientTextProps) {
  const gradientAngle =
    direction === 'horizontal'
      ? 'to right'
      : direction === 'vertical'
      ? 'to bottom'
      : 'to bottom right'

  const gradientColors = [...colors, colors[0]].join(', ')
  const backgroundSize =
    direction === 'horizontal'
      ? '300% 100%'
      : direction === 'vertical'
      ? '100% 300%'
      : '300% 300%'

  return (
    <span
      className={`gradient-text gradient-text--${direction} ${showBorder ? 'with-border' : ''} ${className}`.trim()}
      style={{
        backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
        backgroundSize,
        animationDuration: `${animationSpeed}s`,
        animationDirection: yoyo ? 'alternate' : 'normal',
      }}
      data-pause-on-hover={pauseOnHover ? 'true' : 'false'}
    >
      {children}
    </span>
  )
}
