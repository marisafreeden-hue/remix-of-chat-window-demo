import React from "react";
import { motion } from "framer-motion";
import emmaImg from "@/assets/emma-illustration.svg";
import dotsImg from "@/assets/dots.png";
import bvIcon from "@/assets/bv-icon.png";

interface ClutteredTabsProps {
  visible: boolean;
}

// Split tabs into left and right groups
const leftTabs = [
  { icon: "📞", label: "Call Queue Dashboard", x: 12, y: 15, w: 195, rotate: -1 },
  { icon: "🎫", label: "Ticket Backlog — 23", x: 20, y: 33, w: 185, rotate: 2 },
  { icon: "🔔", label: "Alerts — 5 critical", x: 8, y: 52, w: 175, rotate: -1.5 },
  { icon: "📋", label: "Agent Schedule", x: 22, y: 70, w: 160, rotate: 1 },
];

const rightTabs = [
  { icon: "💬", label: "Team Chat — 12 new", x: -5, y: 15, w: 185, rotate: 1 },
  { icon: "👥", label: "Workforce Planner", x: -12, y: 33, w: 170, rotate: -1.5 },
  { icon: "📑", label: "SLA Compliance Report", x: -8, y: 52, w: 200, rotate: 1 },
  { icon: "📞", label: "Live Calls Monitor", x: -15, y: 70, w: 180, rotate: -1 },
];

const ClutteredTabs: React.FC<ClutteredTabsProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-20">
      {/* Left side — scattered tabs */}
      <div className="absolute top-0 bottom-0 w-[42%] z-20" style={{ left: -15 }}>
        {leftTabs.map((tab, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, x: -50, rotate: tab.rotate + 8 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: tab.rotate }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute"
            style={{ left: `${tab.x}%`, top: `${tab.y}%`, width: tab.w }}
          >
            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-[hsl(220,15%,92%)] px-3 py-2 flex items-center gap-2">
              <span className="text-sm">{tab.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="h-2 rounded-full bg-[hsl(220,15%,88%)]" style={{ width: `${60 + (i * 7) % 30}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right side — scattered tabs */}
      <div className="absolute top-0 bottom-0 w-[42%] z-20" style={{ right: -170 }}>
        {rightTabs.map((tab, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, x: 50, rotate: tab.rotate + 8 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: tab.rotate }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute"
            style={{ left: `${tab.x}%`, top: `${tab.y}%`, width: tab.w }}
          >
            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-[hsl(220,15%,92%)] px-3 py-2 flex items-center gap-2">
              <span className="text-sm">{tab.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="h-2 rounded-full bg-[hsl(220,15%,88%)]" style={{ width: `${60 + (i * 7) % 30}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClutteredTabs;
