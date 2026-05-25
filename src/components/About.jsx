import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const INFO = [
  { icon: '🎓', label: 'Current Status', value: '2nd Year, 2nd Semester — AI Specialization' },
  { icon: '🏛️', label: 'Education',       value: 'BSc (Hons) in IT — SLIIT' },
  { icon: '🔬', label: 'Learning Focus',  value: 'Machine Learning, Python, Data Science' },
  { icon: '📧', label: 'Email',           value: 'vijayakumarvithusan2912@gmail.com' },
  { icon: '📍', label: 'Location',        value: 'Colombo, Sri Lanka' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden:  { opacity: 0, x: 30 },
  show:    { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.4,0,0.2,1] } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  show:    { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.4,0,0.2,1] } },
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
            <h3 className="about__subheading">Building My Future in Artificial Intelligence</h3>
            <p>
              I am a 2nd year undergraduate student specialising in Artificial Intelligence
              at the Sri Lanka Institute of Information Technology (SLIIT). Currently in my
              4th semester, I&apos;m actively building my foundation in machine learning,
              algorithms, and intelligent systems development.
            </p>
            <p>
              My journey in AI has just begun, and I&apos;m passionate about learning and
              exploring this fascinating field. I&apos;m currently developing skills in Python,
              data structures, algorithms, and fundamental ML concepts. Through my AI/ML
              Stage&nbsp;1 certification at SLIIT, I&apos;ve gained foundational knowledge in
              data analysis, model training, and basic AI applications.
            </p>
            <p>
              I&apos;m constantly exploring emerging AI tools and technologies — from
              experimenting with ChatGPT and Claude for learning assistance, to exploring
              image generation and AI coding assistants. I believe in hands-on exploration
              to understand how these technologies work.
            </p>
            <p>
              I&apos;m eager to dive deeper into deep learning, neural networks, computer
              vision, and NLP. While still in the early stages of my AI journey, I&apos;m
              committed to continuous learning and building practical projects.
            </p>

            <div className="about__stats">
              {[
                { num: '4+',  desc: 'Projects Built' },
                { num: '7+',  desc: 'ML Experiments' },
                { num: '1',   desc: 'Certification' },
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

        {/* Image at the end of About */}
        <motion.div
          className="about__image-wrap"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="about__portrait-wrap">
            <div className="about__portrait-ring about__portrait-ring--1" aria-hidden="true" />
            <div className="about__portrait-ring about__portrait-ring--2" aria-hidden="true" />
            <div className="about__portrait-glow" aria-hidden="true" />
            <img src="/hero.jpg" alt="Vithusan Vijayakumar" className="about__portrait-img" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
