import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowRight, FaGlobe, FaLock, FaChevronDown } from 'react-icons/fa6';
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
    desc: 'A modern, responsive portfolio website showcasing projects, skills, and learning journey. Features an AI chatbot powered by Groq API and an automated contact form managed by n8n workflows.',
    tech: ['Next.js', 'React', 'Firebase', 'n8n', 'Groq API'],
    image: '/images/portfolio_new.png',
    repo: 'https://github.com/VTN02/VTN_PORTFOLIO',
  },
  {
    title: 'Retail Management App',
    desc: 'A comprehensive mobile solution for retail shops featuring user, supplier, product, order, and credit customer management. Integrates AI-powered sales and demand prediction capabilities to optimize operations.',
    tech: ['React Native', 'Node.js', 'MongoDB Atlas', 'Railway', 'AI/ML'],
    locked: true,
  }
];

const WEB_PROJECTS = [
  {
    title: 'Tuition Management System',
    desc: 'A comprehensive platform for tuition centers featuring a powerful admin panel. Administrators can manage student and teacher accounts, update timetables, share resources, and distribute announcement posters.',
    tech: ['Next.js', 'React', 'Supabase'],
    image: '/images/tution.png',
    locked: false,
  },
  {
    title: 'VCollab',
    desc: 'A collaborative platform for teams. Features modern dashboard interfaces, interactive tools, and real-time synchronization.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/images/vcollab_new.jpg',
    link: 'https://vcollab-beta.vercel.app/',
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
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

export const itemPop = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.article
      className="project-card glass-card"
      variants={itemPop}
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
        <div className="project-card__actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {project.link && (
            <a href={project.link} className="project-card__link" target="_blank" rel="noopener noreferrer">
              <FaGlobe size={16} />
              <span>Live Preview</span>
            </a>
          )}
          
          {project.repo && !project.locked ? (
            <div className="project-card__link" style={{ opacity: 0.6, cursor: 'not-allowed', background: 'rgba(255,255,255,0.05)' }} title="Source code is currently unavailable">
              <FaGithub size={16} />
              <span>Source Code</span>
            </div>
          ) : project.locked ? (
            <div className="project-card__link" style={{ opacity: 0.6, cursor: 'not-allowed', background: 'rgba(255,255,255,0.05)' }}>
              <FaLock size={14} />
              <span>Private Source</span>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function MLCard({ project }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Small delay for staggered effect
      const timer = setTimeout(() => setExpanded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const toggle = (e) => {
    e.stopPropagation(); // Prevent card expansion when clicking like
    setLiked(l => !l);
    setCount(c => liked ? c - 1 : c + 1);
  };

  return (
    <motion.article
      ref={cardRef}
      className="ml-card glass-card"
      variants={itemPop}
      whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.5)' }}
    >
      <div 
        className="ml-card__header" 
        style={{ cursor: 'pointer', paddingBottom: expanded ? '0.25rem' : '0' }}
        onClick={() => setExpanded(!expanded)}
      >
        <h4 className="ml-card__title" style={{ flex: 1, paddingRight: '0.5rem' }}>
          <span aria-hidden="true">{project.icon}</span> {project.title}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: 'var(--text-secondary)', display: 'flex' }}
          >
            <FaChevronDown size={14} />
          </motion.div>
          <button
            className={`like-btn ${liked ? 'like-btn--active' : ''}`}
            onClick={toggle}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <span>{liked ? '♥' : '♡'}</span>
            <span className="like-count">{count}</span>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p 
                className="ml-card__desc" 
                style={{ 
                  display: 'block', 
                  WebkitLineClamp: 'unset', 
                  overflow: 'visible',
                  cursor: 'default'
                }}
              >
                {project.desc}
              </p>
              <div className="ml-card__tech">
                {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>
              <div
                className="ml-card__github"
                aria-label={`View ${project.title} on GitHub`}
                style={{ alignSelf: 'flex-end', marginTop: '-0.5rem', opacity: 0.5, cursor: 'not-allowed' }}
                title="Source code is currently unavailable"
              >
                <FaGithub size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Projects() {
  const mlRef = useRef(null);
  const isMlInView = useInView(mlRef, { once: true, margin: "-100px" });
  const [isMlDescOpen, setIsMlDescOpen] = useState(false);

  useEffect(() => {
    if (isMlInView) {
      // Add a slight delay for better visual effect after scrolling
      const timer = setTimeout(() => setIsMlDescOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isMlInView]);

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
        <motion.div 
          className="projects__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {MAIN_PROJECTS.map((p) => <ProjectCard key={p.title} project={p} />)}
        </motion.div>

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
        </motion.div>

        {/* Web Development projects */}
        <motion.div 
          className="projects__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {WEB_PROJECTS.map((p) => <ProjectCard key={p.title} project={p} />)}
        </motion.div>

        {/* ML Practice section */}
        <motion.div
          className="ml-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ml-section__header" ref={mlRef}>
            <div 
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }} 
              onClick={() => setIsMlDescOpen(!isMlDescOpen)}
              title={isMlDescOpen ? 'Click to collapse' : 'Click to expand'}
            >
              <h3 className="ml-section__title" style={{ marginBottom: 0 }}>
                🔬 Machine Learning Practice Projects
              </h3>
              <motion.div
                animate={{ rotate: isMlDescOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: 'var(--accent)', display: 'flex', fontSize: '1.2rem' }}
              >
                <FaChevronDown />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {isMlDescOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="ml-section__desc" style={{ marginTop: '1rem' }}>
                    Collection of prediction and classification projects built with Python, Pandas,
                    Scikit-learn, and Jupyter. These hands-on projects help me master fundamental
                    ML algorithms and data processing techniques.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            className="ml-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {ML_PROJECTS.map((p) => <MLCard key={p.title} project={p} />)}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
