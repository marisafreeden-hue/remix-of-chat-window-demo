import React, { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const TRANSCRIPT = [
  { start: 0, end: 7.3, text: "Meet Rob. Rob manages a call center for a veterinary clinic with 40 locations..." },
  { start: 8, end: 13.9, text: "Every day, a large portion of his calls are routine, simple requests..." },
  { start: 14.5, end: 21.6, text: "because every live interaction can cost 8-12 dollars..." },
  { start: 22.5, end: 29.6, text: "So Rob implemented Go Engage Voice, an AI-powered inbound voice assistant..." },
  { start: 29.6, end: 38.2, text: "it resolves them. Now, when a customer calls in, there's no IVR, no menus..." },
  { start: 39, end: 43.1, text: "Hi, thanks for calling. How can I help you? I need to schedule an appointment." },
  { start: 44.2, end: 51.4, text: "As the customer speaks, Go Engage identifies intent in real time..." },
  { start: 52, end: 58.1, text: "It schedules the appointment directly in the system..." },
  { start: 58.1, end: 67.7, text: "all in seconds, no agent needed. And if the situation changes..." },
  { start: 68.4, end: 75.9, text: "It transfers the call to a live agent with full context..." },
  { start: 76.5, end: 86.3, text: "What makes this even more powerful is how easy it is to use..." },
  { start: 87.1, end: 94.6, text: "They define the agent's role, set behavior, connect APIs..." },
  { start: 95.2, end: 99.8, text: "so they can launch fast, iterate quickly..." },
  { start: 100.7, end: 108.3, text: "And because it's speech-to-speech AI, responses are immediate..." },
  { start: 109, end: 115, text: "The result? Fewer routine calls, lower costs, faster resolution." },
  { start: 115, end: 120.2, text: "Your IVR routes calls. Go Engage resolves them." },
];

const SLIDE_COLORS = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#43B5BF", "#27698F", "#C686F8", "#f59e0b", "#ef4444",
  "#10b981", "#14b8a6", "#3b82f6", "#6366f1", "#8b5cf6",
];

interface SlideTimelineProps {
  cueTimes: number[];
  onCueTimesChange: (times: number[]) => void;
  sceneNames: string[];
}

