// Scene 6: Demo - Appointment Scheduling
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ChatBubble } from "../components/ChatBubble";

export const Scene6_DemoCall2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ display: "flex" }}>
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
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "hsl(140, 60%, 50%)", boxShadow: "0 0 8px hsla(140, 60%, 50%, 0.4)" }} />
          <span style={{ fontSize: 16, color: "hsl(140, 50%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
            Live Call — Appointment
          </span>
        </div>

        <ChatBubble role="caller" label="CALLER" text="I want to book a nail trim." delay={10} />
        <ChatBubble role="ai" label="AI AGENT" text="The next available appointment is tomorrow at 2 PM. Should I book it?" delay={55} />
        <ChatBubble role="caller" label="CALLER" text="Yes." delay={95} />
        <ChatBubble role="ai" label="AI AGENT" text="You're all set! You'll receive a confirmation text shortly." delay={120} />
      </div>

      {/* Right - Calendar visual */}
      <div style={{ width: 520, padding: "60px 40px", borderLeft: "1px solid hsla(210, 30%, 30%, 0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/* Calendar card */}
        <div
          style={{
            opacity: interpolate(spring({ frame: frame - 50, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
            transform: `translateY(${interpolate(spring({ frame: frame - 50, fps, config: { damping: 25 } }), [0, 1], [20, 0])}px)`,
            background: "hsla(210, 30%, 22%, 0.5)",
            borderRadius: 16,
            padding: 32,
            border: "1px solid hsla(200, 40%, 40%, 0.2)",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 13, color: "hsl(200, 50%, 60%)", fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>
            SCHEDULING
          </div>

          {/* Mini calendar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 24 }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} style={{ fontSize: 12, color: "hsla(210, 15%, 60%, 0.6)", textAlign: "center", fontFamily: "Inter, sans-serif" }}>{d}</div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const isTomorrow = day === 15;
              const booked = interpolate(spring({ frame: frame - 110, fps, config: { damping: 20 } }), [0, 1], [0, 1]);
              return (
                <div
                  key={i}
                  style={{
                    width: 44,
                    height: 36,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                    color: isTomorrow ? "white" : "hsla(210, 15%, 65%, 0.6)",
                    background: isTomorrow
                      ? `hsla(200, 65%, 50%, ${booked})`
                      : "transparent",
                    fontWeight: isTomorrow ? 700 : 400,
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Time slot */}
          <div
            style={{
              opacity: interpolate(spring({ frame: frame - 100, fps, config: { damping: 25 } }), [0, 1], [0, 1]),
              background: "hsla(200, 50%, 50%, 0.15)",
              borderRadius: 12,
              padding: "14px 20px",
              border: "1px solid hsla(200, 50%, 55%, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 16, color: "white", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Nail Trim</span>
            <span style={{ fontSize: 16, color: "hsl(200, 60%, 65%)", fontFamily: "Inter, sans-serif" }}>Tomorrow, 2:00 PM</span>
          </div>
        </div>

        {/* Confirmation badge */}
        <div
          style={{
            opacity: interpolate(spring({ frame: frame - 130, fps, config: { damping: 20 } }), [0, 1], [0, 1]),
            transform: `scale(${interpolate(spring({ frame: frame - 130, fps, config: { damping: 15 } }), [0, 1], [0.8, 1])})`,
            marginTop: 24,
            background: "hsla(140, 40%, 25%, 0.3)",
            borderRadius: 100,
            padding: "10px 28px",
            border: "1px solid hsla(140, 50%, 45%, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="hsl(140, 60%, 55%)" />
          </svg>
          <span style={{ fontSize: 15, color: "hsl(140, 55%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
            Booked & Confirmed
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
