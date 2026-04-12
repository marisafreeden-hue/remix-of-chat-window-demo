import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface VoiceWaveformProps {
  active: boolean;
  color?: string;
  barCount?: number;
  className?: string;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ active, color = "hsl(180, 60%, 50%)", barCount = 24, className = "" }) => {
  // Memoize random values so they don't change on re-render, which would reset framer-motion animations
  const barConfigs = useMemo(() => 
    Array.from({ length: barCount }).map((_, i) => ({
      heights: [8, 20 + Math.random() * 20, 8, 14 + Math.random() * 16, 8],
      duration: 1.2 + Math.random() * 0.6,
      opacity: 0.7 + Math.random() * 0.3,
      delay: i * 0.03,
    })),
    [barCount]
  );

  return (
    <div className={`flex items-center gap-[3px] h-10 ${className}`}>
      {barConfigs.map((cfg, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: cfg.heights,
          } : { height: 4 }}
          transition={active ? {
            duration: cfg.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: cfg.delay,
            ease: "easeInOut",
          } : { duration: 0.3 }}
          style={{
            width: 3,
            borderRadius: 2,
            backgroundColor: color,
            opacity: active ? cfg.opacity : 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
