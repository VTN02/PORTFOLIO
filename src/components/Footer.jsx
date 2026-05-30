import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa6';
import './Footer.css';

const SOCIALS = [
  { icon: FaGithub,    href: 'https://github.com/VTN02',                              label: 'GitHub' },
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/vithusan-vijayakumar/',      label: 'LinkedIn' },
  { icon: FaWhatsapp,  href: 'https://wa.me/94774534056',                             label: 'WhatsApp' },
  { icon: FaInstagram, href: 'https://www.instagram.com/vithusan_2v/',                label: 'Instagram' },
  { icon: FaFacebookF, href: 'https://web.facebook.com/vithusan.vijayakumar.2025',    label: 'Facebook' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'CV', href: '#cv' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        
        {/* Top Section */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="logo-vtn">VTN</span><span className="logo-v"> V</span>
            </div>
            <p className="footer__blurb">
              Software Engineering undergraduate specializing in Artificial Intelligence. Passionate about building intelligent, modern web applications.
            </p>
            <a href="mailto:vijayakumarvithusan2912@gmail.com" className="footer__email">
              <FaEnvelope /> vijayakumarvithusan2912@gmail.com
            </a>
          </div>
          
          <div className="footer__links-group">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__nav">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="footer__nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Vithusan Vijayakumar. All Rights Reserved.
          </p>
          <div className="footer__socials">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
