import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import './AIChatbot.css';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('chatbot-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('chatbot-session-id', sessionId);
  }
  return sessionId;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showExpandedBanner, setShowExpandedBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(getSessionId());

  // Detect Mac for keyboard shortcut display
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Show expanded banner on first visit (per session)
  useEffect(() => {
    const hasSeenBanner = sessionStorage.getItem('chatbot-banner-seen');
    if (!hasSeenBanner) {
      // Show expanded banner after a brief delay (page loaded)
      const showTimer = setTimeout(() => {
        setShowExpandedBanner(true);
      }, 800);

      // Auto-collapse banner after 3 seconds
      const hideTimer = setTimeout(() => {
        setShowExpandedBanner(false);
        sessionStorage.setItem('chatbot-banner-seen', 'true');
      }, 3800);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  // Keyboard shortcut handler (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        
        // Hide banner and tooltip when shortcut is used
        if (showExpandedBanner) {
          setShowExpandedBanner(false);
          sessionStorage.setItem('chatbot-banner-seen', 'true');
        }
        if (showTooltip) {
          setShowTooltip(false);
          sessionStorage.setItem('chatbot-tooltip-seen', 'true');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showExpandedBanner, showTooltip]);

  // Show intro tooltip on first visit (per session)
  useEffect(() => {
    const hasSeenTooltip = sessionStorage.getItem('chatbot-tooltip-seen');
    if (!hasSeenTooltip) {
      // Show tooltip after a brief delay (page loaded)
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 1000);

      // Auto-hide tooltip after 3-4 seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        sessionStorage.setItem('chatbot-tooltip-seen', 'true');
      }, 5000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isLoading) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isLoading]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasInteracted) {
      const welcomeMessage: Message = {
        role: 'assistant',
        text: "Hi! I'm Gourab's AI assistant. I can help you learn about his skills, experience, and projects. What would you like to know?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setHasInteracted(true);
    }
  }, [isOpen, messages.length, hasInteracted]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId: sessionId.current
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.reply) {
        const aiMessage: Message = {
          role: 'assistant',
          text: data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to connect to AI. Please try again.');
      
      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        text: "I'm having trouble connecting right now. Please try again in a moment, or feel free to explore the portfolio directly!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatbot-messages');
    setHasInteracted(false);
    setError(null);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setError(null);
    }
    // Hide tooltip and banner when user interacts with chat
    if (showTooltip) {
      setShowTooltip(false);
      sessionStorage.setItem('chatbot-tooltip-seen', 'true');
    }
    if (showExpandedBanner) {
      setShowExpandedBanner(false);
      sessionStorage.setItem('chatbot-banner-seen', 'true');
    }
  };

  // Quick action buttons
  const quickActions = [
    "What are your main skills?",
    "Tell me about your projects",
    "What's your experience?",
    "How can I contact you?"
  ];

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <>
      {/* Floating Chat Button Wrapper */}
      <div className="chatbot-button-wrapper">
        {/* Expanded Banner (First-time only) */}
        <AnimatePresence>
          {showExpandedBanner && !isOpen && (
            <motion.div
              className="chatbot-expanded-banner"
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.7, 
                x: 40,
                transition: { 
                  duration: 0.35, 
                  ease: [0.4, 0, 0.2, 1] 
                }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 25 
              }}
              onClick={toggleChat}
            >
              <div className="chatbot-banner-content">
                <Sparkles size={22} className="chatbot-banner-icon" />
                <div className="chatbot-banner-text">
                  <span className="chatbot-banner-title">Ask anything about Gourab!</span>
                  <span className="chatbot-banner-subtitle">
                    Press <span className="chatbot-banner-kbd">{isMac ? '⌘K' : 'Ctrl+K'}</span>
                  </span>
                </div>
              </div>
              <div className="chatbot-banner-button">
                <MessageCircle size={28} strokeWidth={2} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intro Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && !showExpandedBanner && (
            <motion.div
              className="chatbot-intro-tooltip"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="chatbot-tooltip-content">
                <Sparkles size={16} className="chatbot-tooltip-icon" />
                <span>Ask anything about Gourab!</span>
              </div>
              <div className="chatbot-tooltip-arrow" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Chat Button (Circular) */}
        {!showExpandedBanner && (
          <motion.button
            className={`chatbot-toggle-button ${showTooltip ? 'chatbot-tooltip-highlight' : ''}`}
            onClick={toggleChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 25,
              delay: 0.1
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="chatbot-toggle-icon"
                >
                  <MessageCircle size={24} />
                  <motion.span
                    className="chatbot-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <Sparkles size={12} />
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-header-icon">
                  <Bot size={20} />
                </div>
                <div className="chatbot-header-text">
                  <h3>AI Assistant</h3>
                  <p>Ask me anything about Gourab</p>
                </div>
              </div>
              <div className="chatbot-header-actions">
                {messages.length > 1 && (
                  <button
                    className="chatbot-clear-button"
                    onClick={handleClearChat}
                    title="Clear chat"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`chatbot-message ${message.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="chatbot-message-avatar">
                    {message.role === 'assistant' ? (
                      <Bot size={16} />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <div className="chatbot-message-content">
                    <p>{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  className="chatbot-message assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chatbot-message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="chatbot-message-content">
                    <div className="chatbot-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  className="chatbot-error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Quick actions (show when no messages) */}
              {messages.length <= 1 && !isLoading && (
                <div className="chatbot-quick-actions">
                  <p className="chatbot-quick-actions-title">Quick questions:</p>
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      className="chatbot-quick-action-button"
                      onClick={() => handleQuickAction(action)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-container">
              <form className="chatbot-input-form" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="chatbot-input"
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="chatbot-send-button"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="chatbot-helper-text">
                Ask about projects, skills, experience, or say 'help'
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
