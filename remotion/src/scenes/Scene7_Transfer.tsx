// Scene 7: Complex Call Transfer + Real-time Voice
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ChatBubble } from "../components/ChatBubble";
import { AnimatedText } from "../components/AnimatedText";

export const Scene7_Transfer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transfer flash
  const transferFrame = 120;
  const transferFlash = frame > transferFrame && frame < transferFrame + 15
    ? interpolate(frame, [transferFrame, transferFrame + 8, transferFrame + 15], [0, 0.15, 0], { extrapolateRight: "clamp" })
    : 0;

  // Waveform
  const wavePhase = frame * 0.1;

  return (
    <AbsoluteFill>
      {/* Transfer flash overlay */}
      <div style={{ position: "absolute", inset: 0, background: `hsla(200, 70%, 55%, ${transferFlash})`, zIndex: 20, pointerEvents: "none" }} />

      <div style={{ display: "flex", height: "100%" }}>
        {/* Left - Chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "60px 80px" }}>
          <div
            style={{
              opacity: interpolate(spring({ frame, fps, config: { damping: 30 } }), [0, 1], [0, 1]),
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 40,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: frame > transferFrame ? "hsl(25, 70%, 55%)" : "hsl(140, 60%, 50%)", boxShadow: `0 0 8px ${frame > transferFrame ? "hsla(25, 70%, 55%, 0.4)" : "hsla(140, 60%, 50%, 0.4)"}` }} />
            <span style={{ fontSize: 16, color: frame > transferFrame ? "hsl(25, 60%, 65%)" : "hsl(140, 50%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              {frame > transferFrame ? "Priority Transfer" : "Live Call — Urgent"}
            </span>
          </div>

          <ChatBubble role="caller" label="CALLER" text="My dog ate chocolate!" delay={10} />
          <ChatBubble role="ai" label="AI AGENT" text="I'm connecting you to a specialist right away." delay={60} />

          {/* Transfer indicator */}
          {frame > transferFrame && (
            <div
              style={{
                opacity: interpolate(spring({ frame: frame - transferFrame, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "16px 0",
                padding: "12px 24px",
                background: "hsla(200, 50%, 30%, 0.3)",
                borderRadius: 12,
                border: "1px solid hsla(200, 50%, 50%, 0.2)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" fill="hsl(200, 60%, 60%)" />
              </svg>
              <span style={{ fontSize: 14, color: "hsl(200, 55%, 65%)", fontFamily: "Inter, sans-serif" }}>
                Transferred instantly — no hold time
              </span>
            </div>
          )}

          <ChatBubble role="ai" label="JESSICA (LIVE AGENT)" text="Hi, this is Jessica — let's take care of this." delay={150} />
        </div>

        {/* Right - Status */}
        <div style={{ width: 520, padding: "60px 40px", borderLeft: "1px solid hsla(210, 30%, 30%, 0.3)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 40 }}>
          {/* Transfer routing visual */}
          <div
            style={{
              opacity: interpolate(spring({ frame: frame - 50, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
              background: "hsla(210, 30%, 22%, 0.5)",
              borderRadius: 16,
              padding: 32,
              border: "1px solid hsla(200, 40%, 40%, 0.2)",
              width: "100%",
            }}
          >
            <div style={{ fontSize: 13, color: "hsl(200, 50%, 60%)", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>
              SMART ROUTING
            </div>

            {/* Flow diagram */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {[
                { label: "Urgent Detected", icon: "⚠️", active: frame > 50 },
                { label: "Specialist Queue", icon: "🔍", active: frame > 90 },
                { label: "Jessica Available", icon: "👩‍⚕️", active: frame > transferFrame },
                { label: "Connected", icon: "✅", active: frame > 150 },
              ].map((step, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      opacity: step.active ? 1 : 0.3,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{step.icon}</span>
                    <span style={{ fontSize: 16, color: step.active ? "white" : "hsla(210, 15%, 60%, 0.5)", fontFamily: "Inter, sans-serif", fontWeight: step.active ? 500 : 400 }}>
                      {step.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div style={{ width: 2, height: 16, background: step.active ? "hsla(200, 50%, 50%, 0.3)" : "hsla(210, 20%, 30%, 0.3)", margin: "4px 0 4px 10px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Voice waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {Array.from({ length: 40 }).map((_, i) => {
              const h = Math.sin(wavePhase + i * 0.35) * 18 + 22;
              return (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: h,
                    borderRadius: 2,
                    background: `hsla(200, 60%, 55%, ${0.25 + Math.sin(wavePhase + i * 0.25) * 0.15})`,
                  }}
                />
              );
            })}
          </div>

          <AnimatedText
            text="Real time — no lag, no delays"
            fontSize={18}
            delay={170}
            fontWeight={500}
            color="hsla(200, 50%, 65%, 0.7)"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
