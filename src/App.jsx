import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Loader            from './components/Loader';
import ParticleBackground from './components/ParticleBackground';
import Navbar            from './components/Navbar';
import Hero              from './components/Hero';
import About             from './components/About';
import Projects          from './components/Projects';
import CV                from './components/CV';
import Contact           from './components/Contact';
import Footer            from './components/Footer';
import WhatsAppFloat     from './components/WhatsAppFloat';
import Chatbot           from './components/Chatbot';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let scrollTimeout;
    const onScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
      {/* Layered backgrounds */}
      <div className="bg-grid" aria-hidden="true" />
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <CV />
        <Contact />
      </main>

          <Footer />
          <WhatsAppFloat />
          <Chatbot />
        </>
      )}
    </>
  );
}
