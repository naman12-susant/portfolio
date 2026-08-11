import { useEffect, useRef, useState } from 'react'
import { resume } from '../data/resume'
import { useSectionTransition } from './TransitionProvider'
import { StaggeredMenu } from './StaggeredMenu'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { goTo } = useSectionTransition()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 24)
      const isScrollingDown = currentY > lastScrollY.current
      const shouldShow = currentY < 64 || !isScrollingDown || open
      setVisible(shouldShow)
      lastScrollY.current = currentY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  const menuItems = [
    ...links,
    { href: '/resume/Susant_Kumar_Resume_Updated.pdf', label: 'Download Resume', ariaLabel: 'Download resume' },
    { href: `mailto:${resume.email}`, label: 'Email me', ariaLabel: 'Email me' },
  ]

  const mappedMenuItems = menuItems.map((item) => ({
    label: item.label,
    ariaLabel: 'ariaLabel' in item ? item.ariaLabel : item.label,
    href: item.href,
  }))

  const handleItemClick = (href: string) => {
    if (href.startsWith('mailto:')) {
      window.location.href = href
      return
    }
    // If the link points to a PDF (resume), trigger a forced download preserving the original bytes
    if (href.endsWith('.pdf') || href.includes('/resume/')) {
      try {
        const a = document.createElement('a')
        a.href = href
        a.download = 'Susant_Kumar_Resume.pdf'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (e) {
        // fallback: navigate to the file in the same tab
        window.location.href = href
      }
      return
    }

    if (href.startsWith('/') && !href.startsWith('#')) {
      window.location.href = href
      return
    }

    goTo(href)
  }

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${!visible ? ' is-hidden' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner">
        <StaggeredMenu
          logoUrl=""
          logo={
            <a
              className="nav__brand"
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                goTo('#home')
              }}
            >
              Susant<span>.</span>
            </a>
          }
          items={mappedMenuItems.map((item) => ({
            label: item.label,
            ariaLabel: item.ariaLabel,
            link: item.href,
          }))}
          displaySocials={false}
          displayItemNumbering={false}
          menuButtonColor="#f8fafc"
          openMenuButtonColor="#f8fafc"
          accentColor="#c084fc"
          isFixed={true}
          closeOnClickAway={true}
          onMenuOpen={() => setOpen(true)}
          onMenuClose={() => setOpen(false)}
          onItemClick={handleItemClick}
          className="nav-staggered-menu"
        />
      </div>
    </header>
  )
}
