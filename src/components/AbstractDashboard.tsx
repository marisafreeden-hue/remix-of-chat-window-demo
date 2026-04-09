import React from "react";
import { motion } from "framer-motion";
import emmaImg from "@/assets/emma-illustration.svg";
import dotsImg from "@/assets/dots.png";
import bvIcon from "@/assets/bv-icon.png";

interface AbstractDashboardProps {
  visible: boolean;
}

const barSets = [
  [65, 80, 45, 90, 70, 55, 85, 60],
  [50, 70, 85, 60, 75, 90, 40, 65],
  [80, 55, 70, 45, 90, 65, 75, 50],
  [60, 85, 50, 75, 65, 80, 55, 90],
];

const lineSets = [
  [40, 55, 48, 62, 58, 70, 65, 78],
  [30, 45, 60, 52, 68, 75, 70, 82],
  [50, 42, 58, 65, 55, 72, 68, 80],
  [35, 50, 45, 60, 70, 62, 75, 85],
];

const accents = [
  "hsla(195, 60%, 55%,",
  "hsla(205, 70%, 55%,",
  "hsla(185, 55%, 50%,",
  "hsla(210, 60%, 50%,",
];

/* One complete mini-dashboard */
const MiniDashboard: React.FC<{ index: number; delay: number; style: React.CSSProperties; fromLeft?: boolean }> = ({ index, delay, style, fromLeft = true }) => {
  const bars = barSets[index];
  const line = lineSets[index];
  const accent = accents[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, type: "spring", stiffness: 140 }}
      className="absolute rounded-2xl bg-white/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/60 overflow-hidden flex flex-col"
      style={style}
    >
      {/* Glossy highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl z-0" />
      <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-white/25 blur-[30px] pointer-events-none z-0" />
      {/* Mini nav */}
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/30 bg-white/50">
        <div className="h-1.5 w-10 rounded-full bg-muted-foreground/15" />
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-1 rounded-full ${n === 1 ? "w-6 bg-primary/25" : "w-4 bg-muted-foreground/10"}`} />
          ))}
        </div>
      </div>

      <div className="p-2 space-y-1.5 flex-1 flex flex-col">
        {/* Mini metric row */}
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((m) => (
            <div key={m} className="rounded-md border border-border/30 bg-background/80 p-1.5 space-y-1">
              <div className="h-1 w-8 rounded-full bg-muted-foreground/12" />
              <div className="h-2.5 w-10 rounded bg-muted-foreground/8" />
              <div className="h-1 w-6 rounded-full" style={{ backgroundColor: `${accent} 0.3)` }} />
            </div>
          ))}
        </div>

        {/* Unique chart per dashboard */}
        {index === 0 && (
          /* Bar chart */
          <div className="rounded-md border border-border/30 bg-background/80 p-1.5 flex-1 flex flex-col">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/12 mb-1" />
            <div className="flex items-end gap-[2px] flex-1 min-h-0">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: delay + 0.4 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                  className="flex-1 rounded-t-[1px]"
                  style={{ backgroundColor: `${accent} ${0.25 + (i % 3) * 0.1})` }}
                />
              ))}
            </div>
          </div>
        )}

        {index === 1 && (
          /* Donut chart + stats */
          <div className="rounded-md border border-border/30 bg-background/80 p-2 flex items-center gap-3">
            <svg viewBox="0 0 60 60" className="w-16 h-16 flex-shrink-0">
              <circle cx="30" cy="30" r="22" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <motion.circle cx="30" cy="30" r="22" fill="none" stroke={`${accent} 0.5)`} strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${0.68 * 138} ${138}`} transform="rotate(-90 30 30)"
                initial={{ strokeDashoffset: 138 }} animate={{ strokeDashoffset: 0 }}
                transition={{ delay: delay + 0.5, duration: 1, ease: "easeOut" }} />
              <motion.circle cx="30" cy="30" r="14" fill="none" stroke={`${accent} 0.25)`} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={`${0.45 * 88} ${88}`} transform="rotate(-90 30 30)"
                initial={{ strokeDashoffset: 88 }} animate={{ strokeDashoffset: 0 }}
                transition={{ delay: delay + 0.7, duration: 0.8, ease: "easeOut" }} />
            </svg>
            <div className="space-y-1.5 flex-1">
              {[0, 1, 2].map((r) => (
                <div key={r} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${accent} ${0.3 + r * 0.15})` }} />
                  <div className="h-1 rounded-full bg-muted-foreground/12" style={{ width: `${35 + r * 8}px` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {index === 2 && (
          /* Area / line chart */
          <div className="rounded-md border border-border/30 bg-background/80 p-1.5">
            <div className="h-1 w-8 rounded-full bg-muted-foreground/12 mb-1" />
            <svg viewBox="0 0 160 50" className="w-full h-12">
              <defs>
                <linearGradient id={`areaGrad${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`${accent} 0.3)`} />
                  <stop offset="100%" stopColor={`${accent} 0.02)`} />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: delay + 0.5, duration: 1.2, ease: "easeInOut" }}
                d={`M0,${50 - (line[0] / 100) * 50} ${line.map((y, i) => `L${i * (160 / (line.length - 1))},${50 - (y / 100) * 50}`).join(" ")} L160,50 L0,50 Z`}
                fill={`url(#areaGrad${index})`}
                stroke={`${accent} 0.5)`}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}

        {index === 3 && (
          /* Horizontal bar chart */
          <div className="rounded-md border border-border/30 bg-background/80 p-1.5 space-y-1.5 flex-1">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/12 mb-0.5" />
            {bars.slice(0, 5).map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="h-1 w-8 rounded-full bg-muted-foreground/10 flex-shrink-0" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ delay: delay + 0.4 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="h-3 rounded-sm"
                  style={{ backgroundColor: `${accent} ${0.25 + (i % 3) * 0.1})` }}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
};

const AbstractDashboard: React.FC<AbstractDashboardProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-20">
      {/* Left dashboard — upper left */}
      <div className="absolute left-[3%] z-20" style={{ top: "calc(8% + 100px)", width: 250, height: 200 }}>
        <MiniDashboard index={0} delay={0.3} fromLeft={true} style={{ left: 0, top: 0, width: "100%", height: "100%" }} />
      </div>

      {/* Right dashboard — upper right */}
      <div className="absolute right-[3%] z-20" style={{ top: "calc(8% + 30px)", width: 250, height: 200 }}>
        <MiniDashboard index={3} delay={0.6} fromLeft={false} style={{ left: 0, top: 0, width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default AbstractDashboard;
