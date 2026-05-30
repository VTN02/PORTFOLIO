import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiReact, SiTailwindcss, SiSpringboot,
  SiPython, SiC, SiScikitlearn, SiPandas, SiNumpy, 
  SiJupyter, SiN8N, SiTensorflow, SiPytorch
} from 'react-icons/si';
import {
  FaHtml5, FaJava, FaDatabase, FaChartLine, FaBrain, FaEye
} from 'react-icons/fa6';
import './CV.css';

const SKILLS = [
  {
    category: 'Web Development',
    color: 'indigo',
    items: [
      { name: 'HTML/CSS', icon: FaHtml5 },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'React', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Spring Boot', icon: SiSpringboot },
    ],
  },
  {
    category: 'Programming Languages',
    color: 'indigo',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: FaJava },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'C', icon: SiC },
      { name: 'SQL', icon: FaDatabase },
    ],
  },
  {
    category: 'AI/ML & Data Science',
    color: 'indigo',
    items: [
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'Pandas', icon: SiPandas },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'Matplotlib', icon: FaChartLine },
      { name: 'Jupyter', icon: SiJupyter },
      { name: 'n8n', icon: SiN8N },
    ],
  },
  {
    category: 'Currently Learning',
    color: 'violet',
    items: [
      { name: 'Deep Learning', icon: FaBrain },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'Computer Vision', icon: FaEye },
    ],
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
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let animationId;
    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDragging = true;
      setIsPaused(true);
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDragging = false;
      setIsPaused(false);
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsPaused(false);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    const scroll = () => {
      if (!isPaused && !isDragging) {
        el.scrollLeft += 1;
        // Reset to start for infinite loop when reaching half width
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPaused]);

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
              <motion.ul 
                className="cv__edu-list"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.3, delayChildren: 0.3 } }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                {[
                  "Focusing on machine learning fundamentals, algorithms, and data structures",
                  "Completed AI/ML Engineer Stage 1 certification program",
                  "Active participant in coding competitions and tech workshops",
                  "Building practical projects to apply theoretical knowledge"
                ].map((text, idx) => (
                  <motion.li 
                    key={idx}
                    variants={{
                      hidden: { opacity: 0.2, x: -10, filter: 'brightness(0.5)' },
                      show:   { opacity: 1, x: 0, filter: 'brightness(1)', transition: { duration: 0.4 } }
                    }}
                  >
                    {text}
                  </motion.li>
                ))}
              </motion.ul>
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
                        key={item.name}
                        className={`tech-badge tech-badge--${color}`}
                        variants={badgePop}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <item.icon size={14} />
                        {item.name}
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
              <div 
                className="cv__tools-grid"
                ref={carouselRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                {[...AI_TOOLS, ...AI_TOOLS].map(({ icon, title, desc }, idx) => (
                  <motion.div
                    key={`${title}-${idx}`}
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
