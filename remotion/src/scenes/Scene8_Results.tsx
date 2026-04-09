// Scene 8: Results / ROI Metrics
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { MetricCard } from "../components/MetricCard";

export const Scene8_Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated progress lines in background
  const lineProgress = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Background lines */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.06 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 100 + i * 120,
              left: 0,
              width: `${lineProgress * 100}%`,
              height: 1,
              background: "hsl(200, 60%, 55%)",
            }}
          />
        ))}
      </div>

      <AnimatedText text="The Results" fontSize={52} delay={5} fontWeight={700} />
      <div style={{ height: 60 }} />

      {/* Metric cards grid */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center", maxWidth: 1400 }}>
        <MetricCard label="Calls Automated" value="35%" delay={20} color="hsl(200, 70%, 55%)" />
        <MetricCard label="Agent Workload" value="↓ 40%" delay={35} color="hsl(160, 60%, 50%)" />
        <MetricCard label="Response Time" value="< 2s" delay={50} color="hsl(45, 70%, 55%)" />
        <MetricCard label="Cost Savings" value="28%" delay={65} color="hsl(280, 50%, 60%)" />
      </div>

      <div style={{ height: 48 }} />

      {/* Animated bar chart */}
      <div
        style={{
          opacity: interpolate(spring({ frame: frame - 80, fps, config: { damping: 30 } }), [0, 1], [0, 1]),
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
          height: 140,
        }}
      >
        {[
          { label: "Mon", h: 65, color: "hsl(200, 60%, 50%)" },
          { label: "Tue", h: 78, color: "hsl(200, 60%, 50%)" },
          { label: "Wed", h: 85, color: "hsl(200, 60%, 50%)" },
          { label: "Thu", h: 92, color: "hsl(200, 60%, 50%)" },
          { label: "Fri", h: 100, color: "hsl(200, 65%, 55%)" },
        ].map((bar, i) => {
          const barSpring = spring({
            frame: frame - 90 - i * 8,
            fps,
            config: { damping: 20, stiffness: 120 },
          });
          const barH = interpolate(barSpring, [0, 1], [0, bar.h]);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 48,
                  height: barH,
                  borderRadius: "8px 8px 4px 4px",
                  background: bar.color,
                  opacity: 0.7,
                }}
              />
              <span style={{ fontSize: 13, color: "hsla(210, 15%, 65%, 0.6)", fontFamily: "Inter, sans-serif" }}>{bar.label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
