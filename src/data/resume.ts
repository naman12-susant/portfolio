export const resume = {
  name: 'Susant Kumar',
  title: 'UX/UI Designer & Frontend Developer',
  email: 'susantnaman@gmail.com',
  phone: '+91 8420012233',
  location: '',
  linkedin: 'https://www.linkedin.com/in/susant-kumar-510687356',
  github: 'https://github.com/susantkumar',
  instagram: 'https://www.instagram.com/susant_art__/',
  instagram2: 'https://www.instagram.com/susant.____/',
  summary:
    'Aspiring UX/UI designer and frontend developer with a user-centered design mindset and hands-on experience building intuitive interfaces with React and Tailwind CSS. Curious about human-centered design in AI-driven products — demonstrated by shipping an end-to-end AI-powered career platform.',
  seeking:
    'Seeking a UX/UI-focused role to deepen expertise in design systems, prototyping, and data-informed design.',
  education: {
    institution: 'Bengal Institute of Technology (Techno India Group)',
    location: '',
    degree: 'Bachelor of Technology (B.Tech) in Information Technology',
  },
  projects: [
    {
      id: 'talentforge',
      title: 'TalentForge',
      subtitle: 'AI Mock Interview & Resume Optimization Platform',
      period: 'Apr 2026 — Present',
      type: 'Self Project',
      accent: '#e8a87c',
      url: 'https://ai-mock-interview-1-2zpu.onrender.com',
      description:
        'Full-stack AI career preparation platform that assesses resumes against target roles, identifies skill gaps, and generates customized resume content.',
      highlights: [
        'User-centered workflows for resume analysis and mock interviews',
        'Dynamic AI interviews with adaptive questioning and real-time feedback',
        'Resume validation, multi-format extraction, and attempt tracking',
        'Optimized resume downloads tailored to specific job roles',
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'Groq AI', 'Tailwind CSS', 'WebSockets'],
    },
    {
      id: 'raw-power',
      title: 'Raw Power Athletics',
      subtitle: 'Interactive Athletic Training Web App',
      period: 'Aug 2026 — Present',
      type: 'Self Project',
      accent: '#2dd4bf',
      url: 'https://raw-power-athletics.onrender.com',
      description:
        'Athletic training web app with dynamic Three.js visualizations and responsive layouts across devices.',
      highlights: [
        'Express + SQLite backend for training data',
        'Interactive 3D visualizations with Three.js',
        'Responsive CSS, HTML, and JS across desktop and mobile',
      ],
      tech: ['Express', 'SQLite', 'Three.js', 'HTML', 'CSS', 'JavaScript'],
    },
  ],
  skills: [
    {
      name: 'Design',
      items: ['Wireframing', 'Prototyping', 'User-Centered Design', 'User Flow Mapping', 'Visual Composition'],
    },
    {
      name: 'Frontend',
      items: ['React', 'TypeScript', 'Java', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
      name: 'Backend',
      items: ['Node.js', 'Python', 'MongoDB', 'MySQL', 'REST APIs', 'WebSockets'],
    },
    {
      name: 'Tools',
      items: ['Git', 'GitHub', 'Three.js', 'Groq AI', 'Vite'],
    },
  ],
  awards: [
    { title: 'Finalist', org: 'India Innovates 2026 — National-Level Hackathon', tier: 'gold' as const },
    { title: 'Semi-Finalist', org: 'ET-AI Hackathon 2026 — The Economic Times', tier: 'silver' as const },
    { title: 'Participant', org: 'Machine Learning Hackathon — IIT Bhubaneswar', tier: 'base' as const },
    { title: 'Participant', org: 'Shaastra Smart City Challenge — IIT Madras', tier: 'base' as const },
    { title: 'Participant', org: 'Project Horizon: GPAI Case Competition — IIT Madras', tier: 'base' as const },
    { title: 'Participant', org: 'EY Techathon 6.0 — EY', tier: 'base' as const },
    { title: 'Participant', org: 'HackWithUttarPradesh 2025 — Chandigarh University', tier: 'base' as const },
    { title: 'Participant', org: 'Frontend Battle (Vibe Coding) — IIT Bhubaneswar', tier: 'base' as const },
    { title: 'Participant', org: 'Ethos Hackathons 2025 — IIT Guwahati', tier: 'base' as const },
    { title: 'Participant', org: 'HP Power Lab 2.0 — HPCL', tier: 'base' as const },
  ],
} as const
