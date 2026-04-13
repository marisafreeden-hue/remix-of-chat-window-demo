import React from "react";
import { SceneConfig } from "@/config/sceneConfig";
import { ChevronDown, ChevronRight, Clock, MessageSquare, Type, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import SlideThumbnail from "./SlideThumbnail";

interface SceneCardProps {
  scene: SceneConfig;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (updated: Partial<SceneConfig>) => void;
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

const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  index,
  isExpanded,
  onToggle,
  onUpdate,
}) => {
  const color = SCENE_COLORS[index % SCENE_COLORS.length];
  const durationSec = (scene.durationFrames / 30).toFixed(1);

  const updateText = (key: string, value: string) => {
    onUpdate({
      texts: scene.texts.map((t) => (t.key === key ? { ...t, value } : t)),
    });
  };

  const updateDialogue = (idx: number, text: string) => {
    if (!scene.dialogue) return;
    onUpdate({
      dialogue: scene.dialogue.map((d, i) => (i === idx ? { ...d, text } : d)),
    });
  };

  const updateBulletItem = (bulletKey: string, itemIdx: number, value: string) => {
    if (!scene.bullets) return;
    onUpdate({
      bullets: scene.bullets.map((b) =>
        b.key === bulletKey
          ? { ...b, items: b.items.map((item, i) => (i === itemIdx ? value : item)) }
          : b
      ),
    });
  };

  const updateMetric = (idx: number, field: "label" | "value", val: string) => {
    if (!scene.metrics) return;
    onUpdate({
      metrics: scene.metrics.map((m, i) => (i === idx ? { ...m, [field]: val } : m)),
    });
  };

  return (
    <div
      className="rounded-xl border transition-colors"
      style={{
        borderColor: isExpanded ? `${color}40` : "hsla(220, 20%, 30%, 0.3)",
        background: isExpanded ? "hsla(220, 25%, 12%, 0.8)" : "hsla(220, 25%, 12%, 0.4)",
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors rounded-xl"
      >
        {/* Slide thumbnail */}
        <SlideThumbnail sceneId={scene.id} color={color} title={scene.title} />

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white/90 truncate">
            {scene.title}
          </h3>
          <p className="text-xs text-white/40 truncate mt-0.5">
            {scene.description}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Duration badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-white/50 text-xs">
            <Clock className="w-3 h-3" />
            {durationSec}s
          </div>

          {/* Content badges */}
          {scene.texts.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-white/40 text-xs">
              <Type className="w-3 h-3" />
              {scene.texts.length}
            </div>
          )}
          {scene.dialogue && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-white/40 text-xs">
              <MessageSquare className="w-3 h-3" />
              {scene.dialogue.length}
            </div>
          )}
          {scene.metrics && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-white/40 text-xs">
              <BarChart3 className="w-3 h-3" />
              {scene.metrics.length}
            </div>
          )}

          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-white/30" />
          ) : (
            <ChevronRight className="w-4 h-4 text-white/30" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-1 space-y-6 border-t border-white/5">
          {/* Duration slider */}
          <div className="space-y-2">
            <Label className="text-xs text-white/50 uppercase tracking-wider">
              Duration: {durationSec}s ({scene.durationFrames} frames)
            </Label>
            <Slider
              value={[scene.durationFrames]}
              min={90}
              max={600}
              step={30}
              onValueChange={([v]) => onUpdate({ durationFrames: v })}
              className="w-full"
            />
          </div>

          {/* Text fields */}
          {scene.texts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold flex items-center gap-2">
                <Type className="w-3.5 h-3.5" />
                Text Content
              </h4>
              {scene.texts.map((t) => (
                <div key={t.key} className="space-y-1">
                  <Label className="text-xs text-white/40">{t.label}</Label>
                  <Input
                    value={t.value}
                    onChange={(e) => updateText(t.key, e.target.value)}
                    className="bg-white/5 border-white/10 text-white/90 text-sm focus:border-[hsl(200,65%,50%)]/50"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Bullets */}
          {scene.bullets?.map((bullet) => (
            <div key={bullet.key} className="space-y-3">
              <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                {bullet.label}
              </h4>
              {bullet.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/30 text-xs w-5">{i + 1}.</span>
                  <Input
                    value={item}
                    onChange={(e) => updateBulletItem(bullet.key, i, e.target.value)}
                    className="bg-white/5 border-white/10 text-white/90 text-sm flex-1 focus:border-[hsl(200,65%,50%)]/50"
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Dialogue */}
          {scene.dialogue && (
            <div className="space-y-3">
              <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Dialogue
              </h4>
              {scene.dialogue.map((line, i) => (
                <div key={i} className="space-y-1">
                  <Label className="text-xs" style={{ color: line.role === "ai" ? "hsl(200, 60%, 60%)" : line.role === "caller" ? "hsl(35, 60%, 65%)" : "hsl(140, 50%, 60%)" }}>
                    {line.label}
                  </Label>
                  <Textarea
                    value={line.text}
                    onChange={(e) => updateDialogue(i, e.target.value)}
                    rows={2}
                    className="bg-white/5 border-white/10 text-white/90 text-sm resize-none focus:border-[hsl(200,65%,50%)]/50"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Metrics */}
          {scene.metrics && (
            <div className="space-y-3">
              <h4 className="text-xs text-white/50 uppercase tracking-wider font-semibold flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5" />
                Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {scene.metrics.map((m, i) => (
                  <div key={i} className="space-y-1.5 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <Input
                      value={m.value}
                      onChange={(e) => updateMetric(i, "value", e.target.value)}
                      className="bg-white/5 border-white/10 text-white/90 text-lg font-bold h-9 focus:border-[hsl(200,65%,50%)]/50"
                    />
                    <Input
                      value={m.label}
                      onChange={(e) => updateMetric(i, "label", e.target.value)}
                      className="bg-white/5 border-white/10 text-white/50 text-xs h-7 focus:border-[hsl(200,65%,50%)]/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SceneCard;
