import { resume } from '../data/resume'
import { MagneticButton } from './MagneticButton'
import { Reveal } from './Reveal'
import TextType from './TextType'
import { Section } from './Section'
import { StrokeText } from './StrokeText'
import { useEffect, useRef, useState } from 'react'
import { IconEmail, IconInstagram } from './Icons'

function InstagramButton() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  // show menu on hover instead of click

  const handleOpen = (url?: string) => {
    if (!url) return
    window.open(url, '_blank', 'noopener')
    setOpen(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }

  const h1 = resume.instagram ? new URL(resume.instagram).pathname.replace(/\//g, '') : ''
  const h2 = resume.instagram2 ? new URL(resume.instagram2).pathname.replace(/\//g, '') : ''

  return (
    <div className="instagram-wrap" ref={wrapRef} onKeyDown={handleKey} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <MagneticButton className="btn btn--ghost" icon={<IconInstagram />}>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.125rem' }}>
          <span style={{ fontWeight: 600 }}>Instagram</span>
          <small style={{ opacity: 0.95 }}>
            {h1}
            {h1 && h2 ? ' • ' : ''}
            {h2}
          </small>
        </span>
        <span className="btn__arrow" aria-hidden>
          ↗
        </span>
      </MagneticButton>

      {open ? (
        <div className="instagram-menu" role="menu">
          {resume.instagram ? (
            <a className="instagram-menu__item" role="menuitem" href={resume.instagram} target="_blank" rel="noopener noreferrer" onClick={() => handleOpen(resume.instagram)}>
              {h1}
            </a>
          ) : null}
          {resume.instagram2 ? (
            <a className="instagram-menu__item" role="menuitem" href={resume.instagram2} target="_blank" rel="noopener noreferrer" onClick={() => handleOpen(resume.instagram2)}>
              {h2}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function Contact() {
  return (
    <Section id="contact" className="section container contact">
      <Reveal>
        <p className="section__eyebrow">Contact</p>
        <StrokeText
          text="Let’s build something"
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
            text={['Open to UX/UI roles, frontend work, and collaborations around AI-driven product experiences.']}
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

      <Reveal delay={0.1}>
        <div className="contact__panel">
          <div className="contact__links">
            <a className="contact__link" href={`mailto:${resume.email}`}>
              <small>
                <TextType
                  as="span"
                  text={['Email']}
                  typingSpeed={34}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </small>
              <strong>
                <TextType
                  as="span"
                  text={[resume.email]}
                  typingSpeed={34}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </strong>
            </a>
            {/* Combined Instagram button opens both profiles */}
            <a
              className="contact__link"
              href={resume.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <small>
                <TextType
                  as="span"
                  text={['LinkedIn']}
                  typingSpeed={34}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </small>
              <strong>
                <TextType
                  as="span"
                  text={['susant-kumar']}
                  typingSpeed={34}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </strong>
            </a>
            <a
              className="contact__link"
              href={resume.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <small>
                <TextType
                  as="span"
                  text={['GitHub']}
                  typingSpeed={34}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </small>
              <strong>
                <TextType
                  as="span"
                  text={['@susantkumar']}
                  typingSpeed={34}
                  loop={false}
                  startOnVisible
                  showCursor={false}
                />
              </strong>
            </a>
            {resume.location ? (
              <div className="contact__link">
                <small>
                  <TextType
                    as="span"
                    text={['Location']}
                    typingSpeed={34}
                    loop={false}
                    startOnVisible
                    showCursor={false}
                  />
                </small>
                <strong>
                  <TextType
                    as="span"
                    text={[resume.location]}
                    typingSpeed={34}
                    loop={false}
                    startOnVisible
                    showCursor={false}
                  />
                </strong>
              </div>
            ) : null}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <InstagramButton />

                <MagneticButton className="btn btn--primary" href={`mailto:${resume.email}`} icon={<IconEmail />}>
                  Start a conversation
                  <span className="btn__arrow" aria-hidden>
                    →
                  </span>
                </MagneticButton>
              </div>
        </div>
      </Reveal>
    </Section>
  )
}
