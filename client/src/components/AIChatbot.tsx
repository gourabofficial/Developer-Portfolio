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

// True mobile check (recomputed per render so it reflects resize events)
function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 640;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoOpened, setAutoOpened] = useState(false);
  const [userHasMessaged, setUserHasMessaged] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // visualViewport height — used on mobile to track keyboard resize precisely
  const [vpHeight, setVpHeight] = useState<number | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const autoCollapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toUpperCase().includes('MAC');

  // ── Sync ref ─────────────────────────────────────────────────────────────
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // ── visualViewport listener — tracks keyboard open/close on mobile ────────
  // When the soft keyboard opens, visualViewport.height shrinks to the visible
  // area above it. We apply that height directly to the chat window so the
  // three-zone flex layout (header / messages / input) always fits in the
  // visible space and the input stays above the keyboard.
  useEffect(() => {
    if (!isOpen || !isMobile()) return;

    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => setVpHeight(vv.height);

    // Set immediately when panel opens
    update();

    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);

    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      // Reset when closed so desktop styles take over cleanly
      setVpHeight(null);
    };
  }, [isOpen]);

  // ── Body scroll lock when open on mobile ─────────────────────────────────
  useEffect(() => {
    if (isOpen && isMobile()) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // ── Scroll messages to bottom ────────────────────────────────────────────
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ── Open / close ──────────────────────────────────────────────────────────
  const openChat = useCallback(() => {
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
    // Blur input first so mobile keyboard dismisses cleanly before panel exits
    inputRef.current?.blur();
    setIsOpen(false);
    setShowBanner(false);
  }, []);

  const toggleChat = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
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
      } else {
        // Blur on close so keyboard dismisses
        inputRef.current?.blur();
      }
      return next;
    });
  }, []);

  // ── Outside-click / tap to close ─────────────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (!isOpenRef.current) return;
      const target = e.target as Node;
      if (windowRef.current?.contains(target)) return;
      if (fabRef.current?.contains(target)) return;
      closeChat();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [closeChat]);

  // ── Auto-open 5.5 s after mount — desktop only ────────────────────────────
  useEffect(() => {
    if (autoOpened || isMobile()) return;
    const t = setTimeout(() => {
      setIsOpen(true);
      setAutoOpened(true);
    }, 5500);
    return () => clearTimeout(t);
  }, [autoOpened]);

  // ── Auto-collapse 4 s later if user hasn't interacted ────────────────────
  useEffect(() => {
    if (!autoOpened || !isOpen || userHasMessaged) return;

    const t = setTimeout(() => {
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

  // ── Keyboard shortcut Ctrl/Cmd+K ─────────────────────────────────────────
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

  // ── DO NOT auto-focus input on open ──────────────────────────────────────
  // On mobile, auto-focus immediately triggers the keyboard before the panel
  // animation finishes, causing a jarring layout shift. The user taps the
  // input when they're ready — that's the expected native-app pattern.
  // On desktop we still focus after the animation settles.
  useEffect(() => {
    if (!isOpen) return;
    if (isMobile()) return; // mobile: let user tap input deliberately

    const t = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 200);
    return () => clearTimeout(t);
  }, [isOpen]);

  // ── On input focus (keyboard opened), scroll to bottom after delay ────────
  const handleInputFocus = useCallback(() => {
    // Wait ~300 ms for the keyboard animation to finish, then scroll so the
    // last message is right above the keyboard / input bar.
    const t = setTimeout(() => scrollToBottom('smooth'), 300);
    return () => clearTimeout(t);
  }, [scrollToBottom]);

  // ── Send message ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text?: string) => {
      const msgText = (text ?? inputMessage).trim();
      if (!msgText || isLoading) return;

      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
        autoCollapseTimerRef.current = null;
      }
      setUserHasMessaged(true);
      setMessages(prev => [
        ...prev,
        { role: 'user', text: msgText, timestamp: new Date() },
      ]);
      setInputMessage('');
      setIsLoading(true);
      setError(null);

      // Keep keyboard open after send — refocus input without delay
      // (input is already focused on desktop; on mobile the browser keeps
      // focus after form submit unless we explicitly blur, so just clear value)
      requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
      });

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
    [inputMessage, isLoading],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  };

  // ── Animation variants — snappier on mobile ───────────────────────────────
  const onMobile = isMobile();

  const windowVariants = {
    initial: onMobile
      ? { opacity: 0, y: '100%' }
      : { opacity: 0, y: 24, scale: 0.94 },
    animate: onMobile
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 0, scale: 1 },
    exit: onMobile
      ? {
          opacity: 0,
          y: '100%',
          transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
        }
      : {
          opacity: 0,
          y: 16,
          scale: 0.96,
          transition: { duration: 0.14, ease: [0.4, 0, 1, 1] as const },
        },
  };

  const windowTransition = onMobile
    ? { type: 'spring' as const, stiffness: 420, damping: 38 }
    : { type: 'spring' as const, stiffness: 380, damping: 36 };

  // ── Build mobile window style driven by visualViewport ───────────────────
  // vpHeight reflects the visible area (keyboard excluded).
  // We subtract the FAB row height (4.25rem ≈ 68px) so the FAB stays visible.
  const FAB_CLEARANCE = 68; // px — same as CSS `calc(100dvh - 4.25rem)`
  const mobileWindowStyle: React.CSSProperties =
    onMobile && vpHeight !== null
      ? { height: `${vpHeight - FAB_CLEARANCE}px` }
      : {};

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* FAB + banner wrapper */}
      <div className="cb-wrapper">

        {/* Teaser banner */}
        <AnimatePresence>
          {showBanner && !isOpen && (
            <motion.div
              className="cb-banner"
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: 10,
                scale: 0.88,
                transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
              }}
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

        {/* FAB */}
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

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={windowRef}
            className="cb-window"
            style={mobileWindowStyle}
            variants={windowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={windowTransition}
            onMouseDown={e => e.stopPropagation()}
          >
            {/* ── Header (flex-shrink:0) ─────────────────────────────────── */}
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
                    <Trash2 size={15} strokeWidth={2} />
                  </button>
                )}
                <button
                  className="cb-icon-btn"
                  onClick={closeChat}
                  title="Close"
                  aria-label="Close chat"
                  type="button"
                >
                  <X size={17} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* ── Messages (flex:1, overflow-y:auto) ────────────────────── */}
            <div className="cb-messages" ref={messagesContainerRef}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`cb-msg cb-msg--${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
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

              {/* Quick actions */}
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

              {/* Spacer so last message isn't flush against input bar */}
              <div aria-hidden style={{ height: 4, flexShrink: 0 }} />
            </div>

            {/* ── Input bar (flex-shrink:0) ──────────────────────────────── */}
            <div className="cb-input-area">
              <form className="cb-form" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  className="cb-input"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder="Ask me anything…"
                  disabled={isLoading}
                  maxLength={500}
                  aria-label="Chat message"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  // Tells mobile keyboard to show a "Send" action key
                  enterKeyHint="send"
                />
                <button
                  type="submit"
                  className="cb-send"
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message"
                >
                  <Send size={16} strokeWidth={2.2} />
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
