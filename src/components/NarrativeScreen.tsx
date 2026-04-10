import React, { useState, useEffect } from "react";
import '@fontsource/besley/400-italic.css';
import '@fontsource/instrument-sans/500.css';
import { motion, AnimatePresence } from "framer-motion";
import dashboardPreview from "@/assets/dashboard-preview.png";
import emmaImg from "@/assets/emma-illustration.svg";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";
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
        <span className="text-5xl font-medium block pb-2" style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: '1.3', background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GoEngage <span style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400 }}>Voice</span></span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(220,15%,25%)] block mt-3 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Product Preview</span>
      </h1>
    </div>

    {/* Dashboard preview — right side */}
    <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.08)]">
      <img src={dashboardPreview} alt="GoEngage Voice Dashboard" className="w-full h-auto" />
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
