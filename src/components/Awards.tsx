import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import TextType from './TextType'
import { Section } from './Section'
import { StrokeText } from './StrokeText'
import GradientText from './GradientText'

const GOLD_COLORS = ['#f59e0b', '#fbbf24', '#f59e0b', '#fbbf24', '#f59e0b']
const SILVER_COLORS = ['#94a3b8', '#e2e8f0', '#94a3b8', '#e2e8f0', '#94a3b8']
const BASE_COLORS = ['#2dd4bf', '#a78bfa', '#2dd4bf', '#a78bfa', '#2dd4bf']
const TEXT_COLORS = ['#f4efe6', '#e8a87c', '#2dd4bf', '#a78bfa', '#f4efe6']

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
        {featured.map((award, i) => {
          const badgeColors = award.tier === 'gold' ? GOLD_COLORS : SILVER_COLORS
          return (
            <Reveal key={award.org} delay={i * 0.08}>
              <article className={`award award--featured award--${award.tier}`}>
                <span className={`award__badge award__badge--${award.tier}`}>
                  <GradientText colors={badgeColors} animationSpeed={3} showBorder={false}>
                    {award.title}
                  </GradientText>
                </span>
                <p className="award__org">
                  <GradientText colors={TEXT_COLORS} animationSpeed={4 + i} showBorder={false}>
                    {award.org}
                  </GradientText>
                </p>
              </article>
            </Reveal>
          )
        })}
      </div>

      <div className="awards__grid">
        {rest.map((award, i) => (
          <Reveal key={award.org} delay={Math.min(i * 0.04, 0.28)}>
            <article className="award">
              <span className={`award__badge award__badge--${award.tier}`}>
                <GradientText colors={BASE_COLORS} animationSpeed={3} showBorder={false}>
                  {award.title}
                </GradientText>
              </span>
              <p className="award__org">
                <GradientText colors={TEXT_COLORS} animationSpeed={3.5 + (i % 3)} showBorder={false}>
                  {award.org}
                </GradientText>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
