import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Search, HelpCircle, Bell, Settings, X, Phone, Mic, Zap, ClipboardList, Scissors, Calendar, Stethoscope, TrendingDown, DollarSign } from "lucide-react";
import '@fontsource/besley/400-italic.css';
import '@fontsource/instrument-sans/500.css';
import VoiceWaveform from "@/components/VoiceWaveform";

import ChatMessage, { RichContent } from "@/components/ChatMessage";
import conversationScript, { ScriptStep } from "@/components/conversationScript";
import WelcomeScreen from "@/components/WelcomeScreen";
import AbstractDashboard from "@/components/AbstractDashboard";
import ClutteredTabs from "@/components/ClutteredTabs";
import SummaryScreen from "@/components/SummaryScreen";
import { VoiceScene1_NaturalCall, VoiceScene3_APIExecution, VoiceScene4_Escalation, VoiceScene5_Speed } from "@/components/VoiceAgentSlides";
import { FlowBuilderSlide } from "@/components/FlowBuilderSlide";

import dashboardPreview from "@/assets/dashboard-preview.png";
import emmaImg from "@/assets/emma-illustration.svg";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";
import goLogo from "@/assets/go-logo.png";
import robImg from "@/assets/rob-illustration.png";
import madRobImg from "@/assets/mad-rob.png";
import corgiImg from "@/assets/corgi.png";
import catImg from "@/assets/cat.png";

/* ── Individual Scene Components ── */

const TitleSlide: React.FC = () => {
  const bubbles = [
    { role: "ai" as const, text: "Hi! Thanks for calling Happy Paws Veterinary. How can I help you today?" },
    { role: "caller" as const, text: "Hi, I'd like to schedule an appointment for my dog, Max." },
    { role: "ai" as const, text: "Of course! I can help with that. What type of appointment does Max need?" },
  ];

  return (
    <div className="absolute inset-0 bg-white overflow-hidden">
      <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
      <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[hsl(175,60%,50%)]/18 blur-[80px]" />
      <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
      <div className="absolute bottom-[5%] left-[15%] w-[350px] h-[350px] rounded-full bg-[hsl(265,50%,50%)]/8 blur-[100px]" />
      <div className="absolute top-[15%] right-[25%] w-[200px] h-[200px] rounded-full bg-[hsl(275,55%,55%)]/20 blur-[60px]" />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />

      {/* Left: Title */}
      <div className="absolute left-[55px] top-[calc(30%+140px)] -translate-y-1/2">
        <img src={broadvoiceLogo} alt="Broadvoice" className="h-7 mb-6" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
        <h1>
          <span className="text-7xl font-medium block pb-0" style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: '1.2', background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GoEngage</span>
          <span className="text-7xl font-medium block pb-0" style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, lineHeight: '1.2', background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Voice</span>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(220,15%,25%)] block mt-3 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Product Preview</span>
        </h1>
      </div>

      {/* Right: Static conversation preview */}
      <div className="absolute right-[30px] top-[calc(12%+25px)] w-[420px] h-[76%] flex flex-col rounded-3xl overflow-hidden p-4" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.55) 100%)', backdropFilter: 'blur(28px) saturate(1.6)', WebkitBackdropFilter: 'blur(28px) saturate(1.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.45)' }}>
        <div className="flex-1 px-3 py-3 space-y-3 overflow-hidden">
          {bubbles.map((b, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${b.role === "caller" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                b.role === "caller" ? "bg-[hsl(220,15%,90%)]" : "bg-gradient-to-br from-[#43B5BF] to-[#27698F]"
              }`}>
                {b.role === "caller"
                  ? <span className="text-[hsl(220,15%,45%)] text-xs font-bold">C</span>
                  : <Mic className="w-4 h-4 text-white" />
                }
              </div>
              <div className={`max-w-[75%] ${b.role === "caller" ? "text-right" : ""}`}>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(220,10%,55%)] mb-1 block">
                  {b.role === "caller" ? "Customer" : "GoEngage Voice"}
                </span>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  b.role === "caller"
                    ? "bg-[hsl(220,15%,94%)] text-[hsl(220,15%,25%)] rounded-tr-sm"
                    : "bg-gradient-to-r from-[#43B5BF]/10 to-[#27698F]/10 text-[hsl(220,15%,25%)] border border-[#43B5BF]/20 rounded-tl-sm"
                }`}>
                  {b.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Speech-to-Speech card */}
        <div className="mx-4 mb-4 bg-gradient-to-br from-[#43B5BF]/5 to-[#27698F]/5 rounded-2xl border border-[#43B5BF]/15 p-5 flex flex-col items-center gap-3">
          <VoiceWaveform active color="#43B5BF" barCount={24} />
          <span className="text-xs font-medium text-[hsl(220,10%,45%)]">Speech-to-Speech AI</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#C686F8]" />
            <span className="text-[10px] text-[#C686F8] font-semibold">Real-time responses</span>
          </div>
        </div>
      </div>

    </div>
  );
};

