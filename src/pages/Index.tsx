import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NarrativeScreen from "@/components/NarrativeScreen";
import ChatInterface from "@/components/ChatInterface";
import SummaryScreen from "@/components/SummaryScreen";

// Scene keys in order
const SCENES = ["narrative", "demo", "summary"] as const;
type SceneKey = typeof SCENES[number];

const Index = () => {
  const [sceneIndex, setSceneIndex] = useState(0);

  const goNext = useCallback(() => {
    setSceneIndex((i) => Math.min(i + 1, SCENES.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setSceneIndex((i) => Math.max(i - 1, 0));
  }, []);

  const currentScene = SCENES[sceneIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Main content area */}
      <div className="absolute inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full h-full sm:w-[1024px] sm:h-[768px] overflow-hidden sm:rounded-[40px] sm:border-[16px] border-white/40 shadow-none sm:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md bg-white/10">
        <AnimatePresence mode="wait">
          {currentScene === "narrative" && (
            <motion.div
              key="narrative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <NarrativeScreen visible onTitleClick={() => {}} />
            </motion.div>
          )}
          {currentScene === "demo" && (
            <motion.div
              key="demo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <ChatInterface onDemoFinished={goNext} />
            </motion.div>
          )}
          {currentScene === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <SummaryScreen visible />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global navigation arrows — bottom of page, outside content area */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={sceneIndex === 0}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-[hsl(220,15%,25%)]" />
        </button>
        <span className="text-xs text-[hsl(220,10%,45%)] font-medium min-w-[60px] text-center">
          {sceneIndex + 1} / {SCENES.length}
        </span>
        <button
          onClick={goNext}
          disabled={sceneIndex >= SCENES.length - 1}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-[hsl(220,15%,25%)]" />
        </button>
      </div>
    </div>
  );
};

export default Index;
