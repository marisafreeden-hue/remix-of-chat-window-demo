import { useRef, useState, useCallback, useEffect } from "react";
import ChatInterface, { ChatInterfaceHandle } from "@/components/ChatInterface";
import SummaryScreen from "@/components/SummaryScreen";

type Stage = "demo" | "summary";

const Index = () => {
  const chatRef = useRef<ChatInterfaceHandle>(null);
  const [stage, setStage] = useState<Stage>("demo");

  // Auto-start demo on mount
  useEffect(() => {
    chatRef.current?.startDemo();
  }, []);

  const handleDemoFinished = useCallback(() => {
    setStage("summary");
  }, []);

  const handleSummaryClick = useCallback(() => {
    if (stage !== "summary") return;
    chatRef.current?.resetDemo();
    setStage("demo");
    setTimeout(() => chatRef.current?.startDemo(), 100);
  }, [stage]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden"
      onClick={stage === "summary" ? handleSummaryClick : undefined}
      style={{ cursor: stage === "summary" ? "pointer" : "default" }}
    >
      <div className="absolute inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full h-full sm:w-[1024px] sm:h-[768px] overflow-hidden sm:rounded-[40px] sm:border-[16px] border-white/40 shadow-none sm:shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md bg-white/10">
        {/* Summary screen overlay */}
        <div className={stage === "summary" ? "w-full h-full" : "hidden"}>
          <SummaryScreen visible={stage === "summary"} />
        </div>

        {/* Chat interface */}
        <div className={stage === "demo" ? "w-full h-full" : "hidden"}>
          <ChatInterface ref={chatRef} onDemoFinished={handleDemoFinished} />
        </div>
      </div>
    </div>
  );
};

export default Index;
