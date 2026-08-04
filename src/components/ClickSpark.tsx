import { useEffect, useState } from 'react'
import './ClickSpark.css'

type Spark = {
  id: number
  x: number
  y: number
}

function isInteractiveTarget(target: HTMLElement | null) {
  if (!target) return false
  return Boolean(
    target.closest(
      'a, button, input, textarea, select, label, [role="button"], [role="link"], .sm-toggle, .sm-panel-item, .nav__brand, .nav, .bubble-menu, .magnetic-button, .project, .skill-card, .award, .contact__link',
    ),
  )
}

export function ClickSpark() {
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    let nextId = 0
    const timeouts = new Set<number>()

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (isInteractiveTarget(target)) return

      const x = event.clientX
      const y = event.clientY
      const id = nextId++
      setSparks((current) => [...current, { id, x, y }])

      const timeout = window.setTimeout(() => {
        setSparks((current) => current.filter((spark) => spark.id !== id))
        timeouts.delete(timeout)
      }, 450)

      timeouts.add(timeout)
    }

    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
      timeouts.clear()
    }
  }, [])

  return (
    <div className="click-spark-layer" aria-hidden="true">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="click-spark"
          style={{ left: spark.x, top: spark.y }}
        />
      ))}
    </div>
  )
}
