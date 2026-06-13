import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const INFO = [
  { icon: '🎓', label: 'Current Status', value: '3rd Year, 1st Semester — AI Specialization' },
  { icon: '🏛️', label: 'Education', value: 'BSc (Hons) in IT — SLIIT' },
  { icon: '🔬', label: 'Learning Focus', value: 'Machine Learning, Python, Data Science' },
  { icon: '📧', label: 'Email', value: 'vijayakumarvithusan2912@gmail.com' },
  { icon: '📍', label: 'Location', value: 'Colombo, Sri Lanka' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-label">Who I Am</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">AI Enthusiast &amp; Aspiring Machine Learning Engineer</p>
        </motion.div>

        <div className="about__grid">
          {/* Text */}
          <motion.div
            className="about__text"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="about__subheading">My Academic Journey</h3>
            <p className="about__intro">
              I am an AI Enthusiast deeply passionate about machine learning, algorithms, and intelligent systems. I believe in hands-on exploration to understand how these technologies work.
            </p>

            <motion.div
              className="education-timeline"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.3, delayChildren: 0.4 } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.div
                className="timeline-item"
                variants={{
                  hidden: { opacity: 0.2, x: -10, filter: 'brightness(0.5)' },
                  show: { opacity: 1, x: 0, filter: 'brightness(1)', transition: { duration: 0.4 } }
                }}
              >
                <div className="timeline-dot" aria-hidden="true"></div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">2023 — Present</span>
                  <h4 className="timeline-title">BSc (Hons) in IT</h4>
                  <p className="timeline-school">Sri Lanka Institute of Information Technology (SLIIT)</p>
                  <p className="timeline-desc">
                    Specialising in Artificial Intelligence. Currently in my 3rd year, 1st Semester. Building a strong foundation in machine learning, algorithms, and intelligent systems development.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="timeline-item"
                variants={{
                  hidden: { opacity: 0.2, x: -10, filter: 'brightness(0.5)' },
                  show: { opacity: 1, x: 0, filter: 'brightness(1)', transition: { duration: 0.4 } }
                }}
              >
                <div className="timeline-dot" aria-hidden="true"></div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">Completed</span>
                  <h4 className="timeline-title">AI / ML Stage 1</h4>
                  <p className="timeline-school">SLIIT Certification</p>
                  <p className="timeline-desc">
                    Gained foundational knowledge in data analysis, model training, and basic AI applications.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <div className="about__stats">
              {[
                { num: '10+', desc: 'Projects Built' },
                { num: '2+', desc: 'ML Experiments' },
                { num: '2', desc: 'Certification' },
              ].map(s => (
                <div key={s.desc} className="about__stat">
                  <span className="stat-num gradient-text">{s.num}</span>
                  <span className="stat-desc">{s.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="about__info"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {INFO.map(({ icon, label, value }) => (
              <motion.div key={label} className="info-card glass-card" variants={itemVariant}>
                <span className="info-card__icon" aria-hidden="true">{icon}</span>
                <div className="info-card__text">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  );
}
