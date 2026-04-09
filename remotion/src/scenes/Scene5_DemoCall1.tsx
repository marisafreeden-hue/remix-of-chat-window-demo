// Scene 5: Demo - Vaccination Records Call
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { ChatBubble } from "../components/ChatBubble";
import { AnimatedText } from "../components/AnimatedText";

export const Scene5_DemoCall1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Waveform animation
  const wavePhase = frame * 0.08;

  return (
    <AbsoluteFill style={{ display: "flex" }}>
      {/* Left panel - Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "60px 80px" }}>
        {/* Header */}
        <div
          style={{
            opacity: interpolate(spring({ frame, fps, config: { damping: 30 } }), [0, 1], [0, 1]),
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "hsl(140, 60%, 50%)",
            boxShadow: "0 0 8px hsla(140, 60%, 50%, 0.4)",
          }} />
          <span style={{ fontSize: 16, color: "hsl(140, 50%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
            Live Call — Inbound
          </span>
        </div>

        {/* Conversation */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ChatBubble
            role="ai"
            label="AI AGENT"
            text="Hi! Thanks for calling Happy Paws Veterinary. How can I help you today?"
            delay={15}
          />
          <ChatBubble
            role="caller"
            label="CALLER"
            text="I need Snowball's vaccination records."
            delay={60}
          />
          <ChatBubble
            role="ai"
            label="AI AGENT"
            text="I found Snowball in your account. I'll email the records to your Gmail. Does that work?"
            delay={105}
          />
          <ChatBubble
            role="caller"
            label="CALLER"
            text="Yes."
            delay={145}
          />
          <ChatBubble
            role="ai"
            label="AI AGENT"
            text="Great — sent! Is there anything else I can help with?"
            delay={170}
          />
        </div>
      </div>

      {/* Right panel - CRM / status */}
      <div style={{ width: 520, padding: "60px 40px", borderLeft: "1px solid hsla(210, 30%, 30%, 0.3)" }}>
        {/* CRM Card */}
        <div
          style={{
            opacity: interpolate(spring({ frame: frame - 90, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring({ frame: frame - 90, fps, config: { damping: 25 } }), [0, 1], [15, 0])}px)`,
            background: "hsla(210, 30%, 22%, 0.5)",
            borderRadius: 16,
            padding: "28px 32px",
            border: "1px solid hsla(200, 40%, 40%, 0.2)",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 13, color: "hsl(200, 50%, 60%)", fontFamily: "Inter, sans-serif", fontWeight: 600, marginBottom: 16, letterSpacing: 1 }}>
            CRM LOOKUP
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Pet", "Snowball 🐱"],
              ["Owner", "Sarah M."],
              ["Account", "SM-2847"],
              ["Status", "Active"],
            ].map(([label, value], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, color: "hsla(210, 15%, 65%, 0.7)", fontFamily: "Inter, sans-serif" }}>{label}</span>
                <span style={{ fontSize: 16, color: "white", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email sent confirmation */}
        <div
          style={{
            opacity: interpolate(spring({ frame: frame - 160, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
            transform: `scale(${interpolate(spring({ frame: frame - 160, fps, config: { damping: 18 } }), [0, 1], [0.9, 1])})`,
            background: "hsla(140, 40%, 25%, 0.3)",
            borderRadius: 16,
            padding: "24px 32px",
            border: "1px solid hsla(140, 50%, 45%, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="hsl(140, 60%, 55%)" />
          </svg>
          <div>
            <div style={{ fontSize: 16, color: "hsl(140, 55%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
              Records Sent
            </div>
            <div style={{ fontSize: 14, color: "hsla(210, 15%, 70%, 0.7)", fontFamily: "Inter, sans-serif" }}>
              Email delivered to sarah.m@gmail.com
            </div>
          </div>
        </div>

        {/* Waveform */}
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
          {Array.from({ length: 32 }).map((_, i) => {
            const h = Math.sin(wavePhase + i * 0.4) * 15 + 20;
            return (
              <div
                key={i}
                style={{
                  width: 3,
                  height: h,
                  borderRadius: 2,
                  background: `hsla(200, 60%, 55%, ${0.3 + Math.sin(wavePhase + i * 0.3) * 0.2})`,
                }}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
