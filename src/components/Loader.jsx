import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

export default function Loader() {
  return (
    <motion.div
      className="loader-overlay"
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="loader-content">
        <div className="loader-portrait-wrap">
          <div className="loader-ring loader-ring--1" />
          <div className="loader-ring loader-ring--2" />
          <div className="loader-glow" />
          <img src="/hero.jpg" alt="Loading..." className="loader-img" />
        </div>
      </div>
    </motion.div>
  );
}
