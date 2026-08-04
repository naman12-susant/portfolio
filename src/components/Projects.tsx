import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import TextType from './TextType'
import { Section } from './Section'
import { StrokeText } from './StrokeText'
import { MagneticButton } from './MagneticButton'
import { IconExternal } from './Icons'

export function Projects() {
  return (
    <Section id="projects" className="section container">
      <Reveal>
        <p className="section__eyebrow">Selected work</p>
        <StrokeText
          text="Projects that ship"
          strokeColor="#A78BFA"
          fillColor="#F8FAFC"
          strokeWidth={1.6}
          drawDuration={1.4}
          fillDelay={0.2}
          stagger={0.04}
          ease="power2.out"
          trigger="scroll"
          fillMode="wipe"
          fontSize={58}
          fontWeight={800}
          letterSpacing={-3}
          className="section__title stroke-heading"
        />
        <p className="section__lead">
          <TextType
            text={['End-to-end builds spanning AI career tooling and interactive 3D training experiences.']}
            typingSpeed={48}
            loop={false}
            startOnVisible
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            className="section__lead-text"
          />
        </p>
      </Reveal>

      <div className="projects__list">
        {resume.projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08}>
            <TiltCard
              className="project"
              style={{ ['--project-accent' as string]: project.accent }}
            >
              <div className="project__index">0{index + 1}</div>
              <div>
                <div className="project__meta">
                  <span className="project__type">{project.type}</span>
                  <span>{project.period}</span>
                </div>
                <TextType
                  as="h3"
                  className="project__title"
                  text={[project.title]}
                  typingSpeed={38}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
                <TextType
                  as="p"
                  className="project__subtitle"
                  text={[project.subtitle]}
                  typingSpeed={38}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
                <TextType
                  as="p"
                  className="project__desc"
                  text={[project.description]}
                  typingSpeed={38}
                  loop={false}
                  startOnVisible
                  showCursor
                  cursorCharacter="|"
                  cursorBlinkDuration={0.45}
                />
                <ul className="project__highlights">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="project__tech">
                  {project.tech.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url ? (
                  <div className="project__actions">
                    <MagneticButton className="btn btn--ghost" href={project.url} icon={<IconExternal />}>
                      View project
                    </MagneticButton>
                  </div>
                ) : null}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
