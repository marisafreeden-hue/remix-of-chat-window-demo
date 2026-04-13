import React from "react";
import {
  User, LayoutDashboard, Frown, Zap, Mic,
  Bot, ArrowRightLeft, GitBranch, BarChart3,
  Award
} from "lucide-react";

// Maps scene id → thumbnail visual
const SCENE_THUMBNAILS: Record<string, {
  icon: React.ElementType;
  layout: "center" | "split" | "grid" | "chat";
  accent?: string;
}> = {
  opening:      { icon: User, layout: "center" },
  problem:      { icon: LayoutDashboard, layout: "split" },
  contrast:     { icon: Frown, layout: "center" },
  solution:     { icon: Zap, layout: "center", accent: "hsl(200,65%,50%)" },
  demo_call1:   { icon: Mic, layout: "chat" },
  demo_call2:   { icon: Bot, layout: "chat" },
  demo_transfer:{ icon: ArrowRightLeft, layout: "split" },
  results:      { icon: BarChart3, layout: "grid" },
  closing:      { icon: Award, layout: "center" },
};

interface SlideThumbnailProps {
  sceneId: string;
  color: string;
  title: string;
}

const SlideThumbnail: React.FC<SlideThumbnailProps> = ({ sceneId, color, title }) => {
  const config = SCENE_THUMBNAILS[sceneId] ?? { icon: GitBranch, layout: "center" as const, accent: undefined };
  const Icon = config.icon;
  const accent = ("accent" in config ? config.accent : undefined) ?? color;

  return (
    <div
      className="w-20 h-14 rounded-lg flex-shrink-0 overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${accent}18, ${accent}08)`,
        border: `1px solid ${accent}30`,
      }}
    >
      {/* Mini layout hints */}
      {config.layout === "center" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-5 h-5" style={{ color: `${accent}` }} strokeWidth={1.5} />
        </div>
      )}

      {config.layout === "split" && (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 flex items-center justify-center">
            <Icon className="w-4 h-4" style={{ color: accent }} strokeWidth={1.5} />
          </div>
          <div className="w-px bg-white/10 my-2" />
          <div className="w-1/2 flex flex-col justify-center gap-1 px-1.5">
            <div className="h-1 rounded-full bg-white/15 w-full" />
            <div className="h-1 rounded-full bg-white/10 w-3/4" />
            <div className="h-1 rounded-full bg-white/10 w-1/2" />
          </div>
        </div>
      )}

      {config.layout === "chat" && (
        <div className="absolute inset-0 flex flex-col justify-center gap-1 px-2">
          <div className="flex justify-end">
            <div className="h-1.5 rounded-full w-8" style={{ backgroundColor: `${accent}40` }} />
          </div>
          <div className="flex justify-start">
            <div className="h-1.5 rounded-full bg-white/15 w-10" />
          </div>
          <div className="flex justify-end">
            <div className="h-1.5 rounded-full w-6" style={{ backgroundColor: `${accent}30` }} />
          </div>
        </div>
      )}

      {config.layout === "grid" && (
        <div className="absolute inset-0 grid grid-cols-2 gap-1 p-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-sm flex items-center justify-center" style={{ backgroundColor: `${accent}15` }}>
              <div className="w-3 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
            </div>
          ))}
        </div>
      )}

      {/* Scene number badge */}
      <div
        className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[7px] font-bold text-white"
        style={{ backgroundColor: accent }}
      >
        {title.match(/^\d+/)?.[0] || ""}
      </div>
    </div>
  );
};

export default SlideThumbnail;
