import { useState, useCallback } from "react";
import { SceneConfig, defaultSceneConfigs } from "@/config/sceneConfig";
import SceneCard from "@/components/editor/SceneCard";
import AudioTimeline from "@/components/editor/AudioTimeline";
import SlideTimeline from "@/components/editor/SlideTimeline";
import { Button } from "@/components/ui/button";
import { Film, Download, RotateCcw } from "lucide-react";

const DEFAULT_CUE_TIMES = [
  -1,    // 0: Title
  0,     // 1: Meet Rob
  3.5,   // 2: Dashboard
  8,     // 3: Routine Calls
  14.5,  // 4: Mad Rob
  22.5,  // 5: GoEngage Intro
  29.6,  // 6: Natural Call
  39,    // 7: Intent Capture
  52,    // 8: API Execution
  67.7,  // 9: Escalation
  76.5,  // 10: Flow Builder
  100.7, // 11: Speed
  109,   // 12: Results
  115,   // 13: Tagline
  118,   // 14: Logo
];

const Editor = () => {
  const [scenes, setScenes] = useState<SceneConfig[]>(defaultSceneConfigs);
  const [expandedScene, setExpandedScene] = useState<string | null>(null);
  const [cueTimes, setCueTimes] = useState<number[]>(DEFAULT_CUE_TIMES);

  const handleUpdateScene = useCallback((id: string, updated: Partial<SceneConfig>) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  }, []);

  const handleReset = useCallback(() => {
    setScenes(defaultSceneConfigs);
    setExpandedScene(null);
    setCueTimes(DEFAULT_CUE_TIMES);
  }, []);

  const totalFrames = scenes.reduce((sum, s) => sum + s.durationFrames, 0);
  const transitionFrames = (scenes.length - 1) * 20;
  const netFrames = totalFrames - transitionFrames;
  const totalSeconds = (netFrames / 30).toFixed(1);

  return (
    <div className="min-h-screen bg-[hsl(220,25%,8%)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(220,25%,10%)]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(200,65%,50%)] to-[hsl(220,60%,45%)] flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">GoEngage Voice — Video Editor</h1>
              <p className="text-xs text-white/50">
                {scenes.length} scenes · {totalSeconds}s total · 30fps
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset
            </Button>
            <Button
              size="sm"
              className="bg-[hsl(200,65%,50%)] hover:bg-[hsl(200,65%,45%)] text-white"
              onClick={() => {
                const json = JSON.stringify(scenes, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "scene-config.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export Config
            </Button>
          </div>
        </div>
      </header>

      {/* Slide Timeline — Canva-style drag editor */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <h2 className="text-sm font-semibold text-white/70 mb-3">🎬 Slide Timeline — Drag slides to adjust timing</h2>
        <SlideTimeline
          cueTimes={cueTimes}
          onCueTimesChange={setCueTimes}
          sceneNames={[
            "Title", "Meet Rob", "Dashboard", "Routine Calls", "Mad Rob",
            "GoEngage Intro", "Natural Call", "GoEngage Reprise", "API Execution",
            "Escalation", "Flow Builder", "Speed", "Speech-to-Speech", "Tagline", "Logo",
          ]}
        />
      </div>

      {/* Audio Timeline (existing) */}
      <AudioTimeline scenes={scenes} />

      {/* Scene Cards */}
      <main className="max-w-6xl mx-auto px-6 py-6 space-y-3">
        {scenes.map((scene, index) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            index={index}
            isExpanded={expandedScene === scene.id}
            onToggle={() =>
              setExpandedScene((prev) => (prev === scene.id ? null : scene.id))
            }
            onUpdate={(updated) => handleUpdateScene(scene.id, updated)}
          />
        ))}
      </main>
    </div>
  );
};

export default Editor;
