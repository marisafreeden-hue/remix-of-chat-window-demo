// Scene 3: Emotional Contrast - urgent pet scenario
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene3_Contrast: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Urgent pulse
  const urgentPulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  const iconProgress = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Urgent glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, hsla(15, 70%, 50%, ${urgentPulse * 0.08}) 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, zIndex: 10 }}>
        {/* Alert icon */}
        <div
          style={{
            opacity: interpolate(iconProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(iconProgress, [0, 1], [0.5, 1])})`,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg, hsla(25, 80%, 55%, 0.2), hsla(15, 70%, 50%, 0.15))",
            border: "2px solid hsla(25, 70%, 55%, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z" fill="hsl(25, 80%, 60%)" />
            <path d="M11 10h2v4h-2zm0 6h2v2h-2z" fill="hsl(25, 80%, 60%)" />
          </svg>
        </div>

        <AnimatedText
          text="Meanwhile, the moments that"
          fontSize={48}
          delay={15}
          fontWeight={500}
          color="hsla(210, 15%, 85%, 0.95)"
        />
        <AnimatedText
          text="really matter…"
          fontSize={56}
          delay={25}
          fontWeight={700}
          color="hsl(25, 75%, 60%)"
        />
        <AnimatedText
          text="need immediate attention."
          fontSize={48}
          delay={40}
          fontWeight={500}
          color="hsla(210, 15%, 85%, 0.95)"
        />

        <div style={{ height: 24 }} />

        {/* Scenario card */}
        <div
          style={{
            opacity: interpolate(spring({ frame: frame - 60, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring({ frame: frame - 60, fps, config: { damping: 25 } }), [0, 1], [20, 0])}px)`,
            background: "hsla(25, 50%, 20%, 0.4)",
            border: "1px solid hsla(25, 60%, 50%, 0.25)",
            borderRadius: 16,
            padding: "20px 40px",
          }}
        >
          <span style={{ fontSize: 22, color: "hsl(25, 60%, 70%)", fontFamily: "Inter, sans-serif" }}>
            🐕 "My dog ate chocolate!"
          </span>
        </div>

        <div style={{ height: 16 }} />

        <AnimatedText
          text="High-value interactions matter most"
          fontSize={22}
          delay={80}
          fontWeight={600}
          color="hsla(200, 50%, 65%, 0.8)"
        />
      </div>
    </AbsoluteFill>
  );
};
