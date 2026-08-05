import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { StrokeText } from './StrokeText'
import GradientText from './GradientText'

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
          <h3 className="edu-card__school">
            <GradientText
              colors={['#40ffaa', '#4079ff', '#a78bfa', '#40ffaa']}
              animationSpeed={3}
              showBorder={false}
            >
              {education.institution}
            </GradientText>
          </h3>
          <p className="edu-card__degree">
            <GradientText
              colors={['#e8a87c', '#2dd4bf', '#e8a87c']}
              animationSpeed={4}
              showBorder={false}
            >
              {education.degree}
            </GradientText>
          </p>
          <div className="edu-card__meta">
            {education.location ? (
              <span>
                <GradientText
                  colors={['#9aa3b2', '#f4efe6', '#9aa3b2']}
                  animationSpeed={5}
                  showBorder={false}
                >
                  {education.location}
                </GradientText>
              </span>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
