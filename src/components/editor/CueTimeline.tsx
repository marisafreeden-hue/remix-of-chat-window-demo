import React, { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

// Transcript segments from Whisper transcription
const TRANSCRIPT = [
  { start: 0, end: 7.3, text: "Meet Rob. Rob manages a call center for a veterinary clinic with 40 locations, all routing into one team." },
  { start: 8, end: 13.9, text: "Every day, a large portion of his calls are routine, simple requests that still cost time and money," },
  { start: 14.5, end: 21.6, text: "because every live interaction can cost 8-12 dollars, and hiring more agents only increases that cost." },
  { start: 22.5, end: 29.6, text: "So Rob implemented Go Engage Voice, an AI-powered inbound voice assistant that doesn't just route calls," },
  { start: 29.6, end: 38.2, text: "it resolves them. Now, when a customer calls in, there's no IVR, no menus, just a natural conversation." },
  { start: 39, end: 43.1, text: "Hi, thanks for calling. How can I help you? I need to schedule an appointment." },
  { start: 44.2, end: 51.4, text: "As the customer speaks, Go Engage identifies intent in real time, captures the details and executes the task." },
  { start: 52, end: 58.1, text: "It schedules the appointment directly in the system, triggers a confirmation SMS, and completes the interaction," },
  { start: 58.1, end: 67.7, text: "all in seconds, no agent needed. And if the situation changes, like an emergency, the AI recognizes it instantly." },
  { start: 68.4, end: 75.9, text: "It transfers the call to a live agent with full context and a summary, so there's no repetition and no lost time." },
  { start: 76.5, end: 86.3, text: "What makes this even more powerful is how easy it is to use. Rob's team builds and updates these experiences in a simple, no-code flow builder." },
  { start: 87.1, end: 94.6, text: "They define the agent's role, set behavior, connect APIs, and control escalation, all without developers," },
  { start: 95.2, end: 99.8, text: "so they can launch fast, iterate quickly, and continuously improve performance." },
  { start: 100.7, end: 108.3, text: "And because it's speech-to-speech AI, responses are immediate and natural, creating a seamless customer experience." },
  { start: 109, end: 115, text: "The result? Fewer routine calls, lower costs, faster resolution." },
  { start: 115, end: 120.2, text: "Your IVR routes calls. Go Engage resolves them." },
];

const SCENE_NAMES = [
  "Title", "Meet Rob", "Dashboard", "Routine Calls", "Mad Rob",
  "GoEngage Intro", "Natural Call", "Intent Capture", "API Execution",
  "Escalation", "Flow Builder", "Speed", "Results", "Tagline", "Logo",
];

const COLORS = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#43B5BF", "#27698F", "#C686F8", "#f59e0b", "#ef4444",
  "#10b981", "#14b8a6", "#3b82f6", "#6366f1", "#8b5cf6",
];

interface CueTimelineProps {
  cueTimes: number[];
  onCueTimesChange: (times: number[]) => void;
}

