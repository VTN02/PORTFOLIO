import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'CV', href: '#cv' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'projects', 'cv', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar__inner">
          <a href="#home" className="navbar__logo" onClick={e => handleNavClick(e, '#home')}>
            <span className="logo-vtn">VTN</span>
            <span className="logo-v"> V</span>
          </a>

          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
                    onClick={e => handleNavClick(e, href)}
                  >
                    {label}
                    {activeSection === id && (
                      <motion.span
                        className="navbar__dot"
                        layoutId="navDot"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="navbar__cta btn btn-primary"
            onClick={e => handleNavClick(e, '#contact')}
          >
            Hire Me
          </a>

          <button
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="navbar__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="drawer__logo">
                <span className="logo-vtn">VTN</span><span className="logo-v"> V</span>
              </div>
              <ul className="drawer__links">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <a
                      href={href}
                      className={`drawer__link ${activeSection === href.replace('#', '') ? 'drawer__link--active' : ''}`}
                      onClick={e => handleNavClick(e, href)}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                className="btn btn-primary drawer__cta"
                onClick={e => handleNavClick(e, '#contact')}
              >
                Hire Me
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
