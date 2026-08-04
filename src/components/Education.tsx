import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import TextType from './TextType'
import { Section } from './Section'
import { StrokeText } from './StrokeText'

export function Education() {
  const { education } = resume

  return (
    <Section id="education" className="section container">
      <Reveal>
        <p className="section__eyebrow">Education</p>
        <StrokeText
          text="Where I’m learning"
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
      </Reveal>

      <Reveal delay={0.1}>
        <div className="edu-card">
          <TextType
            as="h3"
            className="edu-card__school"
            text={[education.institution]}
            typingSpeed={42}
            loop={false}
            startOnVisible
            showCursor={false}
          />
          <TextType
            as="p"
            className="edu-card__degree"
            text={[education.degree]}
            typingSpeed={42}
            loop={false}
            startOnVisible
            showCursor={false}
          />
          <div className="edu-card__meta">
            {/* Only show remaining education meta if provided */}
            {education.location ? (
              <TextType
                as="span"
                text={[education.location]}
                typingSpeed={36}
                loop={false}
                startOnVisible
                showCursor={false}
              />
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