const CueTimeline: React.FC<CueTimelineProps> = ({ cueTimes, onCueTimesChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const duration = 120.45;

  // Update time display
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seekTo = (t: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = t;
    setCurrentTime(t);
  };

  const timeToX = (t: number) => ((t < 0 ? 0 : t) / duration) * 100;

  const xToTime = useCallback((clientX: number) => {
    const el = timelineRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return pct * duration;
  }, []);

  // Drag handlers
  const handleMouseDown = (idx: number, e: React.MouseEvent) => {
    if (idx === 0) return; // Don't drag title
    e.preventDefault();
    setDraggingIdx(idx);
  };

  useEffect(() => {
    if (draggingIdx === null) return;
    const onMove = (e: MouseEvent) => {
      const t = xToTime(e.clientX);
      const newTimes = [...cueTimes];
      // Clamp between prev and next cue
      const min = draggingIdx > 1 ? newTimes[draggingIdx - 1] + 0.5 : 0;
      const max = draggingIdx < newTimes.length - 1 ? newTimes[draggingIdx + 1] - 0.5 : duration;
      newTimes[draggingIdx] = Math.round(Math.max(min, Math.min(max, t)) * 10) / 10;
      onCueTimesChange(newTimes);
    };
    const onUp = () => setDraggingIdx(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [draggingIdx, cueTimes, onCueTimesChange, xToTime]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    const ms = Math.floor((t % 1) * 10);
    return `${m}:${String(s).padStart(2, '0')}.${ms}`;
  };

  return (
    <div className="bg-[hsl(220,25%,10%)] border border-white/10 rounded-xl p-6 space-y-4">
      <audio ref={audioRef} src="/audio/narration.mp3" preload="auto" />

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
        </button>
        <button onClick={toggleMute} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
        </button>
        <span className="font-mono text-sm text-white/70">{formatTime(currentTime)} / {formatTime(duration)}</span>
        <div className="flex-1" />
        <button
          onClick={() => {
            const code = `const SCENE_CUE_TIMES = [\n${cueTimes.map((t, i) => `  ${t},${' '.repeat(Math.max(1, 7 - String(t).length))}// ${i}: ${SCENE_NAMES[i] || 'Scene ' + i}`).join('\n')}\n];`;
            navigator.clipboard.writeText(code);
          }}
          className="px-3 py-1.5 rounded-lg bg-[#43B5BF]/20 text-[#43B5BF] text-xs font-semibold hover:bg-[#43B5BF]/30 transition-colors"
        >
          Copy Cue Code
        </button>
      </div>

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="relative h-20 bg-[hsl(220,25%,12%)] rounded-lg overflow-hidden cursor-pointer"
        onClick={(e) => {
          if (draggingIdx !== null) return;
          seekTo(xToTime(e.clientX));
        }}
      >
        {/* Transcript waveform / text blocks */}
        {TRANSCRIPT.map((seg, i) => (
          <div
            key={i}
            className="absolute top-0 h-8 flex items-center overflow-hidden px-1"
            style={{
              left: `${timeToX(seg.start)}%`,
              width: `${timeToX(seg.end) - timeToX(seg.start)}%`,
              backgroundColor: i % 2 === 0 ? 'hsla(220, 20%, 30%, 0.4)' : 'hsla(220, 20%, 25%, 0.4)',
            }}
          >
            <span className="text-[8px] text-white/40 truncate leading-none">{seg.text}</span>
          </div>
        ))}

        {/* Scene cue markers and regions */}
        {cueTimes.map((t, i) => {
          if (i === 0 && t < 0) return null; // Skip title marker
          const nextT = i < cueTimes.length - 1 ? cueTimes[i + 1] : duration;
          const left = timeToX(t);
          const width = timeToX(nextT) - left;
          return (
            <React.Fragment key={i}>
              {/* Scene region */}
              <div
                className="absolute bottom-0 h-10 border-t border-white/10"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: `${COLORS[i % COLORS.length]}15`,
                }}
              >
                <span className="text-[9px] font-semibold px-1.5 py-0.5 block truncate" style={{ color: COLORS[i % COLORS.length] }}>
                  {i + 1}. {SCENE_NAMES[i] || `Scene ${i}`}
                </span>
                <span className="text-[8px] text-white/30 px-1.5">{formatTime(t)}</span>
              </div>
              {/* Draggable marker */}
              {i > 0 && (
                <div
                  className="absolute top-0 bottom-0 w-[3px] cursor-col-resize group z-10"
                  style={{ left: `${left}%`, transform: 'translateX(-1.5px)' }}
                  onMouseDown={(e) => handleMouseDown(i, e)}
                >
                  <div className={`w-full h-full transition-colors ${draggingIdx === i ? 'bg-white' : 'bg-white/30 group-hover:bg-white/60'}`} />
                  <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-3 h-6 rounded-sm transition-colors ${draggingIdx === i ? 'bg-white' : 'bg-white/50 group-hover:bg-white/80'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
          style={{ left: `${timeToX(currentTime)}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </div>
      </div>

      {/* Cue time table */}
      <div className="grid grid-cols-5 gap-2">
        {cueTimes.map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-[10px] text-white/50 truncate flex-1">{SCENE_NAMES[i] || `Scene ${i}`}</span>
            <input
              type="number"
              step="0.5"
              value={t}
              onChange={(e) => {
                const newTimes = [...cueTimes];
                newTimes[i] = parseFloat(e.target.value) || 0;
                onCueTimesChange(newTimes);
              }}
              className="w-14 text-right text-xs font-mono bg-transparent text-white/80 border-none outline-none focus:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CueTimeline;
