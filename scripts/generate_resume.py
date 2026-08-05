"""Generate Susant Kumar's Resume PDF using exact Tinos fonts (same as the attached resume)."""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Flowable, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

class SectionLine(Flowable):
    """A thin horizontal rule that uses only canvas primitives — no font required."""
    def __init__(self, width='100%', thickness=0.9, color=HexColor('#000000'), space_before=1, space_after=4):
        Flowable.__init__(self)
        self._width = width
        self.thickness = thickness
        self.line_color = color
        self.space_before = space_before
        self.space_after = space_after

    def wrap(self, availWidth, availHeight):
        self._availWidth = availWidth
        return (availWidth, self.space_before + self.thickness + self.space_after)

    def draw(self):
        self.canv.saveState()
        self.canv.setStrokeColor(self.line_color)
        self.canv.setLineWidth(self.thickness)
        y = self.space_after
        self.canv.line(0, y, self._availWidth, y)
        self.canv.restoreState()

OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'Susant_Kumar_Resume.pdf')
FONTS_DIR = os.path.join(os.path.dirname(__file__), 'fonts')

def register_fonts():
    pdfmetrics.registerFont(TTFont('Tinos', os.path.join(FONTS_DIR, 'Tinos-Regular.ttf')))
    pdfmetrics.registerFont(TTFont('Tinos-Bold', os.path.join(FONTS_DIR, 'Tinos-Bold.ttf')))
    pdfmetrics.registerFont(TTFont('Tinos-Italic', os.path.join(FONTS_DIR, 'Tinos-Italic.ttf')))
    pdfmetrics.registerFont(TTFont('Tinos-BoldItalic', os.path.join(FONTS_DIR, 'Tinos-BoldItalic.ttf')))
    pdfmetrics.registerFontFamily(
        'Tinos',
        normal='Tinos',
        bold='Tinos-Bold',
        italic='Tinos-Italic',
        boldItalic='Tinos-BoldItalic'
    )

