import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa6';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

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
  const [typedTitle, setTypedTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [portraitTilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  const frameCount = 180;

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

  /* Typing effect for Titles */
  useEffect(() => {
    const TITLES = ['AI/ML Student & Developer', 'Machine Learning Enthusiast', 'Creative Problem Solver'];
    let timer;
    const currentText = TITLES[loopNum % TITLES.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedTitle(currentText.substring(0, typedTitle.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedTitle(currentText.substring(0, typedTitle.length + 1));
      }, 100);
    }

    if (!isDeleting && typedTitle === currentText) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, loopNum]);

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

  /* Canvas Frame Animation */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });

    const playhead = { frame: 0, scale: 1 };

    // Preload all 180 laptop frames
    const loadedImages = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      if (i === 1) {
        img.onload = () => {
          if (Math.round(playhead.frame) === 0) {
            canvas.width = img.naturalWidth || 800;
            canvas.height = img.naturalHeight || 800;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
      img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
      loadedImages.push(img);
    }
    framesRef.current = loadedImages;

    const render = () => {
      const currentFrame = Math.round(playhead.frame);
      let imgToDraw = null;

      // If at the very top (frame 0), draw the first scroll frame
      if (currentFrame === 0) {
        imgToDraw = framesRef.current[0];
      } else {
        // Otherwise draw the corresponding scroll frame (frame 1 -> index 0)
        imgToDraw = framesRef.current[currentFrame - 1];
      }

      // Only draw if image is successfully loaded
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        if (canvas.width !== imgToDraw.naturalWidth) {
          canvas.width = imgToDraw.naturalWidth;
          canvas.height = imgToDraw.naturalHeight;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
      }

      // Apply the subtle scale effect to the canvas
      gsap.set(canvas, { scale: playhead.scale });
    };

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop behavior
      mm.add("(min-width: 961px)", () => {
        gsap.to(playhead, {
          frame: frameCount, // Animate up to 180
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=80%", // Pin for 0.8x the viewport height
            scrub: 1.2,
            pin: true,     // Pins the section until animation is complete
            onLeave: () => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }
          },
          onUpdate: () => requestAnimationFrame(render),
        });
      });
    }, heroRef);

    return () => ctx.revert();
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
            <span className="section-label">
              {typedTitle || '\u00A0'}
              <span className="hero__cursor" aria-hidden="true" style={{ marginLeft: 0 }}>|</span>
            </span>
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
            <canvas
              ref={canvasRef}
              className="portrait-img"
              aria-label="Vithusan Vijayakumar animated portrait"
              onContextMenu={(e) => e.preventDefault()}
              style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
              draggable="false"
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