/* Overlay-only slides for Rob scenes (Rob + bg rendered persistently outside AnimatePresence) */
const EmmaSlideOverlay: React.FC = () => (
  <div className="absolute inset-0 z-20">
    <div className="absolute left-10 top-1/2 -translate-y-1/2">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ background: 'linear-gradient(90deg, #43B5BF, #27698F, #C686F8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '3rem', fontWeight: 500 }}>Meet </span>
        <span style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '3rem' }}>Rob</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="text-sm text-[hsl(220,10%,45%)] mt-3 max-w-xs leading-relaxed">
        Call Center Operations Manager<br />Multilocation Veterinary Clinic
      </motion.p>
    </div>
  </div>
);



const DashboardSlideOverlay: React.FC = () => (
  <div className="absolute inset-0 z-20 flex items-end justify-between px-16 pb-8">
    <motion.img
      src={corgiImg}
      alt="Corgi"
      initial={{ opacity: 0, x: -80, scale: 0.8 }}
      animate={{ opacity: 1, x: -50, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 80 }}
      className="h-[55%] w-auto object-contain"
    />
    <motion.img
      src={catImg}
      alt="Cat"
      initial={{ opacity: 0, x: 80, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.7, type: "spring", stiffness: 80 }}
      className="h-[50%] w-auto object-contain"
    />
  </div>
);

