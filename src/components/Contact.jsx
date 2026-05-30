import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, doc, getDoc, runTransaction, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FaEnvelope, FaLinkedin, FaGithub, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import './Contact.css';

const CONTACT_METHODS = [
  { icon: FaEnvelope,  label: 'Email',    value: 'vijayakumarvithusan2912@gmail.com', href: 'mailto:vijayakumarvithusan2912@gmail.com' },
  { icon: FaLinkedin,  label: 'LinkedIn', value: 'Let\'s connect professionally',         href: 'https://www.linkedin.com/in/vithusan-vijayakumar/' },
  { icon: FaGithub,    label: 'GitHub',   value: 'Check out my projects',                 href: 'https://github.com/VTN02' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemPop = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

async function getNextContactId() {
  const counterRef = doc(db, 'counters', 'contacts');
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef);
    const current = snap.exists() ? (snap.data().value || 0) : 0;
    const updated = current + 1;
    tx.set(counterRef, { value: updated }, { merge: true });
    return updated;
  });
}

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]     = useState(null);   // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const nextId   = await getNextContactId();
      const docId    = String(nextId);
      const payload  = {
        ...form,
        contactId: nextId,
        timestamp: serverTimestamp(),
      };
      await setDoc(doc(collection(db, 'contacts'), docId), payload);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Unknown error');
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="section-subtitle">Open to learning opportunities, internships, and project collaborations</p>
        </motion.div>

        <div className="contact__grid">
          {/* Info */}
          <motion.div
            className="contact__info"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="contact__info-heading">Looking for Learning Opportunities</h3>
            <p className="contact__info-text">
              I&apos;m actively seeking internship opportunities, mentorship, and project
              collaborations to gain practical experience in AI/ML. As a 2nd year student
              passionate about artificial intelligence, I&apos;m eager to learn from experienced
              professionals and contribute to real-world projects.
            </p>

            <motion.div 
              className="contact__methods"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="contact__method glass-card"
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  variants={itemPop}
                  whileHover={{ x: 4, borderColor: 'rgba(99,102,241,0.5)' }}
                >
                  <span className="contact__method-icon">
                    <Icon size={20} />
                  </span>
                  <div className="contact__method-text">
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="contact__form glass-card" onSubmit={handleSubmit} id="contactForm" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Vithusan Vijayakumar"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="v@gmail.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject *</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  placeholder="Internship Opportunity / Project Collaboration"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your opportunity or collaboration idea..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'loading' ? (
                  <><span className="spinner" aria-hidden="true" /> Sending…</>
                ) : 'Send Message'}
              </motion.button>

              {/* Toast */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="contact__toast contact__toast--success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCircleCheck size={18} />
                    <span>Message sent! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    className="contact__toast contact__toast--error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCircleXmark size={18} />
                    <span>Failed to send: {errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
