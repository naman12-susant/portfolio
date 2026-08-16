import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { MagneticButton } from './MagneticButton'
import { ParticleText } from './ParticleText'
import { StrokeText } from './StrokeText'
import TextType from './TextType'
import { useSectionTransition } from './TransitionProvider'
import { Section } from './Section'
import heroImage from '../assets/naman_2.jpeg'
import heroPng from '../assets/hero.png'
import ImageTrail from './ImageTrail'
import { useIsMobile } from '../hooks/useIsMobile'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.35 + i * 0.09,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function Hero() {
  const isMobile = useIsMobile()
  const trailImages = isMobile
    ? [heroImage, heroPng, heroImage]
    : [heroImage, heroPng, heroImage, heroPng, heroImage, heroPng, heroImage]

  const [first, last] = resume.name.split(' ')
  const { goTo } = useSectionTransition()

  return (
    <Section id="home" className="hero container">
      <div className="hero__layout hero__layout--solo">
        <div className="hero__copy">
          <motion.div
            className="hero__status"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <span className="hero__status-dot" aria-hidden />
            <TextType
              text={[
                'Available for opportunities',
              ]}
              typingSpeed={45}
              pauseDuration={1200}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.55}
              className="hero__typed-text hero__status-text"
            />
          </motion.div>

          <h1 className="hero__brand">
            <StrokeText text={first} className="hero__stroke-name" />
            <br />
            <em>
              <StrokeText text={last} className="hero__stroke-name" />
            </em>
          </h1>

          <motion.p
            className="hero__headline"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <TextType
              text={[resume.title]}
              typingSpeed={55}
              pauseDuration={1300}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.55}
              className="hero__typed-text hero__headline-text"
            />
          </motion.p>

          <motion.p
            className="hero__support"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <TextType
              text={[
                'Building intuitive, user-centered interfaces —',
                'Exploring how design systems meet AI-driven products.',
              ]}
              typingSpeed={60}
              deletingSpeed={30}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.55}
              className="hero__typed-text hero__support-text"
            />
          </motion.p>

          <div className="hero__particle-panel">
            <ParticleText
              text={`${resume.name}`}
              particleSize={2}
              density={isMobile ? 7 : 4}
              color="#f8fafc"
              highlightColor="#a78bfa"
              scatter={isMobile ? 100 : 160}
              trigger="hover"
              className="hero__particle-text"
            />
          </div>

          <motion.div
            className="hero__actions"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <MagneticButton
              className="btn btn--primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                goTo('#projects')
              }}
            >
              View projects
              <span className="btn__arrow" aria-hidden>
                →
              </span>
            </MagneticButton>
            <MagneticButton
              className="btn btn--ghost"
              href="/resume/Susant_Kumar_Resume_Updated.pdf"
              download="Susant_Kumar_Resume.pdf"
            >
              Download Resume
            </MagneticButton>
            <MagneticButton
              className="btn btn--ghost"
              href="/resume/Susant_Kumar_Resume_Updated.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </MagneticButton>
            <MagneticButton
              className="btn btn--ghost"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                goTo('#contact')
              }}
            >
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          whileHover={{ translateY: -6, rotateX: 2, rotateY: -2 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          style={{ position: 'relative', overflow: 'visible' }}
        >
          <ImageTrail items={trailImages} variant={1} />
          
          <div className="hero__card-inner">
            <motion.img
              src={heroImage}
              alt="Susant Kumar"
              className="hero__image"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            
            <div className="hero__visual-glow" aria-hidden />
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
