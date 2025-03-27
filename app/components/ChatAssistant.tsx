import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

// Helper function to match question patterns
const matchQuestion = (question: string): string => {
  question = question.toLowerCase();

  if (question.includes('bathroom') || question.includes('kitchen') || question.includes('small')) {
    return 'A 4-yard skip is usually enough for small jobs like bathroom renovations or kitchen refits.';
  }

  if (question.includes('road') || question.includes('placement') || question.includes('street')) {
    return 'Skips up to 8 yards can be placed on roads with proper permits. Larger skips require off-road placement.';
  }

  if (question.includes('hire') || question.includes('period') || question.includes('long')) {
    return 'Standard hire period is 14 days for all skip sizes.';
  }

  if (question.includes('heavy') || question.includes('weight') || question.includes('concrete')) {
    return 'Our 6, 8, and 20 yard skips allow heavy waste like concrete, soil, and brick.';
  }

  if (
    question.includes('london') ||
    question.includes('location') ||
    question.includes('postcode')
  ) {
    return 'Please enter your postcode to check availability in your area. This demo is showing skips available in NR32.';
  }

  if (question.includes('price') || question.includes('cost') || question.includes('expensive')) {
    return 'Skip prices start from £311 for a 4-yard skip and increase based on size. All prices shown include VAT.';
  }

  return "I'm sorry, I don't understand that question. Try asking about skip sizes, prices, placement, or hire periods.";
};

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi there! I'm your skip assistant. How can I help you today?",
      isUser: false,
    },
    {
      id: '2',
      text: '🤖 Demo Chat Assistant – Not Connected to AI',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Log to console when opening chat
  useEffect(() => {
    if (isOpen) {
      console.log('[Chat Assistant] User opened chat assistant');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Log user question
    console.log(`[Chat Assistant] User asked: ${input}`);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: matchQuestion(input),
        isUser: false,
      };

      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-assistant-button p-2 rounded-full shadow-lg bg-primary text-primary-foreground"
        aria-label="Chat with an assistant"
        data-author="Paul Doros"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-32 right-5 w-80 bg-card text-card-foreground rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 bg-primary text-primary-foreground">
              <h3 className="font-semibold">Chat Assistance</h3>
              <p className="text-xs opacity-80">
                Design by{' '}
                <a
                  href="https://pauldoros.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Paul Doros
                </a>
              </p>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm mb-4">
                This is a demo chat assistant interface. In a production environment, this would
                connect to a support system.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-muted-foreground rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