/* ── Routine Calls Slide — overlay only ── */
const RoutineCallsSlideOverlay: React.FC = () => {
  const tickets = [
    { icon: ClipboardList, title: "Vaccination Records", desc: "Request for Max's vaccination history", tag: "Records", delay: 0.4, color: "#43B5BF" },
    { icon: Stethoscope, title: "Teeth Cleaning", desc: "Schedule dental cleaning for Bella", tag: "Grooming", delay: 0.7, color: "#27698F" },
    { icon: Scissors, title: "Nail Clipping", desc: "Book a nail trim for Charlie", tag: "Grooming", delay: 1.0, color: "#C686F8" },
    { icon: Calendar, title: "Annual Checkup", desc: "Schedule yearly wellness exam", tag: "Appointment", delay: 1.3, color: "#43B5BF" },
  ];

  return (
    <div className="absolute top-0 bottom-0 z-20 flex items-center pl-4 pr-4" style={{ left: '66%', right: 0 }}>
      <div className="flex flex-col gap-3 w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-1"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(220,10%,55%)]">
            Today's Call Queue
          </p>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#43B5BF]/10 border border-[#43B5BF]/20">
            <Phone className="w-3 h-3 text-[#27698F]" />
            <span className="text-[10px] font-bold text-[#27698F]">127 calls today</span>
          </div>
        </motion.div>
        {tickets.map((t, i) => {
          const IconComp = t.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: t.delay, duration: 0.5, type: "spring", stiffness: 120 }}
              className="bg-white/90 backdrop-blur-md rounded-xl border border-[hsl(220,15%,88%)] shadow-sm p-3 flex items-center gap-3"
            >
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id={`icon-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#43B5BF" />
                    <stop offset="100%" stopColor="#C686F8" />
                  </linearGradient>
                </defs>
              </svg>
              <IconComp className="w-4 h-4 flex-shrink-0" style={{ stroke: `url(#icon-grad-${i})` }} />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[hsl(220,15%,20%)] truncate block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{t.title}</span>
                <p className="text-[10px] text-[hsl(220,10%,50%)] mt-0.5">{t.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


const WelcomeSlide: React.FC = () => (
  <div className="flex flex-col h-full bg-background relative">
    <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <img src={broadvoiceLogo} alt="BroadVoice" className="h-6" />
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
          <Search className="w-3.5 h-3.5" />
          <span>Search dashboards, reports...</span>
        </div>
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><HelpCircle className="w-4 h-4 text-muted-foreground" /></button>
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Bell className="w-4 h-4 text-muted-foreground" /></button>
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Settings className="w-4 h-4 text-muted-foreground" /></button>
        <img src={emmaImg} alt="Emma" className="w-7 h-7 rounded-full object-cover object-top border border-border" />
      </div>
    </div>
    <div className="flex items-center justify-between px-5 py-2 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <img src={goLogo} alt="Go" className="h-8 rounded" />
        <div>
          <p className="text-sm font-semibold text-foreground">AI Analyst</p>
          <p className="text-xs text-muted-foreground">AI-Powered Analytics</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto relative">
      <WelcomeScreen visible onSelectPrompt={() => {}} />
    </div>
  </div>
);

/* ── Chat Scene — auto-plays the conversation script ── */
interface Message {
  id: number;
  role: "ai" | "user";
  content: RichContent[];
}

const ChatSlide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const playingRef = useRef(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Skip pause steps — jump straight to chat steps
  const chatSteps = conversationScript.filter(s => s.type !== "pause");

  useEffect(() => {
    if (scriptIndex >= chatSteps.length) return;

    const step = chatSteps[scriptIndex];

    if (step.type === "user") {
      const text = step.content?.[0]?.type === "text" ? step.content[0].value : "";
      const speed = step.typingSpeed || 60;
      setInput("");
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (!playingRef.current) { clearInterval(typeInterval); return; }
        charIndex++;
        setInput(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            if (!playingRef.current) return;
            setInput("");
            setMessages(prev => [...prev, { id: Date.now(), role: "user", content: step.content! }]);
            setScriptIndex(i => i + 1);
          }, 800);
        }
      }, speed);
      return () => clearInterval(typeInterval);
    }

    if (step.type === "ai") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        if (!playingRef.current) return;
        setIsTyping(false);
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.role === "ai") {
            return [...prev.slice(0, -1), { ...last, content: [...last.content, ...step.content!] }];
          }
          return [...prev, { id: Date.now(), role: "ai", content: step.content! }];
        });
        const nextStep = chatSteps[scriptIndex + 1];
        if (nextStep && nextStep.type === "ai") {
          setTimeout(() => { if (playingRef.current) setScriptIndex(i => i + 1); }, 1500);
        } else {
          const holdTime = step.holdAfter || 2000;
          setTimeout(() => { if (playingRef.current) setScriptIndex(i => i + 1); }, holdTime);
        }
      }, step.delay);
      return () => clearTimeout(timer);
    }
  }, [scriptIndex]);

  useEffect(() => {
    return () => { playingRef.current = false; };
  }, []);

  return (
    <div className="flex flex-col h-full bg-background relative">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <img src={broadvoiceLogo} alt="BroadVoice" className="h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
            <Search className="w-3.5 h-3.5" />
            <span>Search dashboards, reports...</span>
          </div>
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><HelpCircle className="w-4 h-4 text-muted-foreground" /></button>
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Bell className="w-4 h-4 text-muted-foreground" /></button>
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Settings className="w-4 h-4 text-muted-foreground" /></button>
          <img src={emmaImg} alt="Emma" className="w-7 h-7 rounded-full object-cover object-top border border-border" />
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <img src={goLogo} alt="Go" className="h-8 rounded" />
          <div>
            <p className="text-sm font-semibold text-foreground">AI Analyst</p>
            <p className="text-xs text-muted-foreground">AI-Powered Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto relative">
        <div className="px-5 py-4 space-y-4">
          <AnimatePresence>
            {messages.map(msg => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
          </AnimatePresence>
          {isTyping && <ChatMessage role="ai" content={[]} isTyping />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="px-5 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <input value={input} readOnly placeholder="Ask about your contact center data..." className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          <button disabled className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-all">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5 text-center">AI can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
};

/* ── MadRob Slide — overlay only ── */
const MadRobSlideOverlay: React.FC = () => (
  <div className="absolute top-0 bottom-0 z-20 flex items-center pr-6" style={{ left: '60%', right: 0 }}>
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-2 gap-3 mt-2">
        {[
          { label: "Routine Calls", value: "35%", desc: "of daily volume", delay: 0.6, color: "#C686F8" },
          { label: "Cost Per Call", value: "$8–12", desc: "live agent rate", delay: 0.8, color: "#43B5BF" },
          { label: "Agent Utilization", value: "62%", desc: "on repetitive tasks", delay: 1.0, color: "#27698F" },
          { label: "Annual Waste", value: "$140K+", desc: "on automatable calls", delay: 1.2, color: "#C686F8" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: s.delay, duration: 0.5, type: "spring", stiffness: 120 }}
            className="bg-white/90 backdrop-blur-md rounded-xl border border-[hsl(220,15%,88%)] shadow-sm p-4"
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-[hsl(220,10%,55%)] mb-2">{s.label}</p>
            <span
              className="text-2xl font-bold block"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                background: `linear-gradient(135deg, ${s.color}, #27698F)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {s.value}
            </span>
            <p className="text-[10px] text-[hsl(220,10%,50%)] mt-1">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ── GoEngage Intro Slide ── */
const GoEngageIntroSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white overflow-hidden">
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="text-5xl block text-center pb-2" style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, lineHeight: 1.3, background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          GoEngage Voice
        </span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-sm text-[hsl(220,10%,45%)] mt-4 max-w-md text-center leading-relaxed"
      >
        An AI-powered inbound voice assistant that doesn't just route calls — it resolves them.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8"
      >
        <VoiceWaveform active color="#43B5BF" barCount={40} />
      </motion.div>
    </div>
  </div>
);

/* ── Results Slide ── */
const ResultsSlide: React.FC = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const results = [
    { Icon: TrendingDown, label: "Fewer routine calls", desc: "AI handles the simple stuff" },
    { Icon: DollarSign, label: "Lower costs", desc: "No more $8–$12 per routine call" },
    { Icon: Zap, label: "Faster resolution", desc: "Seconds, not minutes" },
  ];

  return (
    <div className="absolute inset-0 bg-white overflow-hidden">
      <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
      <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="results-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43B5BF" />
            <stop offset="100%" stopColor="#C686F8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-[0.25em] text-[hsl(220,10%,55%)] mb-6"
        >
          The Result
        </motion.p>
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: phase >= i + 1 ? 1 : 0, x: phase >= i + 1 ? 0 : -30 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="flex items-center gap-5 bg-white/80 backdrop-blur-md rounded-2xl border border-[hsl(220,15%,88%)] shadow-sm p-6"
            >
              <r.Icon className="w-7 h-7 flex-shrink-0" style={{ stroke: "url(#results-icon-grad)" }} />
              <div>
                <span className="text-lg font-bold text-[hsl(220,15%,20%)] block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{r.label}</span>
                <span className="text-xs text-[hsl(220,10%,50%)]">{r.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Tagline Slide ── */
const TaglineSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white overflow-hidden">
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="text-3xl text-[hsl(220,10%,50%)] block mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400 }}>
          Your IVR routes calls.
        </span>
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center"
      >
        <span className="text-5xl font-medium block pb-3" style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, lineHeight: 1.3, background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          GoEngage resolves them.
        </span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-10 flex items-center gap-3"
      >
        <img src={broadvoiceLogo} alt="Broadvoice" className="h-7" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
      </motion.div>
    </div>
  </div>
);

const SCENE_LABELS = [
  "Title",
  "Meet Rob",
  "Dashboard",
  "Routine Calls",
  "Cost",
  "Mad Rob",
  "GoEngage Intro",
  "Voice: Natural Call",
  "Voice: API Execution",
  "Voice: Escalation",
  "Voice: Flow Builder",
  "Voice: Speed",
  "Results",
  "Tagline",
  "Logo",
];

const LogoSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
    <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[hsl(175,60%,50%)]/18 blur-[80px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />
    <motion.img
      src={broadvoiceLogo}
      alt="Broadvoice"
      className="h-10 relative z-10"
      style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    />
  </div>
);

// Scenes 1-5 are "Rob scenes" — they only render overlays; Rob + bg are persistent
const ROB_SCENE_INDICES = new Set([1, 2, 3, 4]);

const SCENE_COMPONENTS: React.FC[] = [
  TitleSlide,
  EmmaSlideOverlay,
  DashboardSlideOverlay,
  RoutineCallsSlideOverlay,
  MadRobSlideOverlay,
  GoEngageIntroSlide,
  VoiceScene1_NaturalCall,
  VoiceScene3_APIExecution,
  VoiceScene4_Escalation,
  FlowBuilderSlide,
  VoiceScene5_Speed,
  ResultsSlide,
  TaglineSlide,
  LogoSlide,
];


// Audio cue points: [sceneIndex] = audio currentTime in seconds
// Scene 0 (Title) has no audio — it's a visual-only intro with a delay.
// Audio starts at scene 1 (Meet Rob). Cue times are relative to audio start (0s = "Meet Rob").
const TITLE_DELAY_MS = 3000;

// Maps scene index → audio currentTime. Scene 0 (Title) = -1 means "before audio".
const SCENE_CUE_TIMES = [
  -1,    // 0: Title (no audio)
  0,     // 1: Meet Rob — "Meet Rob. Rob manages a call center..."
  3.5,   // 2: Dashboard — "veterinary clinic with 40 locations"
  8,     // 3: Routine Calls — "large portion of his calls are routine"
  14.5,  // 4: Mad Rob — "every live interaction can cost 8-12 dollars"
  22.5,  // 5: GoEngage Intro — "So Rob implemented Go Engage Voice"
  35.8,  // 6: Natural Call — "no IVR, no menus, just a natural conversation"
  52,    // 7: API Execution — "schedules the appointment directly"
  66.8,  // 8: Escalation — "emergency, the AI recognizes it instantly"
  76.5,  // 9: Flow Builder — "no-code flow builder"
  100.7, // 10: Speed — "speech-to-speech AI, responses are immediate"
  109,   // 11: Results — "The result? Fewer routine calls"
  115,   // 12: Tagline — "Your IVR routes calls. Go Engage resolves them."
  116.5, // 13: Logo
];

const Index = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioElRef = useRef<HTMLAudioElement>(null);
  const titleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manualOverrideRef = useRef(false);

  const goNext = useCallback(() => {
    manualOverrideRef.current = true;
    setSceneIndex((i) => Math.min(i + 1, SCENE_COMPONENTS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    manualOverrideRef.current = true;
    setSceneIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Play button: starts presentation from Title, waits TITLE_DELAY_MS, then starts audio + advances
  const togglePlay = useCallback(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Pause everything
      audio.pause();
      if (titleTimerRef.current) {
        clearTimeout(titleTimerRef.current);
        titleTimerRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Start presentation
    manualOverrideRef.current = false;
    setIsPlaying(true);

    // If we're at the title slide, wait before starting audio
    if (sceneIndex === 0) {
      setSceneIndex(0); // ensure we're on title
      titleTimerRef.current = setTimeout(() => {
        titleTimerRef.current = null;
        setSceneIndex(1); // advance to Meet Rob
        audio.currentTime = 0;
        audio.play().catch((e) => console.error("Audio play failed:", e));
      }, TITLE_DELAY_MS);
    } else {
      // Resume from current position
      audio.play().catch((e) => console.error("Audio play failed:", e));
    }
  }, [isPlaying, sceneIndex]);

  const toggleMute = useCallback(() => {
    if (audioElRef.current) {
      audioElRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Sync scenes to audio currentTime
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    const onTime = () => {
      const t = audio.currentTime;
      setAudioTime(t);
      if (manualOverrideRef.current) return;
      let target = 0;
      for (let i = SCENE_CUE_TIMES.length - 1; i >= 0; i--) {
        if (SCENE_CUE_TIMES[i] >= 0 && t >= SCENE_CUE_TIMES[i]) {
          target = i;
          break;
        }
      }
      setSceneIndex((prev) => (prev !== target ? target : prev));
    };

    const onEnded = () => {
      setIsPlaying(false);
      manualOverrideRef.current = false;
    };

    const onError = () => console.error("Narration audio failed to load");

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    };
  }, []);

  const SceneComponent = SCENE_COMPONENTS[sceneIndex];
  const isRobScene = ROB_SCENE_INDICES.has(sceneIndex);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
      <audio ref={audioElRef} src="/audio/narration.mp3" preload="auto" />
      <div className="absolute inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full h-full sm:w-[1024px] sm:h-[768px] overflow-hidden sm:rounded-[40px] sm:border-[16px] border-white/40 shadow-none sm:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md bg-white/10">

        {/* Persistent Rob + background layer for scenes 1-5 */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{ opacity: isRobScene ? 1 : 0, pointerEvents: isRobScene ? 'auto' : 'none' }}
        >
          <div className="absolute inset-0 bg-white">
            <div className="absolute -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px] will-change-transform" />
            <div className="absolute bottom-[-150px] right-[20%] w-[600px] h-[600px] rounded-full bg-[#1f6eac]/15 blur-[160px] will-change-transform" />
            <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/10 blur-[140px] will-change-transform" />
          </div>
          <div className="absolute inset-0 flex items-end justify-center z-10">
            <img src={robImg} alt="Rob" className="h-[95%] w-auto object-contain" style={{ transform: 'translateZ(0)' }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
            style={{ zIndex: isRobScene ? 20 : 0 }}
          >
            <SceneComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Global navigation arrows */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={sceneIndex === 0}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-[hsl(220,15%,25%)]" />
        </button>
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[hsl(220,15%,25%)]" /> : <Play className="w-4 h-4 text-[hsl(220,15%,25%)]" />}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[hsl(220,15%,25%)]" /> : <Volume2 className="w-4 h-4 text-[hsl(220,15%,25%)]" />}
        </button>
        <span className="text-xs text-[hsl(220,10%,45%)] font-medium min-w-[80px] text-center">
          {sceneIndex + 1} / {SCENE_COMPONENTS.length}
        </span>
        <span className="text-xs font-mono text-[hsl(220,10%,45%)] bg-white/80 backdrop-blur-sm shadow-md px-3 py-2 rounded-full min-w-[60px] text-center">
          {Math.floor(audioTime / 60)}:{String(Math.floor(audioTime % 60)).padStart(2, '0')}.{Math.floor((audioTime % 1) * 10)}
        </span>
        <button
          onClick={goNext}
          disabled={sceneIndex >= SCENE_COMPONENTS.length - 1}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-[hsl(220,15%,25%)]" />
        </button>
      </div>
    </div>
  );
};

export default Index;
