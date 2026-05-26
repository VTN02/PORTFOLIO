import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SUGGESTIONS = [
  "What are your technical skills?",
  "Tell me about your projects",
  "How can I contact you?",
  "What are you currently learning?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm Vithusan (VTN). Thanks for checking out my portfolio! How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && chatbotRef.current && !chatbotRef.current.contains(e.target)) {
        if (!e.target.closest('.chatbot-toggle')) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            system_instruction: {
              parts: { 
                text: `You are Vithusan Vijayakumar (VTN). You are a software engineering undergraduate. Answer questions as yourself, using the first person ("I", "my", "me"). Be enthusiastic, polite, and professional.

Here is ALL the information about YOU:
- Name: Vithusan Vijayakumar (VTN)
- Email: vijayakumarvithusan2912@gmail.com
- WhatsApp / Phone: +94 77 453 4056
- LinkedIn: https://www.linkedin.com/in/vithusan-vijayakumar/
- GitHub: https://github.com/VTN02
- Location: Colombo, Sri Lanka
- Current Status: 2nd Year, 4th Semester (AI Specialization) at Sri Lanka Institute of Information Technology (SLIIT)
- Education: BSc (Hons) in Information Technology
- Focus: Machine Learning, Python, Data Science, Web Development
- Certifications: AI/ML Engineer Stage 1 (SLIIT, 2025) [Link: https://code.sliit.org/certificates/4ekqodab53]

Technical Skills:
- Web Dev: HTML/CSS, JavaScript, React, Tailwind CSS, Spring Boot
- Programming Languages: Python, Java, JavaScript, C, SQL
- AI/ML & Data Science: Scikit-learn, Pandas, NumPy, Matplotlib, Jupyter
- Currently Learning: Deep Learning, TensorFlow, PyTorch, Computer Vision
- AI Tools Explored: ChatGPT, Claude, Gemini, Midjourney, DALL-E, GitHub Copilot, Cursor, Google Colab.

Main Projects:
1. School Management System: Web-based system for handling student records, attendance, and grading. Built with Spring Boot, MySQL, HTML/JS. (Repo: https://github.com/VTN02/school_management_system)
2. Campus Bike Rental Management System: Platform for managing campus bike rentals with an admin dashboard. Built with Spring Boot, MongoDB, HTML/JS. (Repo: https://github.com/VTN02/bikerentalsystem)
3. Personal Portfolio Website: Modern, responsive portfolio with an AI-themed design. Built with React, Vite, Framer Motion, Firebase. (Repo: https://github.com/VTN02/VTN_PORTFOLIO)

Machine Learning Practice Projects (Python, Scikit-learn, Pandas):
- Spam Mail Prediction
- Diabetes Prediction
- Rock vs Mine Prediction
- BigMart Sales Prediction
- Loan Status Prediction
- House Price Prediction
- Heart Disease Prediction

CRITICAL INSTRUCTIONS FOR YOUR RESPONSES:
1. ALWAYS answer in a friendly, conversational tone with full sentences. Do NOT output single words, raw numbers, or bare URLs as your entire response.
2. You MUST ALWAYS use proper formatting including emojis, bullet points (\`*\` or \`-\`), and ordered lists (\`1.\`).
3. You MUST use markdown code blocks (\`\`\` \`\`\`) to highlight contact info, important links, or technologies. For example, use inline code snippets \`like this\` for skills.
4. Whenever you mention a section of the portfolio (like Technical Skills, Main Projects, About Me, Contact), you MUST make it a clickable markdown link pointing to that section on the page. Use these exact links: \`[Technical Skills](#cv)\`, \`[Main Projects](#projects)\`, \`[Contact Details](#contact)\`, \`[About Me](#about)\`.
5. Keep responses structured, highly visual, and concise (under 4 sentences). Do NOT output giant walls of text.`
              }
            },
            contents: [
              ...messages.slice(1).map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
              })),
              { 
                role: 'user', 
                parts: [{ text: userMessage }] 
              }
            ]
          })
        }
      );

      const data = await response.json();
      
      if (data.error) {
         setMessages((prev) => [...prev, { role: 'model', text: `Error: ${data.error.message}` }]);
      } else if (data.candidates && data.candidates[0].content.parts[0].text) {
         const reply = data.candidates[0].content.parts[0].text;
         setMessages((prev) => [...prev, { role: 'model', text: reply }]);
      } else {
         setMessages((prev) => [...prev, { role: 'model', text: "Sorry, I couldn't understand that." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: "Network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    sendMessage(msg);
  };

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            ref={chatbotRef}
            className="chatbot-window glass-card"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <img src="/hero.jpg" alt="VTN" className="chatbot-header-img" />
              <div>
                <h4>Vithusan V (VTN)</h4>
                <span className="chatbot-status">Online</span>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  className={`chat-bubble-container ${msg.role}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.role === 'model' && (
                    <img src="/hero.jpg" alt="VTN" className="chat-avatar" />
                  )}
                  <div className={`chat-bubble ${msg.role}`}>
                    {msg.role === 'model' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  className="chat-bubble-container model"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <img src="/hero.jpg" alt="VTN" className="chat-avatar" />
                  <div className="chat-bubble model typing">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <motion.div 
                className="chatbot-suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {SUGGESTIONS.map((sug, i) => (
                  <button 
                    key={i} 
                    className="suggestion-btn glass-card"
                    onClick={() => sendMessage(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </motion.div>
            )}

            <form className="chatbot-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading}>
                <FaPaperPlane size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
