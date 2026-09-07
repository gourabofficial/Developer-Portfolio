import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, Trash2, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './AIChatbot.css';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Message = {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
};

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SESSION_ID = `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  text: "Hi! I'm Gourab's AI assistant. Ask me about his skills, projects, experience, or anything else you'd like to know.",
  timestamp: new Date(),
};

const QUICK_ACTIONS = [
  'What are your main skills?',
  'Tell me about your projects',
  "What's your experience?",
  'How can I contact you?',
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function AIChatbot() {
  // ── Single source of truth for open/close ─────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoOpened, setAutoOpened] = useState(false);
  const [userHasMessaged, setUserHasMessaged] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref so outside-click handler always reads current open state without stale closure
  const isOpenRef = useRef(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  // Ref to the auto-collapse timer so we can cancel it the instant the user types
  const autoCollapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toUpperCase().includes('MAC');

  // Keep ref in sync with state
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // ── Open/close handlers — no stale closures ───────────────────────────────
  // Always use functional updater; never read isOpen directly in handlers.
  const openChat = useCallback(() => {
    // Clicking the banner/FAB to open counts as deliberate interaction
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
      autoCollapseTimerRef.current = null;
    }
    setUserHasMessaged(true);
    setIsOpen(true);
    setShowBanner(false);
    setError(null);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setShowBanner(false);
  }, []);

  // Toggle: uses functional updater so it NEVER reads stale state
  const toggleChat = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    // Any deliberate FAB click cancels auto-collapse permanently
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
      autoCollapseTimerRef.current = null;
    }
    setUserHasMessaged(true);
    setIsOpen(prev => {
      const next = !prev;
      if (next) {
        setShowBanner(false);
        setError(null);
      }
      return next;
    });
  }, []);

  // ── Outside-click to close ─────────────────────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (!isOpenRef.current) return;
      const target = e.target as Node;
      // Don't close if click is inside the chat window or on the FAB
      if (windowRef.current?.contains(target)) return;
      if (fabRef.current?.contains(target)) return;
      closeChat();
    };

    // Use capture: false so element onClick fires first (with stopPropagation),
    // then this fires — but if stopPropagation was called, this won't fire
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [closeChat]);

  // ── Auto-open 5.5s after mount ─────────────────────────────────────────────
  useEffect(() => {
    if (autoOpened) return;
    const t = setTimeout(() => {
      setIsOpen(true);
      setAutoOpened(true);
    }, 5500);
    return () => clearTimeout(t);
  }, [autoOpened]);

  // ── Auto-collapse 4s later if user hasn't interacted ──────────────────────
  // Timer is stored in a ref so sendMessage can cancel it immediately on first keystroke.
  useEffect(() => {
    if (!autoOpened || !isOpen || userHasMessaged) return;

    const t = setTimeout(() => {
      // Double-check the user still hasn't sent anything before collapsing
      if (!userHasMessaged) {
        setIsOpen(false);
        setShowBanner(true);
        const bannerTimer = setTimeout(() => setShowBanner(false), 4000);
        autoCollapseTimerRef.current = bannerTimer;
      }
    }, 4000);

    autoCollapseTimerRef.current = t;
    return () => {
      clearTimeout(t);
      autoCollapseTimerRef.current = null;
    };
  }, [autoOpened, isOpen, userHasMessaged]);

  // ── Keyboard shortcut Ctrl/Cmd+K ──────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setShowBanner(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Auto-scroll messages (scoped — never touches page scroll) ─────────────
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ── Focus input when panel opens ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text?: string) => {
      const msgText = (text ?? inputMessage).trim();
      if (!msgText || isLoading) return;

      // Cancel any pending auto-collapse immediately — user is actively chatting
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
        autoCollapseTimerRef.current = null;
      }
      setUserHasMessaged(true);
      setMessages(prev => [...prev, { role: 'user', text: msgText, timestamp: new Date() }]);
      setInputMessage('');
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msgText, sessionId: SESSION_ID }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        if (data.success && data.reply) {
          setMessages(prev => [
            ...prev,
            { role: 'assistant', text: data.reply, timestamp: new Date() },
          ]);
        } else {
          throw new Error(data.error || 'Failed to get response');
        }
      } catch (err) {
        console.error('Chat error:', err);
        setError('Failed to connect to AI. Please try again.');
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: "I'm having trouble connecting right now. Please try again in a moment, or feel free to explore the portfolio directly!",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputMessage, isLoading]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── FAB + Banner wrapper ─────────────────────────────────────────── */}
      <div className="cb-wrapper">

        {/* Teaser banner pill */}
        <AnimatePresence>
          {showBanner && !isOpen && (
            <motion.div
              className="cb-banner"
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.88, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              onClick={openChat}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openChat()}
              aria-label="Open AI assistant"
            >
              <div className="cb-banner-body">
                <span className="cb-banner-spark-wrap">
                  <Sparkles size={15} />
                </span>
                <div className="cb-banner-copy">
                  <span className="cb-banner-title">Ask anything about Gourab!</span>
                  <span className="cb-banner-hint">
                    Press <kbd className="cb-kbd">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
                  </span>
                </div>
              </div>
              <div className="cb-banner-orb">
                <MessageSquare size={19} strokeWidth={1.8} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB — plain <button> instead of motion.button to avoid Framer
            gesture system intercepting touch/click events on mobile.
            Visual hover/active states are handled entirely in CSS.        */}
        {!showBanner && (
          <button
            ref={fabRef}
            className={`cb-fab${isOpen ? ' cb-fab--open' : ''}`}
            onClick={toggleChat}
            aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
            type="button"
          >
            {!isOpen && <span className="cb-fab-spin" aria-hidden />}
            <span className="cb-fab-glass" aria-hidden />
            {!isOpen && <span className="cb-fab-ring" aria-hidden />}
            {!isOpen && <span className="cb-fab-badge" aria-hidden />}

            {/* Icon — CSS transition instead of Framer AnimatePresence */}
            <span className="cb-fab-icon-wrap" aria-hidden>
              <span className={`cb-fab-icon-chat${isOpen ? ' cb-fab-icon--hidden' : ''}`}>
                <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.1 0-2.1-.2-3-.6L5 20l1.1-3.8C4.8 15 4 13.6 4 12Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="12" r="1" fill="currentColor" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <circle cx="15" cy="12" r="1" fill="currentColor" />
                </svg>
              </span>
              <span className={`cb-fab-icon-close${!isOpen ? ' cb-fab-icon--hidden' : ''}`}>
                <X size={20} strokeWidth={2} />
              </span>
            </span>
          </button>
        )}
      </div>

      {/* ── Chat window ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={windowRef}
            className="cb-window"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            // Prevent clicks inside the window from bubbling to the outside-click handler
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="cb-header">
              <div className="cb-header-left">
                <div className="cb-header-avatar">
                  <Bot size={17} strokeWidth={1.8} />
                  <span className="cb-header-avatar-dot" aria-hidden />
                </div>
                <div className="cb-header-info">
                  <p className="cb-header-name">AI Assistant</p>
                  <p className="cb-header-sub">
                    <span className="cb-online-dot" aria-hidden />
                    Online · Ask anything about Gourab
                  </p>
                </div>
              </div>

              <div className="cb-header-actions">
                {messages.length > 1 && (
                  <button
                    className="cb-icon-btn"
                    onClick={handleClearChat}
                    title="Clear conversation"
                    aria-label="Clear conversation"
                    type="button"
                  >
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                )}
                <button
                  className="cb-icon-btn"
                  onClick={closeChat}
                  title="Close"
                  aria-label="Close chat"
                  type="button"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="cb-messages" ref={messagesContainerRef}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`cb-msg cb-msg--${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="cb-msg-avatar" aria-hidden>
                    {msg.role === 'assistant' ? (
                      <Bot size={13} strokeWidth={1.8} />
                    ) : (
                      <User size={13} strokeWidth={1.8} />
                    )}
                  </div>
                  <div className="cb-msg-bubble">
                    {msg.role === 'assistant' ? (
                      <div className="cb-msg-markdown">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  className="cb-msg cb-msg--assistant"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  aria-live="polite"
                  aria-label="AI is typing"
                >
                  <div className="cb-msg-avatar" aria-hidden>
                    <Bot size={13} strokeWidth={1.8} />
                  </div>
                  <div className="cb-msg-bubble cb-msg-bubble--typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  className="cb-error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              {/* Quick-action chips */}
              {messages.length <= 1 && !isLoading && (
                <div className="cb-quick">
                  <p className="cb-quick-label">Quick questions</p>
                  <div className="cb-quick-grid">
                    {QUICK_ACTIONS.map((action, idx) => (
                      <button
                        key={idx}
                        className="cb-quick-btn"
                        onClick={() => sendMessage(action)}
                        type="button"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div aria-hidden style={{ height: 4 }} />
            </div>

            {/* Input area */}
            <div className="cb-input-area">
              <form className="cb-form" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  className="cb-input"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Ask me anything…"
                  disabled={isLoading}
                  maxLength={500}
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  className="cb-send"
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message"
                >
                  <Send size={15} strokeWidth={2.2} />
                </button>
              </form>
              <p className="cb-footer-hint">
                Press{' '}
                <kbd className="cb-kbd cb-kbd--sm">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>{' '}
                to toggle
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
