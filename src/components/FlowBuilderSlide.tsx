import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Sparkles, ArrowDown, Settings, Brain, Wrench, LogOut } from "lucide-react";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";

/* ─── Brand background ─── */
const BrandBg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute inset-0 bg-white overflow-hidden">
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
    <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[hsl(175,60%,50%)]/18 blur-[80px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />
    {children}
  </div>
);

/* ─── Flow node components ─── */
interface FlowNodeProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  delay: number;
  children?: React.ReactNode;
  className?: string;
}

const FlowNode: React.FC<FlowNodeProps> = ({ label, icon, color, borderColor, bgColor, delay, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 120 }}
    className={`flex flex-col items-center ${className}`}
  >
    <div
      className="px-6 py-3 rounded-xl border-2 flex items-center gap-2.5 shadow-sm"
      style={{ borderColor, backgroundColor: bgColor }}
    >
      {icon}
      <span className="text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
    {children}
  </motion.div>
);

/* ─── Connector line ─── */
const Connector: React.FC<{ delay: number; height?: number }> = ({ delay, height = 36 }) => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center origin-top"
    style={{ height }}
  >
    <svg width="4" height="100%" className="flex-1">
      <defs>
        <linearGradient id="conn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#43B5BF" />
          <stop offset="100%" stopColor="#C686F8" />
        </linearGradient>
      </defs>
      <rect x="1" y="0" width="2" height="100%" fill="url(#conn-grad)" rx="1" />
    </svg>
    <svg width="12" height="8" viewBox="0 0 12 8">
      <polygon points="6,8 0,0 12,0" fill="#C686F8" />
    </svg>
  </motion.div>
);

/* ─── Branching connectors (SVG) ─── */
const BranchConnectors: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    width="320" height="60" viewBox="0 0 320 60" className="mx-auto"
  >
    <defs>
      <linearGradient id="branch-grad-l" x1="160" y1="0" x2="80" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#43B5BF" />
        <stop offset="100%" stopColor="#C686F8" />
      </linearGradient>
      <linearGradient id="branch-grad-r" x1="160" y1="0" x2="240" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#43B5BF" />
        <stop offset="100%" stopColor="#C686F8" />
      </linearGradient>
    </defs>
    <path d="M160 0 L160 15 Q160 25 100 35 L80 45" stroke="url(#branch-grad-l)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M160 0 L160 15 Q160 25 220 35 L240 45" stroke="url(#branch-grad-r)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <polygon points="77,42 83,42 80,48" fill="#C686F8" />
    <polygon points="237,42 243,42 240,48" fill="#C686F8" />
  </motion.svg>
);

/* ─── Config panel tabs ─── */
const configTabs = [
  { num: "1", label: "Overview", icon: Settings },
  { num: "2", label: "Behavior", icon: Brain },
  { num: "3", label: "Tools", icon: Wrench },
  { num: "4", label: "Exit conditions", icon: LogOut },
];

