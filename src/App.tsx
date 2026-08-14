import { lazy, Suspense } from 'react'
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
import { TargetCursor } from './components/TargetCursor'
import { ClickSpark } from './components/ClickSpark'
import { TransitionProvider } from './components/TransitionProvider'
import { FooterContacts } from './components/FooterContacts'
import { resume } from './data/resume'

// Lazy-load heavy components so critical UI (nav, hero, buttons) is
// interactive before the WebGL pipelines initialise.
const SplashCursor = lazy(() =>
  import('./components/SplashCursor').then((m) => ({ default: m.SplashCursor }))
)
const Background3D = lazy(() =>
  import('./components/Background3D').then((m) => ({ default: m.Background3D }))
)

export default function App() {
  return (
    <TransitionProvider>
      {/* SplashCursor is hidden on mobile (pointer:coarse) inside the component itself */}
      <Suspense fallback={null}>
        <SplashCursor />
      </Suspense>
      <TargetCursor />
      <ClickSpark />
      <ScrollProgress />

      {/* Background3D lazy-loads after critical UI — still initialises immediately
          after the first render, just doesn't block the initial paint */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

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
          <div className="footer__row">
            <span>
              © {new Date().getFullYear()} {resume.name}
            </span>
            <span className="footer__note">Designed &amp; built for user-centered craft</span>
          </div>
          <FooterContacts />
        </footer>
      </div>
    </TransitionProvider>
  )
}
