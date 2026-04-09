import { useRef, useState, useCallback, useEffect } from "react";
import { SceneConfig } from "@/config/sceneConfig";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioTimelineProps {
  scenes: SceneConfig[];
}

const SCENE_COLORS = [
  "hsl(200, 65%, 50%)",
  "hsl(170, 55%, 45%)",
  "hsl(25, 75%, 55%)",
  "hsl(260, 50%, 55%)",
  "hsl(200, 55%, 45%)",
  "hsl(140, 50%, 45%)",
  "hsl(350, 60%, 50%)",
  "hsl(45, 70%, 50%)",
  "hsl(210, 60%, 55%)",
];

const AudioTimeline: React.FC<AudioTimelineProps> = ({ scenes }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const totalFrames = scenes.reduce((s, sc) => s + sc.durationFrames, 0);
  const transitionFrames = (scenes.length - 1) * 20;
  const netFrames = totalFrames - transitionFrames;
  const totalVideoSeconds = netFrames / 30;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const audio = audioRef.current;
    if (audio && duration) {
      audio.currentTime = pct * duration;
    }
  }, [duration]);

  // Compute scene time ranges
  let accFrames = 0;
  const sceneRanges = scenes.map((scene, i) => {
    const start = accFrames;
    accFrames += scene.durationFrames - (i < scenes.length - 1 ? 20 : 0);
    return { start, end: accFrames, scene };
  });

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border-b border-white/10 bg-[hsl(220,25%,9%)]">
      <audio ref={audioRef} src="/audio/narration.mp3" preload="metadata" />
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-[hsl(200,65%,50%)] flex items-center justify-center hover:bg-[hsl(200,65%,45%)] transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>
          <span className="text-sm text-white/60 font-mono min-w-[100px]">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (audioRef.current) audioRef.current.muted = !isMuted;
            }}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4 text-white/50" />}
          </button>
        </div>

        {/* Timeline bar */}
        <div
          className="relative h-10 rounded-lg overflow-hidden cursor-pointer bg-white/5"
          onClick={handleSeek}
        >
          {/* Scene segments */}
          {sceneRanges.map(({ start, end, scene }, i) => {
            const leftPct = (start / netFrames) * 100;
            const widthPct = ((end - start) / netFrames) * 100;
            return (
              <div
                key={scene.id}
                className="absolute top-0 bottom-0 flex items-center justify-center overflow-hidden border-r border-black/30"
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  background: SCENE_COLORS[i % SCENE_COLORS.length],
                  opacity: 0.35,
                }}
              >
                <span className="text-[10px] text-white/70 font-medium truncate px-1">
                  {i + 1}
                </span>
              </div>
            );
          })}

          {/* Playhead */}
          {duration > 0 && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)] z-10"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          )}
        </div>

        {/* Scene labels */}
        <div className="flex mt-1.5">
          {sceneRanges.map(({ start, end, scene }, i) => {
            const widthPct = ((end - start) / netFrames) * 100;
            return (
              <div
                key={scene.id}
                className="text-[10px] text-white/35 truncate"
                style={{ width: `${widthPct}%` }}
              >
                {scene.title.split("—")[0]?.trim()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudioTimeline;
