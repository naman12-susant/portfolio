import type { ReactNode } from 'react'
import { resume } from '../data/resume'
import { IconEmail, IconGithub, IconInstagram, IconLinkedIn } from './Icons'

type FooterContactLinkProps = {
  href: string
  label: string
  value: string
  icon?: ReactNode
  target?: string
}

function FooterContactLink({ href, label, value, icon, target }: FooterContactLinkProps) {
  return (
    <a
      className={`footer__contact-link${icon ? '' : ' footer__contact-link--text'}`}
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      aria-label={`${label}: ${value}`}
    >
      {icon}
      <span className="footer__contact-copy">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </a>
  )
}

export function FooterContacts() {
  const formattedPhone = `+91 ${resume.phone.slice(0, 5)} ${resume.phone.slice(5)}`

  return (
    <nav className="footer__contacts" aria-label="Contact links">
      <FooterContactLink
        href={`mailto:${resume.email}`}
        label="Email"
        value={resume.email}
        icon={<IconEmail className="footer__contact-icon" />}
      />
      <FooterContactLink href={`tel:+91${resume.phone}`} label="Phone" value={formattedPhone} />
      <FooterContactLink
        href={resume.linkedin}
        label="Social"
        value="LinkedIn"
        target="_blank"
        icon={<IconLinkedIn className="footer__contact-icon" />}
      />
      <FooterContactLink
        href={resume.github}
        label="Social"
        value="GitHub"
        target="_blank"
        icon={<IconGithub className="footer__contact-icon" />}
      />
      <FooterContactLink
        href={resume.instagram}
        label="Social"
        value="Instagram"
        target="_blank"
        icon={<IconInstagram className="footer__contact-icon" />}
      />
      <FooterContactLink
        href={resume.instagram2}
        label="Social"
        value="Instagram 2"
        target="_blank"
        icon={<IconInstagram className="footer__contact-icon" />}
      />
    </nav>
  )
}
