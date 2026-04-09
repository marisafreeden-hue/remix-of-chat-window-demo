import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, TrendingDown, Users, MessageSquare } from "lucide-react";

interface PromptSuggestion {
  icon: React.ReactNode;
  label: string;
  question: string;
}

const suggestions: PromptSuggestion[] = [
  {
    icon: <TrendingDown className="w-4 h-4 text-muted-foreground" />,
    label: "Performance",
    question: "How has today been going so far?",
  },
  {
    icon: <Users className="w-4 h-4 text-muted-foreground" />,
    label: "Volume",
    question: "Where is most of today's call volume coming from?",
  },
  {
    icon: <Clock className="w-4 h-4 text-muted-foreground" />,
    label: "Trends",
    question: "Summarize this week's performance.",
  },
  {
    icon: <MessageSquare className="w-4 h-4 text-muted-foreground" />,
    label: "CSAT",
    question: "What's driving low customer satisfaction in the billing queue?",
  },
];

interface WelcomeScreenProps {
  visible: boolean;
  onSelectPrompt: (question: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ visible, onSelectPrompt }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Sequential highlight animation
  useEffect(() => {
    if (!visible) return;
    const startDelay = 5000; // highlight sweep delay
    const highlightDuration = 1200; // how long each stays highlighted
    const gap = 300; // gap between highlights

    const timers: NodeJS.Timeout[] = [];
    suggestions.forEach((_, i) => {
      const onTime = startDelay + i * (highlightDuration + gap);
      const offTime = onTime + highlightDuration;
      timers.push(setTimeout(() => setHighlightedIndex(i), onTime));
      timers.push(setTimeout(() => setHighlightedIndex(null), offTime));
    });

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const handleClick = (index: number, question: string) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    setTimeout(() => {
      onSelectPrompt(question);
    }, 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="flex flex-col items-center justify-center h-full px-6 py-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center max-w-lg w-full gap-0"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#1f6eac" }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-foreground mb-1 text-center">How can I help today?</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Ask about your contact center operations to understand performance and trends.
            </p>

            {/* Suggestion cards */}
            <div className="w-full space-y-2 mb-4">
              {suggestions.map((s, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 3 + i * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    style={{
                      scale: highlightedIndex === i ? 1.05 : 1,
                      backgroundColor: highlightedIndex === i ? "hsl(205, 70%, 90%)" : isSelected ? "hsl(195, 60%, 92%)" : "hsl(0, 0%, 100%)",
                      borderColor: highlightedIndex === i ? "hsl(205, 70%, 55%)" : isSelected ? "hsl(195, 60%, 70%)" : "hsl(0, 0%, 90%)",
                      boxShadow: highlightedIndex === i
                        ? "0 4px 20px hsla(205, 70%, 50%, 0.3), 0 0 0 2px hsla(205, 70%, 60%, 0.2)"
                        : "0 0 0 0 transparent",
                      transition: "scale 0.4s ease-in-out, background-color 0.4s ease-in-out, border-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out",
                    }}
                    onClick={() => handleClick(i, s.question)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left group ${
                      isSelected
                        ? "border-[hsl(195,60%,70%)]"
                        : selectedIndex !== null
                        ? "opacity-40 border-border bg-card"
                        : "border-border bg-card hover:bg-[hsl(195,60%,95%)] hover:border-[hsl(195,60%,80%)]"
                    }`}
                    disabled={selectedIndex !== null}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      highlightedIndex === i ? "bg-[hsl(205,70%,80%)]" : isSelected ? "bg-[hsl(195,60%,82%)]" : "bg-muted group-hover:bg-muted-foreground/10"
                    }`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{s.label}</p>
                      <p className="text-sm text-foreground">{s.question}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Resume link */}
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Clock className="w-3.5 h-3.5" />
              Resume previous conversations
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
