import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa6';
import './Hero.css';

const FULL_NAME = 'Vithusan Vijayakumar';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
});

const SOCIAL = [
  { icon: FaGithub, href: 'https://github.com/VTN02', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vithusan-vijayakumar/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:vijayakumarvithusan2912@gmail.com', label: 'Email' },
];

export default function Hero() {
  const [typedName, setTypedName] = useState('');
  const [portraitTilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  /* Typing effect */
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedName(FULL_NAME.slice(0, i + 1));
        i++;
        if (i >= FULL_NAME.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  /* Parallax tilt */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth <= 900) return;

    const onMove = e => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRef.current.x = ((e.clientX - cx) / (rect.width / 2));
      targetRef.current.y = ((e.clientY - cy) / (rect.height / 2));
    };
    const onLeave = () => { targetRef.current.x = 0; targetRef.current.y = 0; };

    const ease = 0.08;
    const loop = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
      setTilt({ x: currentRef.current.x, y: currentRef.current.y });
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    const hero = heroRef.current;
    hero?.addEventListener('mousemove', onMove, { passive: true });
    hero?.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(animRef.current);
      hero?.removeEventListener('mousemove', onMove);
      hero?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const portraitStyle = {
    transform: `translate3d(${portraitTilt.x * 14}px, ${portraitTilt.y * 10}px, 0)
                rotateX(${-portraitTilt.y * 6}deg)
                rotateY(${portraitTilt.x * 6}deg)`,
    transition: 'transform 0.05s linear',
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__inner">
        {/* Left — text */}
        <div className="hero__text">
          <motion.div {...fadeUp(0.1)} className="hero__label">
            <span className="section-label">AI/ML Student & Developer</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.22)} className="hero__heading">
            Hi, I&apos;m<br />
            <span className="gradient-text hero__name">
              {typedName}
              <span className="hero__cursor" aria-hidden="true">|</span>
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.38)} className="hero__buttons">
            <a href="#projects" className="btn btn-primary" onClick={scrollToProjects}>
              View My Projects
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={scrollToContact}>
              Get In Touch
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="hero__social">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="hero__social-icon"
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="portrait-wrap" style={portraitStyle}>
            <div className="portrait-ring portrait-ring--1" aria-hidden="true" />
            <div className="portrait-ring portrait-ring--2" aria-hidden="true" />
            <div className="portrait-glow" aria-hidden="true" />
            <img
              src="/hero.jpg"
              alt="Vithusan Vijayakumar portrait"
              className="portrait-img"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="portrait-fallback" style={{ display: 'none' }}>VV</div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="hero__badge hero__badge--tl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🤖 AI Enthusiast
          </motion.div>
          <motion.div
            className="hero__badge hero__badge--br"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            🎓 SLIIT
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        <FaArrowDown size={16} />
      </motion.a>
    </section>
  );
}
