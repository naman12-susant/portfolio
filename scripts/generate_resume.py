"""Generate exact replica of Susant Kumar's Resume PDF with Times font and clickable links."""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'Susant_Kumar_Resume.pdf')

def build_pdf():
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    
    # Target 1-page document with standard margins
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=10 * mm,
        bottomMargin=10 * mm
    )

    styles = getSampleStyleSheet()

    # Custom Paragraph Styles using Times-Roman / Times-Bold / Times-Italic font family
    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=HexColor('#000000')
    )

    subtitle_style = ParagraphStyle(
        'HeaderSubtitle',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=10,
        leading=12,
        alignment=TA_CENTER,
        textColor=HexColor('#222222'),
        spaceBefore=2
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=HexColor('#000000'),
        spaceBefore=3
    )

    section_head_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10.5,
        leading=12,
        textColor=HexColor('#000000'),
        spaceBefore=8,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=10.8,
        textColor=HexColor('#000000'),
        spaceAfter=3
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=10.6,
        leftIndent=12,
        firstLineIndent=-12,
        textColor=HexColor('#000000'),
        spaceAfter=2
    )

    left_style = ParagraphStyle(
        'TableLeft',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=10.5,
        alignment=TA_LEFT,
        textColor=HexColor('#000000')
    )

    right_style = ParagraphStyle(
        'TableRight',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=10.5,
        alignment=TA_RIGHT,
        textColor=HexColor('#000000')
    )

    story = []

    # ------------------ HEADER ------------------
    story.append(Paragraph("Susant Kumar", title_style))
    story.append(Paragraph("Aspiring UX/UI Designer & Frontend Developer", subtitle_style))
    
    contact_line = (
        '📞 <a href="tel:8420012233">8420012233</a> &nbsp;&nbsp;'
        '✉ <a href="mailto:susantnaman@gmail.com">susantnaman@gmail.com</a> &nbsp;&nbsp;'
        '🔗 <a href="https://www.linkedin.com/in/susant-kumar-510687356">susant-kumar-510687356</a> &nbsp;&nbsp;'
        '🔗 <a href="https://github.com/naman12-susant">naman12-susant</a> &nbsp;&nbsp;'
        '🔗 <a href="https://portfolio-rndb.onrender.com">portfolio-rndb</a>'
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(Paragraph("📍 Kolkata, India", contact_style))
    story.append(Spacer(1, 4))

    def add_section_header(title):
        story.append(Paragraph(title, section_head_style))
        story.append(HRFlowable(width="100%", thickness=0.8, color=HexColor('#000000'), spaceBefore=1, spaceAfter=4))

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
            Paragraph("<b>CGPA : 6.5</b>", right_style)
        ]
    ]
    t_edu = Table(edu_table_data, colWidths=[130*mm, 52*mm])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_edu)
    story.append(Paragraph("• <b>Expected graduation:</b> May 2027", bullet_style))

    # ------------------ PROJECTS ------------------
    add_section_header("PROJECTS")

    # Project 1: TalentForge
    p1_table_data = [
        [
            Paragraph('<b>TalentForge — AI Mock Interview & Resume Optimization Platform</b> | <a href="https://ai-mock-interview-1-2zpu.onrender.com" color="#0000EE"><u>Website</u></a>', left_style),
            Paragraph("Apr 2026 - Present", right_style)
        ]
    ]
    t_p1 = Table(p1_table_data, colWidths=[135*mm, 47*mm])
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
    story.append(Paragraph("• <b>Designed user-centered interfaces</b> and workflows for resume analysis and mock interview experiences, translating complex AI feedback into clear, actionable steps.", bullet_style))
    story.append(Paragraph("• <b>Engineered dynamic AI interviews</b> with adaptive questioning and real-time feedback to enhance user engagement.", bullet_style))
    story.append(Paragraph("• <b>Implemented</b> resume validation, multi-format text extraction, interview attempt tracking, and user authentication to ensure a seamless user experience.", bullet_style))
    story.append(Paragraph("• <b>Facilitated downloads of optimized resumes</b> tailored for specific job roles.", bullet_style))
    story.append(Paragraph("<b>Technologies / Tools Used :</b> React, TypeScript, Node.js, Python, MongoDB, Groq AI, Tailwind CSS, REST APIs, WebSockets", body_style))
    story.append(Spacer(1, 3))

    # Project 2: raw-power-athletics
    p2_table_data = [
        [
            Paragraph('<b>raw-power-athletics</b> | <a href="https://raw-power-athletics.onrender.com" color="#0000EE"><u>Website</u></a>', left_style),
            Paragraph("Aug 2026 - Present", right_style)
        ]
    ]
    t_p2 = Table(p2_table_data, colWidths=[135*mm, 47*mm])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_p2)
    story.append(Paragraph("<i>Self Project</i>", body_style))
    story.append(Paragraph("• <b>Developed</b> a comprehensive web application for athletic training using <b>Express</b> and <b>SQLite</b>.", bullet_style))
    story.append(Paragraph("• <b>Implemented dynamic visualizations</b> with <b>Three.js</b> to enhance user engagement.", bullet_style))
    story.append(Paragraph("• <b>Designed responsive layouts</b> with CSS, HTML, and JS to ensure optimal user experience across devices.", bullet_style))
    story.append(Paragraph("<b>Technologies / Tools Used :</b> Express, SQLite, Three.js, CSS, HTML, JS", body_style))

    # ------------------ SKILLS ------------------
    add_section_header("SKILLS")

    skills = [
        ("Databases :", "MySQL, MongoDB"),
        ("Frameworks & Libraries :", "React, Tailwind CSS, Three.js, Framer Motion, GSAP"),
        ("Languages :", "English, Hindi"),
        ("Programming Languages :", "Java, TypeScript"),
        ("Soft Skills :", "Wireframing, Prototyping, User-Centered Design, User Flow Mapping, Visual Composition"),
        ("Tools & Platforms :", "Git, GitHub, Vite"),
    ]

    skills_table_data = []
    for label, items in skills:
        skills_table_data.append([
            Paragraph(f"<b>{label}</b>", left_style),
            Paragraph(items, left_style)
        ])
    
    t_skills = Table(skills_table_data, colWidths=[48*mm, 134*mm])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_skills)

    # ------------------ AWARDS & ACHIEVEMENTS ------------------
    add_section_header("AWARDS & ACHIEVEMENTS")

    awards = [
        "• <b>Semi-Finalist, ET-AI Hackathon 2026</b> – The Economic Times",
        "• <b>Participant:</b> Machine Learning Hackathon (IIT Bhubaneswar)",
        "• <b>Participant:</b> Shaastra Smart City Challenge (IIT Madras)",
        "• <b>Participant:</b> Project Horizon: GPAI Case Competition (IIT Madras)",
        "• <b>Participant:</b> EY Techathon 6.0 (EY)",
        "• <b>Participant:</b> HackWithUttarPradesh 2025 (Chandigarh University)",
        "• <b>Participant:</b> Frontend Battle – Vibe Coding Competition (IIT Bhubaneswar)",
        "• <b>Participant:</b> Ethos Hackathons 2025 (IIT Guwahati)",
        "• <b>Participant:</b> HP Power Lab 2.0 (HPCL)",
    ]

    for award in awards:
        story.append(Paragraph(award, bullet_style))

    doc.build(story)
    print(f'[OK] Perfect Resume PDF generated at {os.path.abspath(OUTPUT)}')

if __name__ == '__main__':
    build_pdf()
