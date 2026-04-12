import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mic, Calendar, MapPin, Clock, User, CheckCircle, AlertTriangle, Zap, ArrowRight, MessageSquare, Search, ClipboardList } from "lucide-react";
import VoiceWaveform from "./VoiceWaveform";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";
import goLogo from "@/assets/go-logo.png";

/* ─── Shared brand background ─── */
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

/* ─── Voice bubble component ─── */
interface VoiceBubbleProps {
  role: "caller" | "ai";
  text: string;
  delay: number;
  speaking?: boolean;
}

const VoiceBubble: React.FC<VoiceBubbleProps> = ({ role, text, delay, speaking }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 120 }}
    className={`flex items-start gap-3 ${role === "caller" ? "flex-row-reverse" : ""}`}
  >
    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
      role === "caller" ? "bg-[hsl(220,15%,90%)]" : "bg-gradient-to-br from-[#43B5BF] to-[#27698F]"
    }`}>
      {role === "caller" ? <User className="w-4 h-4 text-[hsl(220,15%,45%)]" /> : <Mic className="w-4 h-4 text-white" />}
    </div>
    <div className={`max-w-[75%] ${role === "caller" ? "text-right" : ""}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(220,10%,55%)] mb-1 block">
        {role === "caller" ? "Customer" : "GoEngage Voice"}
      </span>
      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        role === "caller"
          ? "bg-[hsl(220,15%,94%)] text-[hsl(220,15%,25%)] rounded-tr-sm"
          : "bg-gradient-to-r from-[#43B5BF]/10 to-[#27698F]/10 text-[hsl(220,15%,25%)] border border-[#43B5BF]/20 rounded-tl-sm"
      }`}>
        {text}
      </div>
      {speaking && (
        <div className="mt-1.5">
          <VoiceWaveform active barCount={16} color={role === "caller" ? "hsl(220,15%,65%)" : "#43B5BF"} />
        </div>
      )}
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════ */
/* Scene 1: Natural Conversation - No IVR     */
/* ═══════════════════════════════════════════ */
export const VoiceScene1_NaturalCall: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 6500),
      setTimeout(() => setPhase(4), 9500),
      setTimeout(() => setPhase(5), 12500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <BrandBg>
      <div className="absolute inset-0 z-20 flex flex-col">
        {/* Header */}
        <div className="px-8 pt-6 pb-4 flex items-center justify-between">
          <img src={broadvoiceLogo} alt="Broadvoice" className="h-5" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-[hsl(220,10%,45%)]">Live Call Active</span>
          </motion.div>
        </div>

        <div className="flex-1 flex">
          {/* Left: Conversation */}
          <div className="flex-1 px-8 py-4 flex flex-col">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-[#43B5BF]" />
                <span className="text-sm font-semibold text-[hsl(220,15%,25%)]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Incoming Call</span>
              </div>
              <p className="text-xs text-[hsl(220,10%,55%)]">No menus. No button pressing. Just a conversation.</p>
            </motion.div>

            <div className="flex-1 space-y-4 overflow-hidden">
              {phase >= 1 && <VoiceBubble role="ai" text="Hi! Thanks for calling Happy Paws Veterinary. How can I help you today?" delay={0} speaking={phase === 1} />}
              {phase >= 2 && <VoiceBubble role="caller" text="Hi, I'd like to schedule an appointment for my dog, Max." delay={0} speaking={phase === 2} />}
              {phase >= 3 && <VoiceBubble role="ai" text="Of course! I can help with that. What type of appointment does Max need?" delay={0} speaking={phase === 3} />}
              {phase >= 4 && <VoiceBubble role="caller" text="He needs his annual checkup and vaccinations." delay={0} speaking={phase === 4} />}
              {phase >= 5 && <VoiceBubble role="ai" text="Great — I'll get that scheduled. Which location works best for you?" delay={0} speaking={phase === 5} />}
            </div>
          </div>

          {/* Right: Waveform + Status */}
          <div className="w-[320px] flex flex-col items-center justify-center px-6 border-l border-[hsl(220,15%,90%)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-full bg-gradient-to-br from-[#43B5BF]/5 to-[#27698F]/5 rounded-2xl border border-[#43B5BF]/15 p-6 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#43B5BF] to-[#27698F] flex items-center justify-center shadow-lg shadow-[#43B5BF]/20">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <VoiceWaveform active={phase >= 1} color="#43B5BF" barCount={28} />
              <span className="text-xs font-medium text-[hsl(220,10%,45%)]">Speech-to-Speech AI</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#C686F8]" />
                <span className="text-[10px] text-[#C686F8] font-semibold">Real-time responses</span>
              </div>
            </motion.div>

            {/* No IVR badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-5 px-4 py-2 rounded-full bg-[hsl(220,15%,96%)] border border-[hsl(220,15%,88%)]"
            >
              <span className="text-[11px] font-medium text-[hsl(220,10%,45%)]">✨ No IVR menus required</span>
            </motion.div>
          </div>
        </div>
      </div>
    </BrandBg>
  );
};

/* ═══════════════════════════════════════════ */
/* Scene 2: Intent Detection + Data Capture   */
/* ═══════════════════════════════════════════ */
export const VoiceScene2_IntentCapture: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3800),
      setTimeout(() => setPhase(4), 5200),
      setTimeout(() => setPhase(5), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const detectedFields = [
    { icon: Calendar, label: "Appointment Type", value: "Annual Checkup + Vaccines", delay: 1.5 },
    { icon: User, label: "Pet Name", value: "Max (Golden Retriever)", delay: 2.5 },
    { icon: MapPin, label: "Preferred Location", value: "Downtown Clinic", delay: 4 },
    { icon: Clock, label: "Preferred Date", value: "Thursday, 2:00 PM", delay: 5.5 },
  ];

  return (
    <BrandBg>
      <div className="absolute inset-0 z-20 flex flex-col">
        <div className="px-8 pt-6 pb-4 flex items-center justify-between">
          <img src={broadvoiceLogo} alt="Broadvoice" className="h-5" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-[hsl(220,10%,45%)]">Intent Analysis Active</span>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Left: Conversation continues */}
          <div className="flex-1 px-8 py-4 flex flex-col">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
              <span className="text-sm font-semibold text-[hsl(220,15%,25%)]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Real-Time Understanding</span>
              <p className="text-xs text-[hsl(220,10%,55%)] mt-0.5">Identifying intent and collecting details naturally</p>
            </motion.div>

            <div className="flex-1 space-y-3 overflow-hidden">
              {phase >= 1 && <VoiceBubble role="caller" text="Annual checkup and vaccinations for Max." delay={0} />}
              {phase >= 2 && <VoiceBubble role="ai" text="Got it — checkup plus vaccines for Max. Which of our locations is most convenient?" delay={0} />}
              {phase >= 3 && <VoiceBubble role="caller" text="The downtown clinic on Main Street." delay={0} />}
              {phase >= 4 && <VoiceBubble role="ai" text="Downtown it is. I see availability Thursday at 2 PM. Does that work?" delay={0} />}
              {phase >= 5 && <VoiceBubble role="caller" text="Thursday at 2 works perfectly." delay={0} />}
            </div>
          </div>

          {/* Right: Detected intent fields */}
          <div className="w-[340px] px-6 py-6 border-l border-[hsl(220,15%,90%)] flex flex-col">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#C686F8]/15 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[#C686F8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C686F8]">Intent Detected</span>
              </div>
            </motion.div>

            <div className="space-y-3 flex-1">
              {detectedFields.map((field, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: field.delay, duration: 0.5, type: "spring" }}
                  className="bg-white/80 rounded-xl border border-[hsl(220,15%,90%)] p-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <field.icon className="w-3.5 h-3.5 text-[#43B5BF]" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(220,10%,55%)]">{field.label}</span>
                  </div>
                  <span className="text-sm font-medium text-[hsl(220,15%,25%)]">{field.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 5 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-center"
            >
              <span className="text-[10px] text-[hsl(220,10%,55%)]">All details captured in natural conversation</span>
            </motion.div>
          </div>
        </div>
      </div>
    </BrandBg>
  );
};

/* ═══════════════════════════════════════════ */
/* Scene 3: API Execution - Schedule + SMS    */
/* ═══════════════════════════════════════════ */
export const VoiceScene3_APIExecution: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4000),
      setTimeout(() => setPhase(4), 5500),
      setTimeout(() => setPhase(5), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const apiSteps = [
    { label: "Verify Availability", status: phase >= 1 ? "done" : "pending", Icon: Search },
    { label: "Schedule Appointment", status: phase >= 2 ? "done" : phase >= 1 ? "active" : "pending", Icon: Calendar },
    { label: "Update Patient Record", status: phase >= 3 ? "done" : phase >= 2 ? "active" : "pending", Icon: ClipboardList },
    { label: "Send SMS Confirmation", status: phase >= 4 ? "done" : phase >= 3 ? "active" : "pending", Icon: MessageSquare },
  ];

  return (
    <BrandBg>
      <div className="absolute inset-0 z-20 flex flex-col">
        <div className="px-8 pt-6 pb-4 flex items-center justify-between">
          <img src={broadvoiceLogo} alt="Broadvoice" className="h-5" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
          <span className="text-xs font-medium text-[hsl(220,10%,45%)]">Executing Actions</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-10 gap-12">
          {/* Left: API Pipeline */}
          <div className="flex-1 max-w-[380px]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
              <span className="text-lg font-semibold text-[hsl(220,15%,25%)]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Behind the Scenes</span>
              <p className="text-xs text-[hsl(220,10%,55%)] mt-1">No human involvement — fully automated execution</p>
            </motion.div>

            <div className="space-y-3">
              {apiSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.4, duration: 0.4 }}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-xl border transition-all duration-500 ${
                    step.status === "done"
                      ? "bg-[#43B5BF]/5 border-[#C686F8]/20"
                      : step.status === "active"
                      ? "bg-[#43B5BF]/5 border-[#43B5BF]/30 shadow-sm shadow-[#43B5BF]/10"
                      : "bg-white/60 border-[hsl(220,15%,90%)]"
                  }`}
                >
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id={`api-icon-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#43B5BF" />
                        <stop offset="100%" stopColor="#C686F8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <step.Icon className="w-5 h-5 flex-shrink-0" style={{ stroke: `url(#api-icon-grad-${i})` }} />
                  <span className={`text-sm font-medium flex-1 ${
                    step.status === "done" ? "text-[#27698F]" : step.status === "active" ? "text-[#27698F]" : "text-[hsl(220,10%,55%)]"
                  }`}>{step.label}</span>
                  {step.status === "done" && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle className="w-5 h-5 text-[#C686F8]" />
                    </motion.div>
                  )}
                  {step.status === "active" && (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#43B5BF" />
                          <stop offset="100%" stopColor="#C686F8" />
                        </linearGradient>
                      </defs>
                      <circle cx="12" cy="12" r="10" stroke="url(#spinner-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="50 20" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Confirmation */}
          <div className="w-[300px] flex flex-col items-center">
            <AnimatePresence>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="bg-white rounded-2xl border border-[hsl(220,15%,88%)] shadow-lg shadow-black/5 p-6 w-full"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-green-700">Appointment Confirmed</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between"><span className="text-[hsl(220,10%,55%)]">Pet</span><span className="font-medium text-[hsl(220,15%,25%)]">Max (Golden Retriever)</span></div>
                    <div className="flex justify-between"><span className="text-[hsl(220,10%,55%)]">Service</span><span className="font-medium text-[hsl(220,15%,25%)]">Annual Checkup + Vaccines</span></div>
                    <div className="flex justify-between"><span className="text-[hsl(220,10%,55%)]">Location</span><span className="font-medium text-[hsl(220,15%,25%)]">Downtown Clinic</span></div>
                    <div className="flex justify-between"><span className="text-[hsl(220,10%,55%)]">Date</span><span className="font-medium text-[hsl(220,15%,25%)]">Thursday, 2:00 PM</span></div>
                  </div>
                  {phase >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="text-[11px] text-blue-700 font-medium">SMS confirmation sent ✓</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {phase < 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#43B5BF]/10 to-[#27698F]/10 flex items-center justify-center">
                  <div className="w-10 h-10 border-3 border-[#43B5BF] border-t-transparent rounded-full animate-spin" />
                </div>
                <span className="text-xs text-[hsl(220,10%,55%)]">Processing...</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </BrandBg>
  );
};

/* ═══════════════════════════════════════════ */
/* Scene 4: Emergency Escalation              */
/* ═══════════════════════════════════════════ */
export const VoiceScene4_Escalation: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 7000),
      setTimeout(() => setPhase(5), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <BrandBg>
      {/* Emergency flash overlay */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 bg-amber-400 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex flex-col">
        <div className="px-8 pt-6 pb-4 flex items-center justify-between">
          <img src={broadvoiceLogo} alt="Broadvoice" className="h-5" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
          <motion.div
            animate={{ backgroundColor: phase >= 2 ? "hsl(25, 90%, 95%)" : "transparent" }}
            className="flex items-center gap-2 px-3 py-1 rounded-full transition-colors"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${phase >= 2 ? "bg-amber-500 animate-pulse" : "bg-green-400 animate-pulse"}`} />
            <span className={`text-xs font-medium ${phase >= 2 ? "text-amber-700" : "text-[hsl(220,10%,45%)]"}`}>
              {phase >= 4 ? "Transferred to Live Agent" : phase >= 2 ? "⚠️ Emergency Detected" : "Live Call Active"}
            </span>
          </motion.div>
        </div>

        <div className="flex-1 flex">
          {/* Left: Conversation */}
          <div className="flex-1 px-8 py-4 flex flex-col">
            <div className="flex-1 space-y-3 overflow-hidden">
              {phase >= 1 && <VoiceBubble role="ai" text="Your appointment is all set. Is there anything else I can help with?" delay={0} />}
              {phase >= 2 && <VoiceBubble role="caller" text="Actually yes — my dog just got into some chocolate. He's acting really lethargic. Is this an emergency?" delay={0} />}
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl mx-8"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">Emergency intent detected — escalating to live agent</span>
                </motion.div>
              )}
              {phase >= 3 && <VoiceBubble role="ai" text="This sounds urgent. I'm connecting you with a veterinary specialist right away — no need to repeat anything." delay={0.3} />}
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl mx-8"
                >
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">Connected — full context transferred</span>
                </motion.div>
              )}
              {phase >= 5 && <VoiceBubble role="ai" text="Hi, this is Dr. Sarah. I can see Max may have eaten chocolate and is lethargic. Let's get him in right away — how much chocolate and how long ago?" delay={0} speaking />}
            </div>
          </div>

          {/* Right: Context panel */}
          <div className="w-[320px] px-5 py-6 border-l border-[hsl(220,15%,90%)] flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Conversation Insights</span>
              </div>

              <div className="bg-white/90 rounded-xl border border-[hsl(220,15%,88%)] p-4 shadow-sm mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C686F8] block mb-2">AI-Generated Summary</span>
                <p className="text-xs text-[hsl(220,15%,30%)] leading-relaxed">
                  Customer called to schedule annual checkup for Max (Golden Retriever) at Downtown Clinic. Appointment confirmed for Thursday 2 PM. 
                  <span className="text-amber-700 font-semibold"> Customer then reported possible chocolate ingestion — dog is lethargic. Urgent veterinary care needed.</span>
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 4 ? 1 : 0 }}
                className="bg-green-50 rounded-xl border border-green-200 p-4"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 block mb-2">Handoff Status</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /><span className="text-green-700">Context transferred</span></div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /><span className="text-green-700">No repetition needed</span></div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /><span className="text-green-700">Agent picks up where AI left off</span></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </BrandBg>
  );
};

/* ═══════════════════════════════════════════ */
/* Scene 5: Speed + Seamless - Closing        */
/* ═══════════════════════════════════════════ */
export const VoiceScene5_Speed: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <BrandBg>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="mb-2">
            <span className="text-4xl font-medium" style={{ fontFamily: "'Instrument Sans', sans-serif", background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              This isn't just automation.
            </span>
          </h2>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-4xl" style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              It's execution.
            </span>
          </motion.h2>
        </motion.div>

        {/* Waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-10"
        >
          <VoiceWaveform active={phase >= 1} color="#43B5BF" barCount={40} />
        </motion.div>

        {/* GoEngage Voice in Besley italic with gradient */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 10 }}
          transition={{ duration: 0.6 }}
          className="text-5xl text-center pb-3"
          style={{
            fontFamily: "'Besley', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.3,
            background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          GoEngage Voice
        </motion.p>
      </div>
    </BrandBg>
  );
};
