import { About } from './components/About'
import { Awards } from './components/Awards'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { SplashCursor } from './components/SplashCursor'
import { TargetCursor } from './components/TargetCursor'
import { ClickSpark } from './components/ClickSpark'
import { TransitionProvider } from './components/TransitionProvider'
import { Background3D } from './components/Background3D'
import { resume } from './data/resume'

export default function App() {
  return (
    <TransitionProvider>
      <SplashCursor />
      <TargetCursor />
      <ClickSpark />
      <ScrollProgress />

      <Background3D />

      <div className="ambient" aria-hidden>
        <div className="ambient__blob ambient__blob--a" />
        <div className="ambient__blob ambient__blob--b" />
      </div>

      <div className="app-shell">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Awards />
          <Contact />
        </main>

        <footer className="footer container">
          <span>
            © {new Date().getFullYear()} {resume.name}
          </span>
          <span>Designed & built for user-centered craft</span>
        </footer>
      </div>
    </TransitionProvider>
  )
}
