import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import TextType from './TextType'
import { Section } from './Section'
import { StrokeText } from './StrokeText'

export function Awards() {
  const featured = resume.awards.filter((a) => a.tier !== 'base')
  const rest = resume.awards.filter((a) => a.tier === 'base')

  return (
    <Section id="awards" className="section container">
      <Reveal>
        <p className="section__eyebrow">Recognition</p>
        <StrokeText
          text="Awards & hackathons"
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
            text={['National finals, IIT challenges, and industry techathons — building under pressure, shipping ideas fast.']}
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

      <div className="awards__featured">
        {featured.map((award, i) => (
          <Reveal key={award.org} delay={i * 0.08}>
            <article className={`award award--featured award--${award.tier}`}>
              <span className={`award__badge award__badge--${award.tier}`}>
                <TextType
                  text={[award.title]}
                  typingSpeed={40}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </span>
              <TextType
                as="p"
                className="award__org"
                text={[award.org]}
                typingSpeed={40}
                loop={false}
                startOnVisible
                showCursor={false}
              />
            </article>
          </Reveal>
        ))}
      </div>

      <div className="awards__grid">
        {rest.map((award, i) => (
          <Reveal key={award.org} delay={Math.min(i * 0.04, 0.28)}>
            <article className="award">
              <span className={`award__badge award__badge--${award.tier}`}>
                <TextType
                  text={[award.title]}
                  typingSpeed={40}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </span>
              <TextType
                as="p"
                className="award__org"
                text={[award.org]}
                typingSpeed={40}
                loop={false}
                startOnVisible
                showCursor={false}
              />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
