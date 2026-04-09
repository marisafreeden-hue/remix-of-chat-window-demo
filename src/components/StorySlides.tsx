import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, LayoutDashboard, MessageCircle, Play } from "lucide-react";
import goLogo from "@/assets/go-logo.png";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";

interface StorySlidesProps {
  slideIndex: number;
}

const slides = [
  {
    label: "Introducing",
    title: "AI Analyst",
    subtitle: "AI-Powered Analytics for GoContact",
    body: "An early look at how supervisors and operations leaders will interact with analytics in the future.",
    Icon: Sparkles,
  },
  {
    label: "The Evolution",
    title: "A Unified Analytics Experience",
    subtitle: "Classic → Advanced",
    body: "Instead of analytics spread across different views, dashboards, and reports — everything lives together in a more intuitive, cohesive structure.",
    Icon: LayoutDashboard,
  },
  {
    label: "The Shift",
    title: "Start with a Question,\nNot a Dashboard",
    subtitle: "Conversational-first analytics",
    body: "Instead of logging in and deciding which reports to open, supervisors begin with a question, get immediate context, and then decide where to go.",
    Icon: MessageCircle,
  },
  {
    label: "The Demo",
    title: "Let's See It in Action",
    subtitle: "Three conversations. One story.",
    body: "We'll walk through a day in the life of a supervisor — from a quick check-in, to understanding demand, to reviewing the week.",
    Icon: Play,
  },
];

const StorySlides: React.FC<StorySlidesProps> = ({ slideIndex }) => {
  const slide = slides[slideIndex];
  if (!slide) return null;
  const IconComponent = slide.Icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background px-8"
      >
        {/* Top logo */}
        <motion.img
          src={broadvoiceLogo}
          alt="Broadvoice"
          className="h-6 mb-8 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <IconComponent className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Label */}
        <motion.span
          className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {slide.label}
        </motion.span>

        {/* Title */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-foreground text-center whitespace-pre-line leading-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          {slide.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm font-medium text-muted-foreground mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          {slide.subtitle}
        </motion.p>

        {/* Body */}
        <motion.p
          className="text-sm text-muted-foreground mt-4 text-center max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
        >
          {slide.body}
        </motion.p>

        {/* Progress dots */}
        <motion.div
          className="flex items-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? "w-6 bg-primary"
                  : i < slideIndex
                  ? "w-1.5 bg-primary/40"
                  : "w-1.5 bg-muted-foreground/20"
              }`}
            />
          ))}
        </motion.div>

        {/* Click hint */}
        <motion.p
          className="text-[10px] text-muted-foreground mt-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          Click anywhere to continue
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export const STORY_SLIDE_COUNT = slides.length;
export default StorySlides;
