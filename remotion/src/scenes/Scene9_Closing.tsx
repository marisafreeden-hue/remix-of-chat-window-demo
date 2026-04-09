// Scene 9: Closing + CTA
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene9_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle pulse for logo
  const pulse = Math.sin(frame * 0.06) * 0.05 + 1;

  const logoProgress = spring({ frame: frame - 60, fps, config: { damping: 20, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Warm closing text */}
      <AnimatedText
        text="Now, Rob's team can focus on"
        fontSize={40}
        delay={5}
        fontWeight={400}
        color="hsla(210, 15%, 80%, 0.9)"
      />
      <AnimatedText
        text="what really matters —"
        fontSize={44}
        delay={15}
        fontWeight={500}
        color="hsla(210, 15%, 85%, 0.95)"
      />
      <AnimatedText
        text="being there when it counts."
        fontSize={48}
        delay={25}
        fontWeight={600}
        color="white"
      />

      <div style={{ height: 80 }} />

      {/* Logo + brand */}
      <div
        style={{
          opacity: interpolate(logoProgress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoProgress, [0, 1], [0.85, 1]) * pulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, hsl(200, 65%, 50%), hsl(220, 60%, 45%))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 40px hsla(210, 60%, 40%, 0.4)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" fill="white" />
          </svg>
        </div>

        <span style={{ fontSize: 56, fontWeight: 700, color: "white", fontFamily: "Inter, sans-serif" }}>
          GoEngage Voice
        </span>
      </div>

      <div style={{ height: 40 }} />

      <AnimatedText
        text="Smarter conversations. Lower costs. Better care."
        fontSize={26}
        delay={80}
        fontWeight={500}
        color="hsl(200, 60%, 65%)"
      />
    </AbsoluteFill>
  );
};