const SlideTimeline: React.FC<SlideTimelineProps> = ({ cueTimes, onCueTimesChange, sceneNames }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [dragging, setDragging] = useState<{ type: "move" | "resize-left" | "resize-right"; idx: number; startX: number; startTimes: number[] } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const duration = 120.45;
  const pxPerSecond = 12; // pixels per second — controls zoom
  const totalWidth = duration * pxPerSecond;

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
    if (isPlaying) audio.pause(); else audio.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seekTo = useCallback((clientX: number) => {
    const el = timelineRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left + scrollLeft;
    const t = Math.max(0, Math.min(duration, x / pxPerSecond));
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  }, []);

  const xFromTime = (t: number) => Math.max(0, t) * pxPerSecond;

  // Drag logic
  const handleMouseDown = useCallback((type: "move" | "resize-left" | "resize-right", idx: number, e: React.MouseEvent) => {
    if (idx === 0 && type !== "move") return; // can't resize-left on first slide
    e.preventDefault();
    e.stopPropagation();
    setDragging({ type, idx, startX: e.clientX, startTimes: [...cueTimes] });
  }, [cueTimes]);

  useEffect(() => {
    if (!dragging) return;
    const { type, idx, startX, startTimes } = dragging;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dt = dx / pxPerSecond;
      const newTimes = [...startTimes];

      if (type === "move") {
        // Move the entire slide: shift both this cue and next cue
        const originalStart = startTimes[idx] < 0 ? 0 : startTimes[idx];
        const originalEnd = idx < startTimes.length - 1 ? startTimes[idx + 1] : duration;
        const slideDuration = originalEnd - originalStart;

        let newStart = originalStart + dt;
        // Clamp: can't go before previous slide, can't push next beyond end
        const minStart = idx > 0 ? (startTimes[idx - 1] < 0 ? 0 : startTimes[idx - 1]) + 0.5 : 0;
        const maxStart = (idx < startTimes.length - 2 ? startTimes[idx + 2] : duration) - slideDuration - 0.5;
        newStart = Math.round(Math.max(minStart, Math.min(maxStart, newStart)) * 10) / 10;

        newTimes[idx] = idx === 0 ? startTimes[0] : newStart;
        if (idx < newTimes.length - 1) {
          newTimes[idx + 1] = Math.round((newStart + slideDuration) * 10) / 10;
        }
      } else if (type === "resize-left") {
        // Resize left edge: change this cue's start time
        const min = idx > 0 ? (startTimes[idx - 1] < 0 ? 0 : startTimes[idx - 1]) + 0.5 : 0;
        const max = (idx < startTimes.length - 1 ? startTimes[idx + 1] : duration) - 0.5;
        newTimes[idx] = Math.round(Math.max(min, Math.min(max, startTimes[idx] + dt)) * 10) / 10;
      } else if (type === "resize-right") {
        // Resize right edge: change next cue's start time
        const nextIdx = idx + 1;
        if (nextIdx < newTimes.length) {
          const min = (startTimes[idx] < 0 ? 0 : startTimes[idx]) + 0.5;
          const max = nextIdx < startTimes.length - 1 ? startTimes[nextIdx + 1] - 0.5 : duration;
          newTimes[nextIdx] = Math.round(Math.max(min, Math.min(max, startTimes[nextIdx] + dt)) * 10) / 10;
        }
      }

      onCueTimesChange(newTimes);
    };

    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, onCueTimesChange]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // Auto-scroll to keep playhead visible
  useEffect(() => {
    const el = timelineRef.current;
    if (!el || !isPlaying) return;
    const playheadX = currentTime * pxPerSecond;
    const viewLeft = el.scrollLeft;
    const viewRight = viewLeft + el.clientWidth;
    if (playheadX < viewLeft + 50 || playheadX > viewRight - 50) {
      el.scrollLeft = playheadX - el.clientWidth / 3;
    }
  }, [currentTime, isPlaying]);

  return (
    <div className="bg-[hsl(220,25%,10%)] border border-white/10 rounded-xl overflow-hidden">
      <audio ref={audioRef} src="/audio/narration.mp3" preload="auto" />

      {/* Controls bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
        <button onClick={togglePlay} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
        </button>
        <button onClick={toggleMute} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4 text-white/50" />}
        </button>
        <span className="font-mono text-sm text-white/70">{formatTime(currentTime)} / {formatTime(duration)}</span>
        <div className="flex-1" />
        <span className="text-xs text-white/40">{sceneNames.length} slides · Drag to reposition</span>
      </div>

      {/* Scrollable timeline area */}
      <div
        ref={timelineRef}
        className="relative overflow-x-auto overflow-y-hidden"
        style={{ height: 200 }}
        onClick={(e) => {
          if (dragging) return;
          seekTo(e.clientX);
        }}
      >
        <div className="relative" style={{ width: totalWidth, height: 200 }}>
          {/* Time ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 border-b border-white/5">
            {Array.from({ length: Math.ceil(duration / 5) + 1 }, (_, i) => {
              const t = i * 5;
              return (
                <div key={t} className="absolute top-0 h-full flex items-end" style={{ left: xFromTime(t) }}>
                  <span className="text-[9px] text-white/30 font-mono ml-1 mb-0.5">{formatTime(t)}</span>
                  <div className="absolute top-0 bottom-0 w-px bg-white/8" />
                </div>
              );
            })}
          </div>

          {/* Slide track (top) */}
          <div className="absolute top-6 left-0 right-0" style={{ height: 72 }}>
            {cueTimes.map((t, i) => {
              const startX = xFromTime(t < 0 ? 0 : t);
              const endX = i < cueTimes.length - 1 ? xFromTime(cueTimes[i + 1]) : totalWidth;
              const w = endX - startX;
              const color = SLIDE_COLORS[i % SLIDE_COLORS.length];
              const isActive = currentTime >= (t < 0 ? 0 : t) && (i === cueTimes.length - 1 || currentTime < cueTimes[i + 1]);

              return (
                <div
                  key={i}
                  className={`absolute top-2 rounded-lg overflow-hidden select-none transition-shadow ${isActive ? "ring-2 ring-white/60 shadow-lg" : ""}`}
                  style={{
                    left: startX,
                    width: Math.max(w, 20),
                    height: 56,
                    backgroundColor: `${color}30`,
                    borderLeft: `3px solid ${color}`,
                    cursor: dragging ? "grabbing" : "grab",
                  }}
                  onMouseDown={(e) => handleMouseDown("move", i, e)}
                >
                  {/* Left resize handle */}
                  {i > 0 && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-white/20 z-10"
                      onMouseDown={(e) => handleMouseDown("resize-left", i, e)}
                    />
                  )}

                  {/* Slide content */}
                  <div className="px-2 py-1.5 h-full flex flex-col justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: color }}>
                        {i + 1}
                      </div>
                      <span className="text-[10px] font-semibold text-white/90 truncate">
                        {sceneNames[i] || `Slide ${i + 1}`}
                      </span>
                    </div>
                    <span className="text-[9px] text-white/40 font-mono">
                      {formatTime(t < 0 ? 0 : t)} – {formatTime(i < cueTimes.length - 1 ? cueTimes[i + 1] : duration)}
                    </span>
                  </div>

                  {/* Right resize handle */}
                  {i < cueTimes.length - 1 && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-white/20 z-10"
                      onMouseDown={(e) => handleMouseDown("resize-right", i, e)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Audio / transcript track (bottom) */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 80, top: 100 }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
            <div className="absolute top-1 left-3 text-[9px] text-white/30 font-semibold uppercase tracking-wider">Audio</div>

            {/* Fake waveform visualization */}
            <div className="absolute top-5 left-0 right-0 bottom-2 flex items-end">
              {Array.from({ length: Math.floor(totalWidth / 3) }, (_, i) => {
                const t = (i * 3) / pxPerSecond;
                const inTranscript = TRANSCRIPT.some(s => t >= s.start && t <= s.end);
                const height = inTranscript
                  ? 15 + Math.sin(i * 0.7) * 12 + Math.cos(i * 1.3) * 8 + Math.random() * 6
                  : 2 + Math.random() * 3;
                return (
                  <div
                    key={i}
                    className="flex-shrink-0"
                    style={{
                      width: 2,
                      marginRight: 1,
                      height: Math.max(2, height),
                      backgroundColor: inTranscript ? "hsla(200, 65%, 55%, 0.5)" : "hsla(220, 20%, 40%, 0.3)",
                      borderRadius: 1,
                    }}
                  />
                );
              })}
            </div>

            {/* Transcript text overlay */}
            {TRANSCRIPT.map((seg, i) => (
              <div
                key={i}
                className="absolute top-6 overflow-hidden pointer-events-none"
                style={{
                  left: xFromTime(seg.start),
                  width: xFromTime(seg.end) - xFromTime(seg.start),
                }}
              >
                <span className="text-[7px] text-white/20 leading-none truncate block px-0.5">{seg.text}</span>
              </div>
            ))}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: xFromTime(currentTime) }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full -translate-x-1.5" />
            <div className="w-0.5 bg-red-500 mx-auto" style={{ height: 200 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTimeline;
