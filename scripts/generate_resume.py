"""Generate exact replica of Susant Kumar's Resume PDF."""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'Susant_Kumar_Resume.pdf')

# Page dimensions
W, H = A4  # 210 x 297 mm
LEFT_MARGIN = 15 * mm
RIGHT_MARGIN = W - 15 * mm
USABLE_WIDTH = RIGHT_MARGIN - LEFT_MARGIN

# Colors
BLACK = HexColor('#000000')
DARK_GRAY = HexColor('#222222')

def draw_resume(c: canvas.Canvas):
    y = H - 15 * mm

    # ==================== HEADER ====================
    # Name - Center aligned, Serif font (Times-Bold)
    c.setFont('Times-Bold', 22)
    c.setFillColor(BLACK)
    c.drawCentredString(W / 2.0, y, 'Susant Kumar')
    y -= 5 * mm

    # Subtitle - Center aligned, Times-Italic
    c.setFont('Times-Italic', 10.5)
    c.setFillColor(DARK_GRAY)
    c.drawCentredString(W / 2.0, y, 'Aspiring UX/UI Designer & Frontend Developer')
    y -= 4.5 * mm

    # Contact Info line - Center aligned
    c.setFont('Helvetica', 8.5)
    c.setFillColor(BLACK)
    contact_str = "8420012233   susantnaman@gmail.com   susant-kumar-510687356   naman12-susant   portfolio-rndb"
    c.drawCentredString(W / 2.0, y, contact_str)
    y -= 3.8 * mm

    # Location line - Center aligned
    c.setFont('Helvetica', 8.5)
    c.drawCentredString(W / 2.0, y, "Kolkata, India")
    y -= 5 * mm

    # Helper function for section headings
    def section_heading(title_text):
        nonlocal y
        c.setFont('Helvetica-Bold', 10.5)
        c.setFillColor(BLACK)
        c.drawString(LEFT_MARGIN, y, title_text)
        y -= 1.5 * mm
        c.setStrokeColor(BLACK)
        c.setLineWidth(0.8)
        c.line(LEFT_MARGIN, y, RIGHT_MARGIN, y)
        y -= 3.8 * mm

    # Helper function to wrap text
    def draw_wrapped_text(text, font_name, font_size, leading, is_bold_prefix=None):
        nonlocal y
        c.setFont(font_name, font_size)
        c.setFillColor(BLACK)
        
        words = text.split(' ')
        line = ""
        for word in words:
            test_line = (line + " " + word).strip()
            if c.stringWidth(test_line, font_name, font_size) > USABLE_WIDTH:
                c.drawString(LEFT_MARGIN, y, line)
                y -= leading
                line = word
            else:
                line = test_line
        if line:
            c.drawString(LEFT_MARGIN, y, line)
            y -= leading

    def draw_bullet_item(text, font_name='Helvetica', font_size=8.2, leading=3.4*mm, indent=4*mm):
        nonlocal y
        bullet_char = "•"
        c.setFont('Helvetica-Bold', font_size)
        c.drawString(LEFT_MARGIN, y, bullet_char)
        
        c.setFont(font_name, font_size)
        c.setFillColor(BLACK)
        
        available_w = USABLE_WIDTH - indent
        words = text.split(' ')
        line = ""
        first_line = True
        for word in words:
            test_line = (line + " " + word).strip()
            if c.stringWidth(test_line, font_name, font_size) > available_w:
                x_pos = LEFT_MARGIN + indent if first_line else LEFT_MARGIN + indent
                c.drawString(x_pos, y, line)
                y -= leading
                line = word
                first_line = False
            else:
                line = test_line
        if line:
            x_pos = LEFT_MARGIN + indent
            c.drawString(x_pos, y, line)
            y -= leading

    # ==================== PROFESSIONAL SUMMARY ====================
    section_heading('PROFESSIONAL SUMMARY')
    
    # We will draw summary with bold words where appropriate (or clean formatted text)
    # Exact text from user resume:
    summary_p1 = "Aspiring UX/UI designer and frontend developer with a user-centered design mindset and hands-on experience in building intuitive interfaces using React and Tailwind CSS. Passionate about applying human-centered design principles in AI-driven products, demonstrated by developing an end-to-end AI-powered career platform. Proficient in independent work and clear communication through documentation, presentations, and collaborative hackathons. Seeking to advance into a UX/UI-focused role and deepen expertise in design systems, prototyping, and data-informed design practices."
    draw_wrapped_text(summary_p1, 'Helvetica', 8.2, 3.4*mm)
    y -= 2 * mm

    # ==================== EDUCATIONS ====================
    section_heading('EDUCATIONS')

    # Line 1: School | Location (Left) and Dates (Right)
    c.setFont('Helvetica-Bold', 9)
    c.drawString(LEFT_MARGIN, y, "Bengal Institute of Technology (Techno India Group)")
    school_w = c.stringWidth("Bengal Institute of Technology (Techno India Group)", 'Helvetica-Bold', 9)
    c.setFont('Helvetica', 9)
    c.drawString(LEFT_MARGIN + school_w, y, " | Kolkata, India")
    c.drawString(RIGHT_MARGIN - c.stringWidth("Sep 2023 - Jul 2027", 'Helvetica', 9), y, "Sep 2023 - Jul 2027")
    y -= 3.6 * mm

    # Line 2: Degree (Left) and CGPA (Right)
    c.setFont('Helvetica-Oblique', 8.5)
    c.drawString(LEFT_MARGIN, y, "Bachelor of Technology (B.Tech) in Information Technology")
    c.setFont('Helvetica', 8.5)
    cgpa_str = "CGPA : 6.5"
    c.drawString(RIGHT_MARGIN - c.stringWidth(cgpa_str, 'Helvetica', 8.5), y, cgpa_str)
    y -= 3.6 * mm

    # Line 3: Bullet - Expected graduation
    draw_bullet_item("Expected graduation: May 2027", 'Helvetica', 8.2, 3.4*mm)
    y -= 2 * mm

    # ==================== PROJECTS ====================
    section_heading('PROJECTS')

    # Project 1: TalentForge
    c.setFont('Helvetica-Bold', 9)
    p1_title = "TalentForge — AI Mock Interview & Resume Optimization Platform | "
    c.drawString(LEFT_MARGIN, y, p1_title)
    p1_title_w = c.stringWidth(p1_title, 'Helvetica-Bold', 9)
    c.setFont('Helvetica', 9)
    c.drawString(LEFT_MARGIN + p1_title_w, y, "Website")
    dates_p1 = "Apr 2026 - Present"
    c.drawString(RIGHT_MARGIN - c.stringWidth(dates_p1, 'Helvetica', 9), y, dates_p1)
    y -= 3.5 * mm

    c.setFont('Helvetica-Oblique', 8.5)
    c.drawString(LEFT_MARGIN, y, "Self Project")
    y -= 3.5 * mm

    draw_wrapped_text("Developed a full-stack AI-powered career preparation platform to assess resumes against target roles, identify skill gaps, and generate customized resume content.", 'Helvetica', 8.2, 3.4*mm)
    
    draw_bullet_item("Designed user-centered interfaces and workflows for resume analysis and mock interview experiences, translating complex AI feedback into clear, actionable steps.", 'Helvetica', 8.2, 3.4*mm)
    draw_bullet_item("Engineered dynamic AI interviews with adaptive questioning and real-time feedback to enhance user engagement.", 'Helvetica', 8.2, 3.4*mm)
    draw_bullet_item("Implemented resume validation, multi-format text extraction, interview attempt tracking, and user authentication to ensure a seamless user experience.", 'Helvetica', 8.2, 3.4*mm)
    draw_bullet_item("Facilitated downloads of optimized resumes tailored for specific job roles.", 'Helvetica', 8.2, 3.4*mm)

    c.setFont('Helvetica-Bold', 8.2)
    tech_label = "Technologies / Tools Used : "
    c.drawString(LEFT_MARGIN, y, tech_label)
    tech_w = c.stringWidth(tech_label, 'Helvetica-Bold', 8.2)
    c.setFont('Helvetica', 8.2)
    c.drawString(LEFT_MARGIN + tech_w, y, "React, TypeScript, Node.js, Python, MongoDB, Groq AI, Tailwind CSS, REST APIs, WebSockets")
    y -= 4.5 * mm

    # Project 2: raw-power-athletics
    c.setFont('Helvetica-Bold', 9)
    p2_title = "raw-power-athletics | "
    c.drawString(LEFT_MARGIN, y, p2_title)
    p2_title_w = c.stringWidth(p2_title, 'Helvetica-Bold', 9)
    c.setFont('Helvetica', 9)
    c.drawString(LEFT_MARGIN + p2_title_w, y, "Website")
    dates_p2 = "Aug 2026 - Present"
    c.drawString(RIGHT_MARGIN - c.stringWidth(dates_p2, 'Helvetica', 9), y, dates_p2)
    y -= 3.5 * mm

    c.setFont('Helvetica-Oblique', 8.5)
    c.drawString(LEFT_MARGIN, y, "Self Project")
    y -= 3.5 * mm

    draw_bullet_item("Developed a comprehensive web application for athletic training using Express and SQLite.", 'Helvetica', 8.2, 3.4*mm)
    draw_bullet_item("Implemented dynamic visualizations with Three.js to enhance user engagement.", 'Helvetica', 8.2, 3.4*mm)
    draw_bullet_item("Designed responsive layouts with CSS, HTML, and JS to ensure optimal user experience across devices.", 'Helvetica', 8.2, 3.4*mm)

    c.setFont('Helvetica-Bold', 8.2)
    c.drawString(LEFT_MARGIN, y, tech_label)
    c.setFont('Helvetica', 8.2)
    c.drawString(LEFT_MARGIN + tech_w, y, "Express, SQLite, Three.js, CSS, HTML, JS")
    y -= 4.5 * mm

    # ==================== SKILLS ====================
    section_heading('SKILLS')

    skills_data = [
        ("Databases :", "MySQL, MongoDB"),
        ("Frameworks & Libraries :", "React, Tailwind CSS, Three.js, Framer Motion, GSAP"),
        ("Languages :", "English, Hindi"),
        ("Programming Languages :", "Java, TypeScript"),
        ("Soft Skills :", "Wireframing, Prototyping, User-Centered Design, User Flow Mapping, Visual Composition"),
        ("Tools & Platforms :", "Git, GitHub, Vite"),
    ]

    for label, val in skills_data:
        c.setFont('Helvetica-Bold', 8.2)
        c.drawString(LEFT_MARGIN, y, label)
        c.setFont('Helvetica', 8.2)
        c.drawString(LEFT_MARGIN + 45 * mm, y, val)
        y -= 3.5 * mm
    y -= 2 * mm

    # ==================== AWARDS & ACHIEVEMENTS ====================
    section_heading('AWARDS & ACHIEVEMENTS')

    awards_list = [
        "Semi-Finalist, ET-AI Hackathon 2026 – The Economic Times",
        "Participant: Machine Learning Hackathon (IIT Bhubaneswar)",
        "Participant: Shaastra Smart City Challenge (IIT Madras)",
        "Participant: Project Horizon: GPAI Case Competition (IIT Madras)",
        "Participant: EY Techathon 6.0 (EY)",
        "Participant: HackWithUttarPradesh 2025 (Chandigarh University)",
        "Participant: Frontend Battle – Vibe Coding Competition (IIT Bhubaneswar)",
        "Participant: Ethos Hackathons 2025 (IIT Guwahati)",
        "Participant: HP Power Lab 2.0 (HPCL)",
    ]

    for award in awards_list:
        draw_bullet_item(award, 'Helvetica', 8.2, 3.2*mm)


def main():
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    c = canvas.Canvas(OUTPUT, pagesize=A4)
    c.setTitle('Susant Kumar - Resume')
    c.setAuthor('Susant Kumar')
    draw_resume(c)
    c.save()
    print(f'[OK] Exact Resume PDF saved to {os.path.abspath(OUTPUT)}')


if __name__ == '__main__':
    main()
