import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MobilePortrait.css';

gsap.registerPlugin(ScrollTrigger);

export default function MobilePortrait() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const frameCount = 180;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });

    const playhead = { frame: 0, scale: 1 };

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
      let imgToDraw = currentFrame === 0 ? framesRef.current[0] : framesRef.current[currentFrame - 1];

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        if (canvas.width !== imgToDraw.naturalWidth) {
          canvas.width = imgToDraw.naturalWidth;
          canvas.height = imgToDraw.naturalHeight;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
      }
      gsap.set(canvas, { scale: playhead.scale });
    };

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(max-width: 960px)", () => {
        gsap.to(playhead, {
          frame: frameCount,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1.2,
            pin: true,
          },
          onUpdate: () => requestAnimationFrame(render),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mobile-portrait" ref={containerRef}>
      <motion.div className="mobile-portrait__visual">
        <div className="portrait-wrap">
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
        </div>

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
          style={{ display: 'block' }} /* override hide on mobile from hero.css if needed */
        >
          🎓 SLIIT
        </motion.div>
      </motion.div>
    </section>
  );
}
