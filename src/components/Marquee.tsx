import { resume } from '../data/resume'

const items = [
  ...resume.skills.flatMap((g) => g.items),
  'India Innovates Finalist',
  'ET-AI Semi-Finalist',
  'React',
  'Three.js',
]

export function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
