import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Send, Search, HelpCircle, Bell, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ChatMessage, { RichContent } from "./ChatMessage";
import conversationScript, { ScriptStep } from "./conversationScript";
import WelcomeScreen from "./WelcomeScreen";
import NarrativeScreen from "./NarrativeScreen";
import AbstractDashboard from "./AbstractDashboard";
import ClutteredTabs from "./ClutteredTabs";
import broadvoiceLogo from "@/assets/broadvoice-logo.png";
import goLogo from "@/assets/go-logo.png";
import emmaImg from "@/assets/emma-illustration.svg";
import dotsImg from "@/assets/dots.png";
import bvIcon from "@/assets/bv-icon.png";

interface Message {
  id: number;
  role: "ai" | "user";
  content: RichContent[];
}

export interface ChatInterfaceHandle {
  startDemo: () => void;
  resetDemo: () => void;
}

interface ChatInterfaceProps {
  onDemoFinished?: () => void;
}

// Module-level audio timer to prevent duplicates
let globalAudio: HTMLAudioElement | null = null;
let audioTimerId: number | null = null;

const ChatInterface = forwardRef<ChatInterfaceHandle, ChatInterfaceProps>(({ onDemoFinished }, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [phase, setPhase] = useState<"narrative" | "dashboard" | "tabs" | "welcome" | "chat">("narrative");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (globalAudio) {
        globalAudio.pause();
        globalAudio = null;
      }
      if (audioTimerId) {
        clearTimeout(audioTimerId);
        audioTimerId = null;
      }
    };
  }, []);

  // Process script steps — fully auto-advancing
  useEffect(() => {
    if (!playing) return;
    if (scriptIndex >= conversationScript.length) {
      setPlaying(false);
      playingRef.current = false;
      onDemoFinished?.();
      return;
    }

    const step: ScriptStep = conversationScript[scriptIndex];

    // Pause — wait for delay then advance (or click to skip)
    if (step.type === "pause") {
      const advance = () => {
        if (!playingRef.current) return;
        if (phase === "narrative") {
          setPhase("dashboard");
        } else if (phase === "dashboard") {
          setPhase("tabs");
        } else if (phase === "tabs") {
          setPhase("welcome");
        } else {
          setPhase("chat");
        }
        setScriptIndex((i) => i + 1);
      };

      const timer = setTimeout(advance, step.delay);
      timerRef.current = timer as unknown as number;

      const handleClick = () => {
        clearTimeout(timer);
        advance();
      };
      window.addEventListener("click", handleClick, { once: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener("click", handleClick);
      };
    }

    // User message — animate typing
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
            setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: step.content! }]);
            setScriptIndex((i) => i + 1);
          }, 800);
        }
      }, speed);
      return () => clearInterval(typeInterval);
    }

    // AI message — show typing dots, then reveal, then hold or auto-advance
    if (step.type === "ai") {
      setIsTyping(true);
      const typingDuration = step.delay; // use delay directly as typing indicator duration
      const timer = setTimeout(() => {
        if (!playingRef.current) return;
        setIsTyping(false);

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "ai") {
            return [
              ...prev.slice(0, -1),
              { ...last, content: [...last.content, ...step.content!] },
            ];
          }
          return [...prev, { id: Date.now(), role: "ai", content: step.content! }];
        });

        // Check if next step is also AI (continuation) — auto-advance after short pause
        const nextStep = conversationScript[scriptIndex + 1];
        if (nextStep && nextStep.type === "ai") {
          setTimeout(() => {
            if (!playingRef.current) return;
            setScriptIndex((i) => i + 1);
          }, 1500);
        } else {
          // Hold after this response, then advance
          const holdTime = step.holdAfter || 2000;
          setTimeout(() => {
            if (!playingRef.current) return;
            setScriptIndex((i) => i + 1);
          }, holdTime);
        }
      }, typingDuration);
      timerRef.current = timer as unknown as number;
      return () => clearTimeout(timer);
    }
  }, [playing, scriptIndex, phase]);

  const startDemo = useCallback(() => {
    // Stop any existing audio and pending audio timer
    if (globalAudio) {
      globalAudio.pause();
      globalAudio = null;
    }
    if (audioTimerId) {
      clearTimeout(audioTimerId);
      audioTimerId = null;
    }
    setMessages([]);
    setInput("");
    setScriptIndex(0);
    setPhase("narrative");
    setIsTyping(false);
    setPlaying(false);
    playingRef.current = false;
  }, []);

  // Called when user clicks the title slide
  const handleTitleClick = useCallback(() => {
    // Start audio immediately
    if (globalAudio) {
      globalAudio.pause();
      globalAudio = null;
    }
    const audio = new Audio(`/audio/narration.mp3?v=${Date.now()}`);
    audio.play().catch(() => {});
    globalAudio = audio;

    // Start the script (first pause = Emma slide duration)
    setPlaying(true);
    playingRef.current = true;
  }, []);

  const resetDemo = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    setIsTyping(false);
    setMessages([]);
    setInput("");
    setPhase("narrative");
    if (globalAudio) {
      globalAudio.pause();
      globalAudio = null;
    }
    if (audioTimerId) {
      clearTimeout(audioTimerId);
      audioTimerId = null;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    startDemo,
    resetDemo,
  }), [startDemo, resetDemo]);

  // Welcome card click handler (for manual use — during auto-play the pause step handles transition)
  const handleSelectPrompt = useCallback((_question: string) => {
    // During auto-play, ignore manual clicks
  }, []);

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Narrative title slide */}
      <AnimatePresence>
        {phase === "narrative" && (
          <motion.div
            key="narrative"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50"
          >
            <NarrativeScreen visible onTitleClick={handleTitleClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent background + Emma layer for dashboard/tabs phases */}
      {(phase === "dashboard" || phase === "tabs") && (
        <div className="absolute inset-0 z-30 overflow-hidden">
          {/* Background blur orbs */}
          <div className="absolute inset-0 bg-white">
            <div className="absolute -top-[300px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[#38bdcd]/25 blur-[180px]" />
            <div className="absolute -top-[100px] left-[20%] w-[600px] h-[600px] rounded-full bg-[#38bdcd]/15 blur-[160px]" />
            <div className="absolute bottom-[-150px] right-[20%] w-[600px] h-[600px] rounded-full bg-[#1f6eac]/15 blur-[160px]" />
            <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#38bdcd]/10 blur-[140px]" />
          </div>

          {/* Emma — persistent, no animation */}
          <div className="absolute inset-0 flex items-end justify-center z-10" style={{ paddingLeft: 8 }}>
            <img src={emmaImg} alt="Emma" className="h-[95%] w-auto object-contain" />
          </div>

          {/* Decorative dots — lower left */}
          <img src={dotsImg} alt="" className="absolute bottom-8 left-10 h-12 w-auto z-30" />
          {/* BV icon — lower right */}
          <img src={bvIcon} alt="" className="absolute bottom-6 right-6 h-10 w-10 rounded-full z-30" />

          {/* Phase-specific overlays */}
          <AnimatePresence mode="wait">
            {phase === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-20">
                <AbstractDashboard visible />
              </motion.div>
            )}
            {phase === "tabs" && (
              <motion.div key="tabs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-20">
                <ClutteredTabs visible />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Welcome & Chat phases */}
      {(phase === "welcome" || phase === "chat") && (
        <>
          {/* Top nav bar */}
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

          {/* Sub header */}
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

          {/* Content area */}
          <div className="flex-1 overflow-y-auto relative">
            {phase === "welcome" && (
              <WelcomeScreen visible onSelectPrompt={handleSelectPrompt} />
            )}
            {phase === "chat" && (
              <div className="px-5 py-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
                  ))}
                </AnimatePresence>
                {isTyping && <ChatMessage role="ai" content={[]} isTyping />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          {phase === "chat" && (
            <div className="px-5 py-3 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  readOnly
                  placeholder="Ask about your contact center data..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  disabled
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 text-center">AI can make mistakes. Verify important information.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default ChatInterface;