def build_pdf():
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    register_fonts()

    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=12 * mm,
        rightMargin=12 * mm,
        topMargin=10 * mm,
        bottomMargin=10 * mm
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Tinos-Bold',
        fontSize=21,
        leading=23,
        alignment=TA_CENTER,
        textColor=HexColor('#000000')
    )

    subtitle_style = ParagraphStyle(
        'HeaderSubtitle',
        parent=styles['Normal'],
        fontName='Tinos-Italic',
        fontSize=10,
        leading=12,
        alignment=TA_CENTER,
        textColor=HexColor('#111111'),
        spaceBefore=2
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Tinos',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=HexColor('#000000'),
        spaceBefore=3
    )

    location_style = ParagraphStyle(
        'HeaderLocation',
        parent=styles['Normal'],
        fontName='Tinos',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=HexColor('#000000'),
        spaceBefore=1
    )

    section_head_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Tinos-Bold',
        fontSize=11,
        leading=13,
        textColor=HexColor('#000000'),
        spaceBefore=7,
        spaceAfter=1
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Tinos',
        fontSize=8.8,
        leading=11.2,
        textColor=HexColor('#000000'),
        spaceAfter=2
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Tinos',
        fontSize=8.8,
        leading=11.2,
        leftIndent=12,
        firstLineIndent=-12,
        textColor=HexColor('#000000'),
        spaceAfter=1.5
    )

    left_style = ParagraphStyle(
        'TableLeft',
        parent=styles['Normal'],
        fontName='Tinos',
        fontSize=8.8,
        leading=11,
        alignment=TA_LEFT,
        textColor=HexColor('#000000')
    )

    right_style = ParagraphStyle(
        'TableRight',
        parent=styles['Normal'],
        fontName='Tinos',
        fontSize=8.8,
        leading=11,
        alignment=TA_RIGHT,
        textColor=HexColor('#000000')
    )

    story = []

    # ------------------ HEADER ------------------
    story.append(Paragraph("Susant Kumar", title_style))
    story.append(Paragraph("<i>Aspiring UX/UI Designer &amp; Frontend Developer</i>", subtitle_style))

    contact_line = (
        '<a href="tel:8420012233" color="#000000"><u>8420012233</u></a> &nbsp;'
        '<a href="mailto:susantnaman@gmail.com" color="#000000"><u>susantnaman@gmail.com</u></a> &nbsp;'
        '<a href="https://www.linkedin.com/in/susant-kumar-510687356" color="#000000"><u>susant-kumar-510687356</u></a> &nbsp;'
        '<a href="https://github.com/naman12-susant" color="#000000"><u>naman12-susant</u></a> &nbsp;'
        '<a href="https://portfolio-rndb.onrender.com" color="#000000"><u>portfolio-rndb</u></a>'
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(Paragraph("Kolkata, India", location_style))
    story.append(Spacer(1, 2))

    def add_section_header(title):
        story.append(Paragraph(f"<b>{title}</b>", section_head_style))
        story.append(SectionLine(thickness=0.9, color=HexColor('#000000'), space_before=1, space_after=4))

    # ------------------ PROFESSIONAL SUMMARY ------------------
    add_section_header("PROFESSIONAL SUMMARY")
    summary_text = (
        "Aspiring <b>UX/UI designer</b> and <b>frontend developer</b> with a user-centered design mindset and hands-on experience in building "
        "intuitive interfaces using <b>React</b> and <b>Tailwind CSS</b>. Passionate about applying human-centered design principles in AI-driven "
        "products, demonstrated by developing an end-to-end <b>AI-powered career platform</b>. Proficient in independent work and clear "
        "communication through documentation, presentations, and collaborative hackathons. Seeking to advance into a <b>UX/UI-focused</b> "
        "role and deepen expertise in design systems, prototyping, and data-informed design practices."
    )
    story.append(Paragraph(summary_text, body_style))

    # ------------------ EDUCATIONS ------------------
    add_section_header("EDUCATIONS")

    edu_table_data = [
        [
            Paragraph("<b>Bengal Institute of Technology (Techno India Group)</b> | Kolkata, India", left_style),
            Paragraph("Sep 2023 - Jul 2027", right_style)
        ],
        [
            Paragraph("<i>Bachelor of Technology (B.Tech) in Information Technology</i>", left_style),
            Paragraph("CGPA : 6.5", right_style)
        ]
    ]
    t_edu = Table(edu_table_data, colWidths=[136*mm, 50*mm])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu)
    story.append(Paragraph("- <b>Expected graduation:</b> May 2027", bullet_style))

    # ------------------ PROJECTS ------------------
    add_section_header("PROJECTS")

    # Project 1: TalentForge
    p1_table_data = [
        [
            Paragraph('<b>TalentForge - AI Mock Interview &amp; Resume Optimization Platform</b> | <a href="https://ai-mock-interview-1-2zpu.onrender.com" color="#0000EE"><u>Website</u></a>', left_style),
            Paragraph("Apr 2026 - Present", right_style)
        ]
    ]
    t_p1 = Table(p1_table_data, colWidths=[140*mm, 46*mm])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p1)
    story.append(Paragraph("<i>Self Project</i>", body_style))
    story.append(Paragraph("<b>Developed</b> a full-stack <b>AI-powered career preparation platform</b> to assess resumes against target roles, identify skill gaps, and generate customized resume content.", body_style))
    story.append(Paragraph("- <b>Designed user-centered interfaces</b> and workflows for resume analysis and mock interview experiences, translating complex AI feedback into clear, actionable steps.", bullet_style))
    story.append(Paragraph("- <b>Engineered dynamic AI interviews</b> with adaptive questioning and real-time feedback to enhance user engagement.", bullet_style))
    story.append(Paragraph("- <b>Implemented</b> resume validation, multi-format text extraction, interview attempt tracking, and user authentication to ensure a seamless user experience.", bullet_style))
    story.append(Paragraph("- <b>Facilitated downloads of optimized resumes</b> tailored for specific job roles.", bullet_style))
    story.append(Paragraph("<b>Technologies / Tools Used :</b> React, TypeScript, Node.js, Python, MongoDB, Groq AI, Tailwind CSS, REST APIs, WebSockets", body_style))
    story.append(Spacer(1, 2))

    # Project 2: raw-power-athletics
    p2_table_data = [
        [
            Paragraph('<b>raw-power-athletics</b> | <a href="https://raw-power-athletics.onrender.com" color="#0000EE"><u>Website</u></a>', left_style),
            Paragraph("Aug 2026 - Present", right_style)
        ]
    ]
    t_p2 = Table(p2_table_data, colWidths=[140*mm, 46*mm])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p2)
    story.append(Paragraph("<i>Self Project</i>", body_style))
    story.append(Paragraph("- <b>Developed</b> a comprehensive web application for athletic training using <b>Express</b> and <b>SQLite</b>.", bullet_style))
    story.append(Paragraph("- <b>Implemented dynamic visualizations</b> with <b>Three.js</b> to enhance user engagement.", bullet_style))
    story.append(Paragraph("- <b>Designed responsive layouts</b> with CSS, HTML, and JS to ensure optimal user experience across devices.", bullet_style))
    story.append(Paragraph("<b>Technologies / Tools Used :</b> Express, SQLite, Three.js, CSS, HTML, JS", body_style))

    # ------------------ SKILLS ------------------
    add_section_header("SKILLS")

    skills = [
        ("Databases :", "MySQL, MongoDB"),
        ("Frameworks &amp; Libraries :", "React, Tailwind CSS, Three.js, Framer Motion, GSAP"),
        ("Languages :", "English, Hindi"),
        ("Programming Languages :", "Java, TypeScript"),
        ("Soft Skills :", "Wireframing, Prototyping, User-Centered Design, User Flow Mapping, Visual Composition"),
        ("Tools &amp; Platforms :", "Git, GitHub, Vite"),
    ]

    skills_table_data = []
    for label, items in skills:
        skills_table_data.append([
            Paragraph(f"<b>{label}</b>", left_style),
            Paragraph(items, left_style)
        ])

    t_skills = Table(skills_table_data, colWidths=[48*mm, 138*mm])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
    ]))
    story.append(t_skills)

    # ------------------ AWARDS & ACHIEVEMENTS ------------------
    add_section_header("AWARDS &amp; ACHIEVEMENTS")

    awards = [
        "- <b>Semi-Finalist, ET-AI Hackathon 2026</b> - The Economic Times",
        "- <b>Participant:</b> Machine Learning Hackathon (IIT Bhubaneswar)",
        "- <b>Participant:</b> Shaastra Smart City Challenge (IIT Madras)",
        "- <b>Participant:</b> Project Horizon: GPAI Case Competition (IIT Madras)",
        "- <b>Participant:</b> EY Techathon 6.0 (EY)",
        "- <b>Participant:</b> HackWithUttarPradesh 2025 (Chandigarh University)",
        "- <b>Participant:</b> Frontend Battle - Vibe Coding Competition (IIT Bhubaneswar)",
        "- <b>Participant:</b> Ethos Hackathons 2025 (IIT Guwahati)",
        "- <b>Participant:</b> HP Power Lab 2.0 (HPCL)",
    ]

    for award in awards:
        story.append(Paragraph(award, bullet_style))

    doc.build(story)
    print('[OK] Resume PDF generated with exact Tinos fonts at ' + os.path.abspath(OUTPUT))

if __name__ == '__main__':
    build_pdf()
