import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import heroLogo from '../assets/hero.png';
import './Chatbot.css';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

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
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);
  const inputRef = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const recognitionRef = useRef(null);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    // Wait until the user finishes speaking before outputting text
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Store the text that was already in the input box
    finalTranscriptRef.current = input ? input + ' ' : '';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      // Because interimResults is false, it will only fire once with the perfectly clean, final sentence.
      const finalTranscript = event.results[0][0].transcript;
      setInput(finalTranscriptRef.current + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    recognition.start();
  };

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const groqMessages = [
        {
          role: 'system',
          content: `You are Vithusan Vijayakumar (VTN). You are a software engineering undergraduate. Answer questions as yourself, using the first person ("I", "my", "me"). Be enthusiastic, polite, and professional.

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
- AI/ML & Data Science: Scikit-learn, Pandas, NumPy, Matplotlib, Jupyter, n8n
- Currently Learning: Deep Learning, TensorFlow, PyTorch, Computer Vision
- AI Tools Explored: ChatGPT, Claude, Gemini, Midjourney, DALL-E, GitHub Copilot, Cursor, Google Colab, n8n (AI Automation).

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
4. You MUST ALWAYS proactively include a clickable markdown navigation link at the end of EVERY response to direct the user to the relevant section of the portfolio. Use these exact links: \`[View Technical Skills](#cv)\`, \`[See Main Projects](#projects)\`, \`[Contact Details](#contact)\`, \`[About Me](#about)\`.
5. If the user asks about a specific project, describe it briefly and you MUST end with the \`[See Main Projects](#projects)\` link.
6. Keep responses structured, highly visual, and concise (under 4 sentences). Do NOT output giant walls of text.
7. STRICT RESTRICTION: You MUST ONLY answer questions related to your portfolio, professional experience, skills, education, and projects. If the user asks about ANYTHING else (e.g., general knowledge, coding help, politics, jokes, off-topic subjects), you MUST politely refuse to answer and redirect the conversation back to your portfolio.`
        },
        ...messages.slice(1).map(m => ({
          role: m.role === 'model' ? 'assistant' : 'user',
          content: m.text
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: groqMessages,
            temperature: 0.7,
            max_tokens: 500
          })
        }
      );

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [...prev, { role: 'model', text: `Error: ${data.error.message}` }]);
      } else if (data.choices && data.choices[0].message.content) {
        const reply = data.choices[0].message.content;
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
      <motion.button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="chatbot-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              ref={chatbotRef}
              className="chatbot-window glass-card"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="chatbot-header">
                <div className="chatbot-header-info">
                  <img src="/hero.jpg" alt="VTN" className="chatbot-header-img" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4>Vithusan V (VTN)</h4>
                    <span className="chatbot-status">Online</span>
                  </div>
                </div>
                <button
                  className="chatbot-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chat"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="chatbot-messages">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`chat-bubble-container ${msg.role}`}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {msg.role === 'model' && (
                      <img src="/hero.jpg" alt="VTN" className="chat-avatar" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    )}
                    <div className={`chat-bubble ${msg.role}`}>
                      {msg.role === 'model' ? (
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => {
                              const handleClick = (e) => {
                                setIsOpen(false);
                                if (props.href && props.href.startsWith('#')) {
                                  e.preventDefault();
                                  setTimeout(() => {
                                    const element = document.querySelector(props.href);
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }, 300); // wait for modal closing animation
                                }
                              };
                              return <a {...props} onClick={handleClick} />;
                            }
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    className="chat-bubble-container model"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img src="/hero.jpg" alt="VTN" className="chat-avatar" style={{ borderRadius: '50%', objectFit: 'cover' }} />
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
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {SUGGESTIONS.map((sug, i) => (
                    <motion.button
                      key={i}
                      className="suggestion-btn glass-card"
                      onClick={() => sendMessage(sug)}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {sug}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <form className="chatbot-input-area" onSubmit={handleSend}>
                <button
                  type="button"
                  className={`mic-btn ${isListening ? 'listening' : ''}`}
                  onClick={toggleListening}
                  disabled={isLoading}
                  title="Use microphone"
                >
                  <FaMicrophone size={16} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask about my projects..."}
                  disabled={isLoading || isListening}
                />
                <button type="submit" disabled={!input.trim() || isLoading}>
                  <FaPaperPlane size={16} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
