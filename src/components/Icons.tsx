import React from 'react'

const SvgIcon = ({ className = '', title = '', children }: { className?: string; title?: string; children: React.ReactNode }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
)

export const IconEmail = ({ className = '' }: { className?: string }) => (
  <SvgIcon className={className} title="email">
    <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 6l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 18l8-6 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const IconInstagram = ({ className = '' }: { className?: string }) => (
  <SvgIcon className={className} title="instagram">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SvgIcon>
)

export const IconLinkedIn = ({ className = '' }: { className?: string }) => (
  <SvgIcon className={className} title="linkedin">
    <path d="M6 9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 7.5A1.5 1.5 0 1 1 6 4.5a1.5 1.5 0 0 1 0 3z" fill="currentColor" />
    <path d="M10.5 15.75V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10.5 15.75h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 9v6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </SvgIcon>
)

export const IconGithub = ({ className = '' }: { className?: string }) => (
  <SvgIcon className={className} title="github">
    <path
      d="M12 2.25c-5.5 0-9.75 4.25-9.75 9.75 0 4.3 2.8 7.95 6.7 9.25.5.1.7-.2.7-.5v-1.75c-2.7.6-3.25-1.15-3.25-1.15-.45-1.1-1.1-1.4-1.1-1.4-.9-.6.05-.6.05-.6 1 .05 1.55 1.05 1.55 1.05.9 1.55 2.35 1.1 2.95.85.1-.65.35-1.1.65-1.35-2.15-.25-4.4-1.1-4.4-4.9 0-1.1.4-2 1.05-2.7-.1-.25-.45-1.25.1-2.6 0 0 .85-.25 2.75 1.05A9.6 9.6 0 0 1 12 6.75c.85 0 1.7.1 2.5.3 1.9-1.3 2.75-1.05 2.75-1.05.55 1.35.2 2.35.1 2.6.65.7 1.05 1.6 1.05 2.7 0 3.85-2.25 4.65-4.4 4.9.35.3.65.9.65 1.85v2.75c0 .35.2.6.7.5 3.9-1.3 6.7-4.95 6.7-9.25 0-5.5-4.25-9.75-9.75-9.75z"
      fill="currentColor"
    />
  </SvgIcon>
)

export const IconExternal = ({ className = '' }: { className?: string }) => (
  <SvgIcon className={className} title="external link">
    <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21H3V3h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export const IconApp = ({ className = '' }: { className?: string }) => <IconEmail className={className} />

export default IconApp
