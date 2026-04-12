import React from "react";
import { motion } from "framer-motion";

interface VoiceWaveformProps {
  active: boolean;
  color?: string;
  barCount?: number;
  className?: string;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ active, color = "hsl(180, 60%, 50%)", barCount = 24, className = "" }) => (
  <div className={`flex items-center gap-[3px] h-10 ${className}`}>
    {Array.from({ length: barCount }).map((_, i) => (
      <motion.div
        key={i}
        animate={active ? {
          height: [8, 20 + Math.random() * 20, 8, 14 + Math.random() * 16, 8],
        } : { height: 4 }}
        transition={active ? {
          duration: 0.6 + Math.random() * 0.4,
          repeat: Infinity,
          repeatType: "mirror",
          delay: i * 0.03,
          ease: "easeInOut",
        } : { duration: 0.3 }}
        style={{
          width: 3,
          borderRadius: 2,
          backgroundColor: color,
          opacity: active ? 0.7 + Math.random() * 0.3 : 0.2,
        }}
      />
    ))}
  </div>
);

export default VoiceWaveform;
