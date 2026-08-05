"""Generate Susant Kumar's resume as a polished single-page PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
import os

OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'Susant_Kumar_Resume.pdf')

# ── colours ──
BG      = HexColor('#ffffff')
INK     = HexColor('#1a1a2e')
MUTED   = HexColor('#555555')
ACCENT  = HexColor('#2563eb')
LINE    = HexColor('#e2e8f0')
SECTION_BG = HexColor('#f8fafc')

W, H = A4  # 210 × 297 mm

def draw(c: canvas.Canvas):
    # ── margins ──
    left = 22 * mm
    right = W - 22 * mm
    usable = right - left
    y = H - 20 * mm

    # ── Header ──
    c.setFont('Helvetica-Bold', 22)
    c.setFillColor(INK)
    c.drawString(left, y, 'Susant Kumar')
    y -= 7 * mm

    c.setFont('Helvetica', 10)
    c.setFillColor(ACCENT)
    c.drawString(left, y, 'UX/UI Designer & Frontend Developer')
    y -= 6 * mm

    c.setFont('Helvetica', 8.5)
    c.setFillColor(MUTED)
    contact_parts = [
        'susantnaman@gmail.com',
        '+91 8420012233',
        'linkedin.com/in/susant-kumar-510687356',
        'github.com/susantkumar',
    ]
    c.drawString(left, y, '  |  '.join(contact_parts))
    y -= 4 * mm

    # divider
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.2)
    c.line(left, y, right, y)
    y -= 7 * mm

    # ── Summary ──
    y = section_heading(c, 'SUMMARY', left, y)
    summary = (
        'Aspiring UX/UI designer and frontend developer with a user-centered design mindset and '
        'hands-on experience building intuitive interfaces with React and Tailwind CSS. Curious about '
        'human-centered design in AI-driven products — demonstrated by shipping an end-to-end AI-powered '
        'career platform. Seeking a UX/UI-focused role to deepen expertise in design systems, prototyping, '
        'and data-informed design.'
    )
    y = draw_wrapped(c, summary, left, y, usable, 'Helvetica', 8.5, MUTED, leading=3.8*mm)
    y -= 5 * mm

    # ── Education ──
    y = section_heading(c, 'EDUCATION', left, y)
    c.setFont('Helvetica-Bold', 9.5)
    c.setFillColor(INK)
    c.drawString(left, y, 'Bengal Institute of Technology (Techno India Group)')
    y -= 4 * mm
    c.setFont('Helvetica', 8.5)
    c.setFillColor(MUTED)
    c.drawString(left, y, 'Bachelor of Technology (B.Tech) in Information Technology')
    y -= 6 * mm

    # ── Projects ──
    y = section_heading(c, 'PROJECTS', left, y)

    # Project 1 – TalentForge
    y = project_block(
        c, left, right, y, usable,
        'TalentForge',
        'AI Mock Interview & Resume Optimization Platform',
        'Apr 2026 — Present',
        [
            'User-centered workflows for resume analysis and mock interviews',
            'Dynamic AI interviews with adaptive questioning and real-time feedback',
            'Resume validation, multi-format extraction, and attempt tracking',
            'Optimized resume downloads tailored to specific job roles',
        ],
        'React, TypeScript, Node.js, Python, MongoDB, Groq AI, Tailwind CSS, WebSockets',
    )
    y -= 3 * mm

    # Project 2 – Raw Power Athletics
    y = project_block(
        c, left, right, y, usable,
        'Raw Power Athletics',
        'Interactive Athletic Training Web App',
        'Aug 2026 — Present',
        [
            'Express + SQLite backend for training data',
            'Interactive 3D visualizations with Three.js',
            'Responsive CSS, HTML, and JS across desktop and mobile',
        ],
        'Express, SQLite, Three.js, HTML, CSS, JavaScript',
    )
    y -= 5 * mm

    # ── Skills ──
    y = section_heading(c, 'SKILLS', left, y)
    skills = {
        'Design': 'Wireframing, Prototyping, User-Centered Design, User Flow Mapping, Visual Composition',
        'Frontend': 'React, TypeScript, Java, Tailwind CSS, HTML, CSS',
        'Backend': 'Node.js, Python, MongoDB, MySQL, REST APIs, WebSockets',
        'Tools': 'Git, GitHub, Three.js, Groq AI, Vite',
    }
    for cat, items in skills.items():
        c.setFont('Helvetica-Bold', 8.5)
        c.setFillColor(INK)
        c.drawString(left, y, f'{cat}:')
        c.setFont('Helvetica', 8.5)
        c.setFillColor(MUTED)
        c.drawString(left + 50, y, items)
        y -= 4.2 * mm
    y -= 3 * mm

    # ── Awards ──
    y = section_heading(c, 'AWARDS & HACKATHONS', left, y)
    awards = [
        ('Finalist', 'India Innovates 2026 — National-Level Hackathon'),
        ('Semi-Finalist', 'ET-AI Hackathon 2026 — The Economic Times'),
        ('Participant', 'Machine Learning Hackathon — IIT Bhubaneswar'),
        ('Participant', 'Shaastra Smart City Challenge — IIT Madras'),
        ('Participant', 'Project Horizon: GPAI Case Competition — IIT Madras'),
        ('Participant', 'EY Techathon 6.0 — EY'),
        ('Participant', 'HackWithUttarPradesh 2025 — Chandigarh University'),
        ('Participant', 'Frontend Battle (Vibe Coding) — IIT Bhubaneswar'),
        ('Participant', 'Ethos Hackathons 2025 — IIT Guwahati'),
        ('Participant', 'HP Power Lab 2.0 — HPCL'),
    ]
    col_width = usable / 2
    for i, (title, org) in enumerate(awards):
        col = i % 2
        row = i // 2
        ax = left + col * col_width
        ay = y - row * 4.2 * mm
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(ACCENT if title != 'Participant' else INK)
        c.drawString(ax, ay, f'{title}  ')
        tw = c.stringWidth(f'{title}  ', 'Helvetica-Bold', 8)
        c.setFont('Helvetica', 7.5)
        c.setFillColor(MUTED)
        c.drawString(ax + tw, ay, org)


# ── helpers ──

def section_heading(c, text, x, y):
    c.setFont('Helvetica-Bold', 10)
    c.setFillColor(ACCENT)
    c.drawString(x, y, text)
    y -= 2.2 * mm
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(x, y, x + 166 * mm, y)
    y -= 5 * mm
    return y


def draw_wrapped(c, text, x, y, max_w, font, size, color, leading=4*mm):
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    line = ''
    for w in words:
        test = f'{line} {w}'.strip()
        if c.stringWidth(test, font, size) > max_w:
            c.drawString(x, y, line)
            y -= leading
            line = w
        else:
            line = test
    if line:
        c.drawString(x, y, line)
        y -= leading
    return y


def project_block(c, left, right, y, usable, title, subtitle, period, bullets, tech):
    c.setFont('Helvetica-Bold', 9.5)
    c.setFillColor(INK)
    c.drawString(left, y, title)

    c.setFont('Helvetica', 8)
    c.setFillColor(MUTED)
    c.drawRightString(right, y, period)
    y -= 4 * mm

    c.setFont('Helvetica-Oblique', 8.5)
    c.setFillColor(MUTED)
    c.drawString(left, y, subtitle)
    y -= 5 * mm

    for b in bullets:
        c.setFont('Helvetica', 8.5)
        c.setFillColor(MUTED)
        c.drawString(left + 3 * mm, y, f'•  {b}')
        y -= 3.8 * mm

    c.setFont('Helvetica-Bold', 7.5)
    c.setFillColor(ACCENT)
    c.drawString(left + 3 * mm, y, f'Tech: ')
    tw = c.stringWidth('Tech: ', 'Helvetica-Bold', 7.5)
    c.setFont('Helvetica', 7.5)
    c.setFillColor(MUTED)
    c.drawString(left + 3 * mm + tw, y, tech)
    y -= 4 * mm
    return y


def main():
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle('Susant Kumar — Resume')
    c.setAuthor('Susant Kumar')
    draw(c)
    c.save()
    print(f'[OK] Resume saved to {os.path.abspath(OUTPUT)}')


if __name__ == '__main__':
    main()
