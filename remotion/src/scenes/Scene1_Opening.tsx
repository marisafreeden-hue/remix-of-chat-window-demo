// Scene 1: Opening - "Meet Rob" + Problem Setup
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated phone ring indicators
  const ringPulse = Math.sin(frame * 0.15) * 0.5 + 0.5;

  // Badge counter animation
  const badgeScale = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Call center visual - abstract grid of agent indicators */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexWrap: "wrap", padding: 80, gap: 24, opacity: 0.15 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const pulseDelay = i * 3;
          const pulse = Math.sin((frame - pulseDelay) * 0.1) * 0.3 + 0.7;
          const isActive = i % 3 !== 0;
          return (
            <div
              key={i}
              style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                background: isActive
                  ? `hsla(200, 60%, 50%, ${pulse * 0.6})`
                  : "hsla(210, 20%, 40%, 0.3)",
                border: `1px solid hsla(200, 50%, 50%, ${pulse * 0.3})`,
              }}
            />
          );
        })}
      </div>

      {/* Central content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
        {/* GoEngage Voice logo area */}
        <Sequence from={0} durationInFrames={300}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: "linear-gradient(135deg, hsl(200, 65%, 50%), hsl(220, 60%, 45%))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: interpolate(spring({ frame, fps, config: { damping: 30 } }), [0, 1], [0, 1]),
                transform: `scale(${interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [0.5, 1])})`,
                boxShadow: "0 8px 32px hsla(210, 60%, 40%, 0.3)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" fill="white" />
              </svg>
            </div>

            <AnimatedText text="GoEngage Voice" fontSize={28} delay={10} fontWeight={500} color="hsla(200, 60%, 65%, 0.9)" />
          </div>
        </Sequence>

        <div style={{ height: 48 }} />

        <AnimatedText text="Meet Rob." fontSize={72} delay={15} fontWeight={700} />

        <div style={{ height: 16 }} />

        <AnimatedText
          text="Call center manager for a multi-location"
          fontSize={30}
          delay={35}
          fontWeight={400}
          color="hsla(210, 20%, 75%, 0.9)"
        />
        <AnimatedText
          text="veterinary clinic with 40 locations across the Midwest."
          fontSize={30}
          delay={45}
          fontWeight={400}
          color="hsla(210, 20%, 75%, 0.9)"
        />

        <div style={{ height: 48 }} />

        {/* Badge */}
        <div
          style={{
            opacity: interpolate(badgeScale, [0, 1], [0, 1]),
            transform: `scale(${interpolate(badgeScale, [0, 1], [0.8, 1])})`,
            background: "hsla(200, 60%, 50%, 0.15)",
            border: "1px solid hsla(200, 50%, 55%, 0.3)",
            borderRadius: 100,
            padding: "14px 40px",
          }}
        >
          <span style={{ fontSize: 22, color: "hsl(200, 60%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
            40 Locations · One Call Center
          </span>
        </div>
      </div>

      {/* Subtle phone ring indicator */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          opacity: ringPulse * 0.4,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="hsl(200, 60%, 55%)" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
