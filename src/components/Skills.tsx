import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { StrokeText } from './StrokeText'
import TextType from './TextType'

export function Skills() {
  return (
    <Section id="skills" className="section container">
      <Reveal>
        <p className="section__eyebrow">Capabilities</p>
        <StrokeText
          text="Skills & stack"
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
            text={['A blend of design craft, frontend engineering, and the tools that keep products moving.']}
            typingSpeed={46}
            loop={false}
            startOnVisible
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            className="section__lead-text"
          />
        </p>
      </Reveal>

      <div className="skills__grid">
        {resume.skills.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.06}>
            <motion.div
              className="skill-card"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <TextType
                as="h3"
                className="skill-card__name"
                text={[group.name]}
                typingSpeed={40}
                loop={false}
                startOnVisible
                showCursor={false}
              />
              <ul>
                {group.items.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + si * 0.04, duration: 0.4 }}
                  >
                    <TextType
                      as="span"
                      text={[skill]}
                      typingSpeed={32}
                      loop={false}
                      startOnVisible
                      showCursor={false}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
