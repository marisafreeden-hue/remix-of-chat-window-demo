import React, { useState, useEffect } from "react";
import '@fontsource/besley/400-italic.css';
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingDown, Users, Clock, MessageSquare } from "lucide-react";
import emmaImg from "@/assets/emma-illustration.svg";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";
import goLogo from "@/assets/go-logo.png";
import dotsImg from "@/assets/dots.png";
import bvIcon from "@/assets/bv-icon.png";

interface NarrativeScreenProps {
  visible: boolean;
  onTitleClick?: () => void;
}

/* Slide 0: Title screen — "GoInsights Product Preview" */
const TitleSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white overflow-hidden">
    {/* Teal blur orbs */}
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
    <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[hsl(175,60%,50%)]/18 blur-[80px]" />
    {/* Purple blur orbs */}
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
    <div className="absolute bottom-[5%] left-[15%] w-[350px] h-[350px] rounded-full bg-[hsl(265,50%,50%)]/8 blur-[100px]" />
    <div className="absolute top-[15%] right-[25%] w-[200px] h-[200px] rounded-full bg-[hsl(275,55%,55%)]/20 blur-[60px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />

    <div className="absolute left-[55px] top-[calc(30%+170px)] -translate-y-1/2">
      <img src={broadvoiceLogo} alt="Broadvoice" className="h-7 mb-6" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
      <h1>
        <span className="text-5xl font-light italic block" style={{ fontFamily: "'Besley', serif", background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GoEngage Voice</span>
        <span className="text-5xl font-light text-[hsl(220,15%,25%)] block mt-1">Product Preview</span>
      </h1>
    </div>

    {/* Welcome screen preview — right side, liquid glass effect */}
    <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[580px] h-[600px] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.08)] border border-white/60 bg-white/80 backdrop-blur-xl">
      {/* Glossy highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent z-10 pointer-events-none rounded-3xl" />
      <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-white/30 blur-[40px] z-10 pointer-events-none" />
      
      <div className="flex flex-col h-full relative">
        {/* Top nav bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-white/50">
          <div className="h-4 w-20 rounded bg-muted-foreground/12" />
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 rounded-md bg-muted/50" />
            ))}
          </div>
        </div>

        {/* Sub header */}
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-border/40 bg-white/30">
          <div className="h-5 w-5 rounded bg-muted-foreground/12" />
          <div className="space-y-1">
            <div className="h-2 w-14 rounded bg-muted-foreground/15" />
            <div className="h-1.5 w-20 rounded bg-muted-foreground/8" />
          </div>
        </div>

        {/* Welcome content */}
        <div className="flex-1 flex flex-col items-center justify-center px-10 py-3 -mt-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#1f6eac" }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="text-lg font-bold text-foreground mb-1">How can I help today?</p>
          <p className="text-xs text-muted-foreground text-center mb-5">Ask about your contact center operations</p>
          
          <div className="w-full max-w-sm space-y-2.5">
            {[
              { icon: <TrendingDown className="w-4 h-4 text-muted-foreground" />, label: "Performance", q: "How has today been going so far?" },
              { icon: <Users className="w-4 h-4 text-muted-foreground" />, label: "Volume", q: "Where is most of today's call volume coming from?" },
              { icon: <Clock className="w-4 h-4 text-muted-foreground" />, label: "Trends", q: "Summarize this week's performance." },
              { icon: <MessageSquare className="w-4 h-4 text-muted-foreground" />, label: "CSAT", q: "What's driving low customer satisfaction?" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-border/60 bg-white/70">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">{s.icon}</div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{s.label}</p>
                  <p className="text-sm text-foreground leading-tight">{s.q}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* Slide 1: Meet Emma */
const EmmaSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white">
    {/* Blur orbs — matching other pages */}
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[#1f6eac]/12 blur-[120px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[#38bdcd]/22 blur-[180px]" />
    <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[#38bdcd]/18 blur-[80px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/15 blur-[140px]" />
    <div className="absolute bottom-[5%] left-[15%] w-[350px] h-[350px] rounded-full bg-[#1f6eac]/8 blur-[100px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/12 blur-[140px]" />

    {/* Emma centered */}
    <div className="absolute inset-0 flex items-end justify-center">
      <img
        src={emmaImg}
        alt="Emma"
        className="h-[95%] w-auto object-contain"
      />
    </div>

    {/* Text — left side */}
    <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="text-5xl font-bold text-[#38bdcd]">Meet </span>
        <span className="text-5xl font-bold text-[hsl(220,15%,25%)]">Emma</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-sm text-[hsl(220,10%,45%)] mt-3 max-w-xs leading-relaxed"
      >
        Call center supervisor · Team of 20 · Omnichannel support
      </motion.p>
    </div>

    {/* Decorative dots — lower left */}
    <motion.img
      src={dotsImg}
      alt=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bottom-8 left-10 h-12 w-auto z-10"
    />

    {/* BV icon — lower right */}
    <motion.img
      src={bvIcon}
      alt=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bottom-6 right-6 h-10 w-10 rounded-full z-10"
    />
  </div>
);

const slides = [TitleSlide, EmmaSlide];

const NarrativeScreen: React.FC<NarrativeScreenProps> = ({ visible, onTitleClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!visible) {
      setCurrentSlide(0);
      return;
    }

    if (currentSlide === 0) {
      const handleClick = () => {
        setCurrentSlide(1);
        onTitleClick?.();
      };
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [visible, currentSlide, onTitleClick]);

  if (!visible) return null;

  const SlideComponent = slides[currentSlide];

  return (
    <div className="absolute inset-0 z-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default NarrativeScreen;
