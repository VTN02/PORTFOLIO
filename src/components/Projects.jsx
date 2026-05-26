import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight, FaGlobe, FaLock } from 'react-icons/fa6';
import './Projects.css';

const MAIN_PROJECTS = [
  {
    title: 'School Management System',
    desc: 'A web-based school management system for handling student records, attendance, classes, and grading. Built to streamline administrative tasks and improve parent-teacher communication.',
    tech: ['HTML/CSS', 'JavaScript', 'Spring Boot', 'MySQL'],
    image: '/images/school_management.png',
    repo: 'https://github.com/VTN02/school_management_system',
  },
  {
    title: 'Campus Bike Rental Management System',
    desc: 'A comprehensive web-based platform for managing campus bike rentals. Features admin dashboard for inventory management, rental tracking, user management, and ride history.',
    tech: ['HTML/CSS', 'JavaScript', 'Spring Boot', 'MongoDB'],
    image: '/images/bike_rental.png',
    repo: 'https://github.com/VTN02/bikerentalsystem',
  },
  {
    title: 'Personal Portfolio Website',
    desc: 'A modern, responsive portfolio website showcasing projects, skills, and learning journey. Features AI-themed design with neural network animations, interactive UI elements, and smooth transitions.',
    tech: ['React', 'Framer Motion', 'Firebase', 'Vite'],
    image: '/images/portfolio_web.png',
    repo: 'https://github.com/VTN02/VTN_PORTFOLIO',
  },
];

const WEB_PROJECTS = [
  {
    title: 'VCollab',
    desc: 'A collaborative platform for teams. Features modern dashboard interfaces, interactive tools, and real-time synchronization.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/images/vcollab.png',
    link: 'https://vcollab-beta.vercel.app/',
    repo: 'https://github.com/VTN02/VCollab',
    locked: false,
  }
];

const ML_PROJECTS = [
  { icon: '📧', title: 'Spam Mail Prediction', desc: 'Email classification model to identify spam messages using Naive Bayes and NLP feature extraction.', tech: ['Python', 'Scikit-learn', 'NLP'] },
  { icon: '🩺', title: 'Diabetes Prediction', desc: 'Predictive model to classify diabetes risk using logistic regression, decision trees, and ensemble methods.', tech: ['Python', 'Pandas', 'Scikit-learn'] },
  { icon: '🪨', title: 'Rock vs Mine Prediction', desc: 'Sonar signal classification using logistic regression for binary classification problems.', tech: ['Python', 'Scikit-learn', 'Signal Processing'] },
  { icon: '🛒', title: 'BigMart Sales Prediction', desc: 'Sales forecasting model for retail data involving feature engineering and regression techniques.', tech: ['Python', 'Pandas', 'Regression'] },
  { icon: '💳', title: 'Loan Status Prediction', desc: 'Loan approval prediction model involving data cleaning, missing value handling, and classification.', tech: ['Python', 'Data Cleaning', 'Classification'] },
  { icon: '🏠', title: 'House Price Prediction', desc: 'Real estate price prediction using multiple regression exploring property attributes and market value.', tech: ['Python', 'Regression', 'Feature Engineering'] },
  { icon: '❤️', title: 'Heart Disease Prediction', desc: 'Medical prediction model to assess heart disease risk from patient health metrics using classification.', tech: ['Python', 'Scikit-learn', 'Healthcare ML'] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

function ProjectCard({ project, index }) {
  const videoRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.article
      className="project-card glass-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__media">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="project-card__video"
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-card__image"
          />
        ) : (
          <div className="project-card__placeholder">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
        <div className="project-card__overlay" aria-hidden="true" />
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p
          className={`project-card__desc ${expanded ? 'project-card__desc--expanded' : ''}`}
          onClick={() => setExpanded(v => !v)}
          title={expanded ? 'Click to collapse' : 'Click to read more'}
        >
          {project.desc}
          {!expanded && <span className="desc-more"> ...more</span>}
        </p>
        <div className="project-card__tech">
          {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>
        <a
          href={project.repo}
          className="project-card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={16} />
          <span>View Repository</span>
          <FaArrowRight size={13} />
        </a>
      </div>
    </motion.article>
  );
}

function MLCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const toggle = () => {
    setLiked(l => !l);
    setCount(c => liked ? c - 1 : c + 1);
  };

  return (
    <motion.article
      className="ml-card glass-card"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.5)' }}
    >
      <div className="ml-card__header">
        <h4 className="ml-card__title">
          <span aria-hidden="true">{project.icon}</span> {project.title}
        </h4>
        <button
          className={`like-btn ${liked ? 'like-btn--active' : ''}`}
          onClick={toggle}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <span>{liked ? '♥' : '♡'}</span>
          <span className="like-count">{count}</span>
        </button>
      </div>
      <p
        className={`ml-card__desc ${expanded ? 'ml-card__desc--expanded' : ''}`}
        onClick={() => setExpanded(v => !v)}
        title={expanded ? 'Click to collapse' : 'Click to read more'}
      >
        {project.desc}
        {!expanded && <span className="desc-more"> ...more</span>}
      </p>
      <div className="ml-card__tech">
        {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
      </div>
      <a
        href="https://github.com/VTN02"
        className="ml-card__github"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} on GitHub`}
      >
        <FaGithub size={18} />
      </a>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-label">What I&apos;ve Built</span>
          <h2 className="section-title">Projects &amp; Learning Journey</h2>
          <p className="section-subtitle">Academic projects and hands-on learning experiences</p>
        </motion.div>

        {/* Main projects */}
        <div className="projects__grid">
          {MAIN_PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ marginTop: '6rem' }}
        >
          <span className="section-label">Live Deployments</span>
          <h2 className="section-title">Web Development Projects</h2>
          <p className="section-subtitle">Real-world client projects and modern web applications</p>
        </motion.div>

        {/* Web Development projects */}
        <div className="projects__grid">
          {WEB_PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        {/* ML Practice section */}
        <motion.div
          className="ml-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="ml-section__header">
            <h3 className="ml-section__title">
              🔬 Machine Learning Practice Projects
            </h3>
            <p className="ml-section__desc">
              Collection of prediction and classification projects built with Python, Pandas,
              Scikit-learn, and Jupyter. These hands-on projects help me master fundamental
              ML algorithms and data processing techniques.
            </p>
          </div>

          <div className="ml-grid">
            {ML_PROJECTS.map((p, i) => <MLCard key={p.title} project={p} index={i} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