export const FlowBuilderSlide: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => { setPhase(5); setActiveTab(1); }, 7000),
      setTimeout(() => setActiveTab(2), 8500),
      setTimeout(() => setActiveTab(3), 10000),
      setTimeout(() => setPhase(6), 11500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <BrandBg>
      <div className="absolute inset-0 z-20 flex flex-col">
        {/* Header */}
        <div className="px-8 pt-5 pb-3 flex items-center justify-between">
          <img src={broadvoiceLogo} alt="Broadvoice" className="h-5" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2">
            <span className="text-xs font-medium text-[hsl(220,10%,45%)]">No-Code Flow Builder</span>
          </motion.div>
        </div>

        <div className="flex-1 flex">
          {/* Left: Flow Builder Canvas */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
            {/* Title overlay */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-3 left-8"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-[hsl(220,10%,55%)]">← GoHealth</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold">Published</span>
              </div>
            </motion.div>

            {/* Blocks sidebar mock */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -20 }}
              transition={{ duration: 0.4 }}
              className="absolute left-6 top-14 w-[130px] bg-white/90 rounded-xl border border-[hsl(220,15%,88%)] p-3 shadow-sm"
            >
              <span className="text-xs font-bold text-[hsl(220,15%,25%)] block mb-2">Blocks</span>
              <span className="text-[9px] font-semibold text-[hsl(220,10%,55%)] uppercase tracking-wider block mb-1.5">GenAI</span>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[hsl(220,15%,96%)] border border-[hsl(220,15%,90%)] mb-3">
                <Sparkles className="w-3 h-3 text-[#27698F]" />
                <span className="text-[11px] font-medium text-[hsl(220,15%,30%)]">AI Agent</span>
              </div>
              <span className="text-[9px] font-semibold text-[hsl(220,10%,55%)] uppercase tracking-wider block mb-1.5">Exits</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[hsl(220,15%,96%)] border border-[hsl(220,15%,90%)]">
                  <Phone className="w-3 h-3 text-[#c0392b]" />
                  <span className="text-[11px] font-medium text-[hsl(220,15%,30%)]">Transfer</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[hsl(220,15%,96%)] border border-[hsl(220,15%,90%)]">
                  <PhoneOff className="w-3 h-3 text-[#c0392b]" />
                  <span className="text-[11px] font-medium text-[hsl(220,15%,30%)]">Hang-up</span>
                </div>
              </div>
            </motion.div>

            {/* Flow diagram */}
            <div className="flex flex-col items-center ml-16">
              {/* Incoming Call */}
              <FlowNode
                label="Incoming Call"
                icon={<Phone className="w-4 h-4 text-[#27ae60]" />}
                color="#27ae60"
                borderColor="#a8e6cf"
                bgColor="#f0faf4"
                delay={0.5}
              />

              {phase >= 2 && <Connector delay={0} />}

              {/* AI Agent node */}
              {phase >= 2 && (
                <FlowNode
                  label="Vet Demo"
                  icon={<Sparkles className="w-4 h-4 text-[#27698F]" />}
                  color="#27698F"
                  borderColor="#a8c8e8"
                  bgColor="#eef4fa"
                  delay={0}
                >
                  <div className="flex gap-1.5 mt-1.5">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[9px] px-2 py-0.5 rounded bg-white border border-[hsl(220,15%,85%)] text-[hsl(220,15%,35%)] font-medium"
                    >
                      Voice Agent
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-[9px] px-2 py-0.5 rounded bg-white border border-[hsl(220,15%,85%)] text-[hsl(220,15%,35%)] font-medium"
                    >
                      Hangup
                    </motion.span>
                  </div>
                </FlowNode>
              )}

              {/* Branch connectors */}
              {phase >= 3 && <BranchConnectors delay={0} />}

              {/* Exit nodes */}
              {phase >= 3 && (
                <div className="flex items-start gap-20 -mt-1">
                  <FlowNode
                    label="Transfer"
                    icon={<Phone className="w-3.5 h-3.5 text-[#e67e22]" />}
                    color="#e67e22"
                    borderColor="#f5cba7"
                    bgColor="#fef5ec"
                    delay={0.1}
                  />
                  <FlowNode
                    label="Hang-up"
                    icon={<PhoneOff className="w-3.5 h-3.5 text-[#c0392b]" />}
                    color="#c0392b"
                    borderColor="#f5b7b1"
                    bgColor="#fdf2f0"
                    delay={0.3}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right: Config Panel */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-[340px] bg-white/95 border-l border-[hsl(220,15%,88%)] flex flex-col"
              >
                <div className="px-5 pt-5 pb-3 border-b border-[hsl(220,15%,92%)]">
                  <span className="text-base font-bold text-[hsl(220,15%,20%)]">AI Agent configuration</span>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[hsl(220,15%,92%)]">
                  {configTabs.map((tab, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className={`flex-1 flex flex-col items-center py-2.5 text-[9px] font-semibold transition-colors relative ${
                        activeTab === i ? "text-[#27698F]" : "text-[hsl(220,10%,55%)]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold mb-0.5 ${
                        activeTab === i ? "bg-[#27698F] text-white" : i < activeTab ? "bg-green-500 text-white" : "bg-[hsl(220,15%,90%)] text-[hsl(220,10%,50%)]"
                      }`}>
                        {i < activeTab ? "✓" : tab.num}
                      </div>
                      {tab.label}
                      {activeTab === i && <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#27698F] rounded-full" />}
                    </motion.button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="flex-1 px-5 py-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeTab === 0 && (
                      <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                        <div>
                          <span className="text-[10px] font-semibold text-[hsl(220,10%,50%)] uppercase tracking-wider block mb-1">AI Agent name</span>
                          <div className="px-3 py-2 rounded-lg border border-[hsl(220,15%,88%)] bg-[hsl(220,15%,97%)]">
                            <span className="text-sm text-[hsl(220,15%,25%)]">Vet Demo</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-[hsl(220,10%,50%)] uppercase tracking-wider block mb-1">Description</span>
                          <div className="px-3 py-2 rounded-lg border border-[hsl(220,15%,88%)] bg-[hsl(220,15%,97%)] min-h-[48px]">
                            <span className="text-xs text-[hsl(220,10%,45%)] leading-relaxed">Front desk of Happy Pet Vets — answers questions, schedules appointments.</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 1 && (
                      <motion.div key="behavior" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                        <span className="text-xs font-semibold text-[hsl(220,15%,25%)] block">Behavior Rules</span>
                        <div className="space-y-2">
                          {["Greet callers warmly", "Identify appointment needs", "Collect pet, date, and location", "Confirm details before booking"].map((rule, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(220,15%,97%)] border border-[hsl(220,15%,90%)]">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#43B5BF]" />
                              <span className="text-xs text-[hsl(220,15%,30%)]">{rule}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 2 && (
                      <motion.div key="tools" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                        <span className="text-xs font-semibold text-[hsl(220,15%,25%)] block">Connected APIs</span>
                        {["Scheduling System", "Patient Records", "SMS Gateway"].map((api, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-green-50 border border-green-200">
                            <div className="flex items-center gap-2">
                              <Wrench className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-xs font-medium text-green-800">{api}</span>
                            </div>
                            <span className="text-[9px] font-semibold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">Connected</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === 3 && (
                      <motion.div key="exits" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                        <span className="text-xs font-semibold text-[hsl(220,15%,25%)] block">Exit Conditions</span>
                        <div className="px-3 py-3 rounded-lg border border-[hsl(220,15%,88%)] bg-white">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#27698F]" />
                            <span className="text-xs font-semibold text-[hsl(220,15%,25%)]">Voice Agent</span>
                          </div>
                          <span className="text-[10px] text-[hsl(220,10%,50%)] leading-relaxed">If caller requests a live agent or reports an emergency, transfer to queue</span>
                        </div>
                        <div className="px-3 py-3 rounded-lg border border-[hsl(220,15%,88%)] bg-white">
                          <div className="flex items-center gap-2 mb-1">
                            <PhoneOff className="w-3.5 h-3.5 text-[#c0392b]" />
                            <span className="text-xs font-semibold text-[hsl(220,15%,25%)]">Hangup</span>
                          </div>
                          <span className="text-[10px] text-[hsl(220,10%,50%)] leading-relaxed">Politely end call when all questions are answered</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom message */}
                {phase >= 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-5 py-3 border-t border-[hsl(220,15%,92%)] bg-[#43B5BF]/5"
                  >
                    <span className="text-[10px] text-[#27698F] font-medium text-center block">Design, test, and launch — no developers needed</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BrandBg>
  );
};

export default FlowBuilderSlide;
