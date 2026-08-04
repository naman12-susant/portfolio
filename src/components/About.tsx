import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import TextType from './TextType'
import { Section } from './Section'
import { StrokeText } from './StrokeText'

export function About() {
  return (
    <Section id="about" className="section container section--glass">
      <Reveal variant="clip">
        <p className="section__eyebrow">About</p>
        <StrokeText
          text="Design-minded engineering"
          strokeColor="#A78BFA"
          fillColor="#F8FAFC"
          strokeWidth={1.6}
          drawDuration={1.4}
          fillDelay={0.2}
          stagger={0.04}
          ease="power2.out"
          trigger="scroll"
          fillMode="wipe"
          fontSize={62}
          fontWeight={800}
          letterSpacing={-3}
          className="section__title stroke-heading"
        />
        <p className="section__lead">
          <TextType
            text={['Bridging interface craft with AI product thinking — from wireframes to shipped full-stack experiences.']}
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

      <div className="about__grid">
        <Reveal className="about__text" delay={0.08} variant="left">
          <TextType
            text={[resume.summary]}
            typingSpeed={42}
            loop={false}
            startOnVisible
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            className="about__copy-text"
          />
          <TextType
            text={[resume.seeking]}
            typingSpeed={42}
            loop={false}
            startOnVisible
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            className="about__copy-text"
          />
        </Reveal>

        <Reveal className="about__stats" delay={0.16} variant="right">
          <div className="stat">
            <div className="stat__value">10+</div>
            <div className="stat__label">Hackathons & competitions</div>
          </div>
          <div className="stat">
            <div className="stat__value">2</div>
            <div className="stat__label">Featured product builds</div>
          </div>
          <div className="stat">
            <div className="stat__value">2027</div>
            <div className="stat__label">B.Tech graduation target</div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
