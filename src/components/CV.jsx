import React from 'react';
import { motion } from 'framer-motion';
import './CV.css';

const SKILLS = [
  {
    category: 'Web Development',
    color: 'indigo',
    items: ['HTML/CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Spring Boot'],
  },
  {
    category: 'Programming Languages',
    color: 'indigo',
    items: ['Python', 'Java', 'JavaScript', 'C', 'SQL'],
  },
  {
    category: 'AI/ML & Data Science',
    color: 'indigo',
    items: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'n8n'],
  },
  {
    category: 'Currently Learning',
    color: 'violet',
    items: ['Deep Learning', 'TensorFlow', 'PyTorch', 'Computer Vision'],
  },
];

const AI_TOOLS = [
  { icon: '🧠', title: 'LLMs & Chatbots',    desc: 'ChatGPT, Claude, Gemini for learning, coding assistance, and understanding NLP.' },
  { icon: '🎨', title: 'Image Generation',    desc: 'Midjourney, DALL-E, Stable Diffusion to understand generative AI and computer vision.' },
  { icon: '💻', title: 'Code Assistants',     desc: 'GitHub Copilot, Cursor for learning best coding practices and rapid prototyping.' },
  { icon: '📊', title: 'Data & Analytics',    desc: 'Google Colab, Jupyter notebooks with AI-powered insights and automation.' },
  { icon: '⚙️', title: 'AI Automation',       desc: 'n8n for building AI-driven workflows and intelligent automation pipelines.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4,0,0.2,1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const badgePop = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

export default function CV() {
  return (
    <section id="cv" className="cv-section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-label">My Background</span>
          <h2 className="section-title">Curriculum Vitae</h2>
          <p className="section-subtitle">My academic journey and professional development</p>
        </motion.div>

        {/* Download */}
        <motion.div
          className="cv__download"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.a
            href="/cv.pdf"
            download="Vithusan_Vijayakumar_CV.pdf"
            className="btn btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>📄</span> Download Full CV (PDF)
          </motion.a>
        </motion.div>

        <div className="cv__grid">
          {/* Education */}
          <motion.div
            className="cv__block"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="cv__block-title"><span>🎓</span> Education</h3>
            <div className="cv__timeline-card glass-card">
              <div className="cv__timeline-bar" aria-hidden="true" />
              <div className="cv__edu-row">
                <div>
                  <h4 className="cv__edu-degree">BSc (Hons) in Information Technology</h4>
                  <p className="cv__edu-uni">Sri Lanka Institute of Information Technology (SLIIT)</p>
                  <p className="cv__edu-spec">Specialization: Artificial Intelligence</p>
                </div>
                <div className="cv__edu-meta">
                  <span className="cv__year">2023 – Present</span>
                  <span className="cv__semester">2nd Year, 4th Semester</span>
                </div>
              </div>
              <ul className="cv__edu-list">
                <li>Focusing on machine learning fundamentals, algorithms, and data structures</li>
                <li>Completed AI/ML Engineer Stage 1 certification program</li>
                <li>Active participant in coding competitions and tech workshops</li>
                <li>Building practical projects to apply theoretical knowledge</li>
              </ul>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="cv__block"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h3 className="cv__block-title"><span>💻</span> Technical Skills</h3>
            <div className="cv__skills-grid">
              {SKILLS.map(({ category, color, items }) => (
                <motion.div
                  key={category}
                  className={`cv__skill-group glass-card cv__skill-group--${color}`}
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <h4 className="cv__skill-cat">{category}</h4>
                  <div className="cv__skill-badges">
                    {items.map(item => (
                      <motion.span
                        key={item}
                        className={`tech-badge tech-badge--${color}`}
                        variants={badgePop}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certification */}
          <motion.div
            className="cv__block"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="cv__block-title"><span>🏆</span> Certifications</h3>
            <div className="cv__cert glass-card">
              <div className="cv__timeline-bar" aria-hidden="true" />
              <div className="cv__cert-row">
                <div className="cv__cert-info">
                  <h4 className="cv__cert-title">AI/ML Engineer — Stage 1</h4>
                  <p className="cv__cert-org">Sri Lanka Institute of Information Technology (SLIIT)</p>
                  <p className="cv__cert-desc">
                    Completed foundational training in artificial intelligence and machine learning,
                    covering data analysis, Python programming, ML algorithms, model training,
                    and AI applications.
                  </p>
                </div>
                <div className="cv__cert-meta">
                  <span className="cv__year">2025</span>
                  <a
                    href="https://code.sliit.org/certificates/4ekqodab53"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    View Credential →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Tools */}
          <motion.div
            className="cv__block"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <h3 className="cv__block-title"><span>🤖</span> AI Tools Exploration</h3>
            <div className="cv__tools-wrap glass-card">
              <p className="cv__tools-intro">
                Actively exploring cutting-edge AI tools to understand their capabilities and applications:
              </p>
              <div className="cv__tools-grid">
                {AI_TOOLS.map(({ icon, title, desc }) => (
                  <motion.div
                    key={title}
                    className="cv__tool"
                    whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.4)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="cv__tool-title">{icon} {title}</h4>
                    <p className="cv__tool-desc">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
