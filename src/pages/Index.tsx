import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Search, HelpCircle, Bell, Settings, X } from "lucide-react";
import '@fontsource/besley/400-italic.css';
import '@fontsource/instrument-sans/500.css';

import ChatMessage, { RichContent } from "@/components/ChatMessage";
import conversationScript, { ScriptStep } from "@/components/conversationScript";
import WelcomeScreen from "@/components/WelcomeScreen";
import AbstractDashboard from "@/components/AbstractDashboard";
import ClutteredTabs from "@/components/ClutteredTabs";
import SummaryScreen from "@/components/SummaryScreen";

import dashboardPreview from "@/assets/dashboard-preview.png";
import emmaImg from "@/assets/emma-illustration.svg";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";
import goLogo from "@/assets/go-logo.png";
import robImg from "@/assets/rob-illustration.png";
import madRobImg from "@/assets/mad-rob.png";
import corgiImg from "@/assets/corgi.png";
import catImg from "@/assets/cat.png";
import dotsImg from "@/assets/dots.png";
import bvIcon from "@/assets/bv-icon.png";

/* ── Individual Scene Components ── */

const TitleSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white overflow-hidden">
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[hsl(180,60%,50%)]/25 blur-[180px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[hsl(185,55%,50%)]/22 blur-[180px]" />
    <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[hsl(175,60%,50%)]/18 blur-[80px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[hsl(270,55%,55%)]/12 blur-[120px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[hsl(280,50%,55%)]/15 blur-[140px]" />
    <div className="absolute bottom-[5%] left-[15%] w-[350px] h-[350px] rounded-full bg-[hsl(265,50%,50%)]/8 blur-[100px]" />
    <div className="absolute top-[15%] right-[25%] w-[200px] h-[200px] rounded-full bg-[hsl(275,55%,55%)]/20 blur-[60px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(180,55%,50%)]/12 blur-[140px]" />
    <div className="absolute left-[55px] top-[calc(30%+140px)] -translate-y-1/2">
      <img src={broadvoiceLogo} alt="Broadvoice" className="h-7 mb-6" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(640%) hue-rotate(169deg) brightness(96%) contrast(89%)" }} />
      <h1>
        <span className="text-7xl font-medium block pb-2" style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: '1.2', background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GoEngage</span>
        <span className="text-7xl font-medium block pb-2" style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, lineHeight: '1.2', background: 'linear-gradient(90.4deg, #43B5BF 2.76%, #27698F 41.13%, #C686F8 82.58%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Voice</span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(220,15%,25%)] block mt-3 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Product Preview</span>
      </h1>
    </div>
    <div className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[500px]">
      <img src={dashboardPreview} alt="GoEngage Voice Dashboard" className="w-full h-auto" />
    </div>
  </div>
);

const EmmaSlide: React.FC = () => (
  <div className="absolute inset-0 bg-white">
    <div className="absolute -top-[450px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px]" />
    <div className="absolute -top-[200px] left-[30%] w-[400px] h-[400px] rounded-full bg-[#1f6eac]/12 blur-[120px]" />
    <div className="absolute bottom-[-150px] right-[-100px] w-[800px] h-[800px] rounded-full bg-[#38bdcd]/22 blur-[180px]" />
    <div className="absolute top-[45%] left-[8%] w-[250px] h-[250px] rounded-full bg-[#38bdcd]/18 blur-[80px]" />
    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/15 blur-[140px]" />
    <div className="absolute bottom-[5%] left-[15%] w-[350px] h-[350px] rounded-full bg-[#1f6eac]/8 blur-[100px]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/12 blur-[140px]" />
    <div className="absolute inset-0 flex items-end justify-center">
      <img src={robImg} alt="Rob" className="h-[95%] w-auto object-contain" />
    </div>
    <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ background: 'linear-gradient(90deg, #43B5BF, #27698F, #C686F8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '3rem', fontWeight: 500 }}>Meet </span>
        <span style={{ fontFamily: "'Besley', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '3rem' }}>Rob</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="text-sm text-[hsl(220,10%,45%)] mt-3 max-w-xs leading-relaxed">
        Call Center Operations Manager<br />Multilocation Veterinary Clinic
      </motion.p>
    </div>
    <motion.img src={dotsImg} alt="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="absolute bottom-8 left-10 h-12 w-auto z-10" />
    <motion.img src={bvIcon} alt="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="absolute bottom-6 right-6 h-10 w-10 rounded-full z-10" />
  </div>
);

const VideoSlide: React.FC = () => (
  <div className="absolute inset-0 bg-black flex items-center justify-center">
    <video src="/videos/intro-video.mov" autoPlay muted playsInline className="w-full h-full object-cover" />
  </div>
);

/* Emma background shared by dashboard + tabs scenes */
const EmmaBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-white">
      <div className="absolute -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px]" />
      <div className="absolute -top-[100px] left-[20%] w-[600px] h-[600px] rounded-full bg-[#38bdcd]/15 blur-[160px]" />
      <div className="absolute bottom-[-150px] right-[20%] w-[600px] h-[600px] rounded-full bg-[#1f6eac]/15 blur-[160px]" />
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/10 blur-[140px]" />
    </div>
    <div className="absolute inset-0 flex items-end justify-center z-10" style={{ paddingLeft: 8 }}>
      <img src={robImg} alt="Rob" className="h-[95%] w-auto object-contain" />
    </div>
    <img src={dotsImg} alt="" className="absolute bottom-8 left-10 h-12 w-auto z-30" />
    <img src={bvIcon} alt="" className="absolute bottom-6 right-6 h-10 w-10 rounded-full z-30" />
    {children}
  </div>
);

const DashboardSlide: React.FC = () => (
  <EmmaBackground>
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
  </EmmaBackground>
);

const TabsSlide: React.FC = () => (
  <EmmaBackground>
    <div className="absolute inset-0 z-20">
      <ClutteredTabs visible />
    </div>
  </EmmaBackground>
);

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

/* ── Scene definitions ── */
const MadRobSlide: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-white">
      <div className="absolute -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px]" />
      <div className="absolute -top-[100px] left-[20%] w-[600px] h-[600px] rounded-full bg-[#38bdcd]/15 blur-[160px]" />
      <div className="absolute bottom-[-150px] right-[20%] w-[600px] h-[600px] rounded-full bg-[#1f6eac]/15 blur-[160px]" />
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/10 blur-[140px]" />
    </div>
    <div className="absolute inset-0 flex items-end justify-center z-10" style={{ paddingLeft: 8 }}>
      <img src={madRobImg} alt="Rob" className="h-[95%] w-auto object-contain" />
    </div>
    <img src={dotsImg} alt="" className="absolute bottom-8 left-10 h-12 w-auto z-30" />
    <img src={bvIcon} alt="" className="absolute bottom-6 right-6 h-10 w-10 rounded-full z-30" />
  </div>
);

const SCENE_LABELS = [
  "Title",
  "Meet Emma",
  "Video",
  "Dashboard",
  "Mad Rob",
  "Welcome",
  "Chat",
  "Summary",
];

const SCENE_COMPONENTS: React.FC[] = [
  TitleSlide,
  EmmaSlide,
  DashboardSlide,
  MadRobSlide,
  WelcomeSlide,
  ChatSlide,
  () => <SummaryScreen visible />,
];

const Index = () => {
  const [sceneIndex, setSceneIndex] = useState(0);

  const goNext = useCallback(() => {
    setSceneIndex(i => Math.min(i + 1, SCENE_COMPONENTS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setSceneIndex(i => Math.max(i - 1, 0));
  }, []);

  const SceneComponent = SCENE_COMPONENTS[sceneIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full h-full sm:w-[1024px] sm:h-[768px] overflow-hidden sm:rounded-[40px] sm:border-[16px] border-white/40 shadow-none sm:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md bg-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
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
        <span className="text-xs text-[hsl(220,10%,45%)] font-medium min-w-[80px] text-center">
          {sceneIndex + 1} / {SCENE_COMPONENTS.length}
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
