// Scene 4: Business Challenge + Solution Introduction
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { BulletPoint } from "../components/BulletPoint";

export const Scene4_Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase: 0-150 = challenges, 150+ = solution
  const solutionProgress = spring({
    frame: frame - 150,
    fps,
    config: { damping: 30, stiffness: 100 },
  });

  const challengesFade = frame < 130 ? 1 : interpolate(frame, [130, 160], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Challenges phase */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: challengesFade,
        }}
      >
        <AnimatedText text="The challenge is real." fontSize={48} delay={5} fontWeight={600} />
        <div style={{ height: 48 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <BulletPoint text="Hiring more agents is expensive" delay={25} icon="💰" fontSize={28} />
          <BulletPoint text="Driving portal adoption is difficult" delay={40} icon="📱" fontSize={28} />
          <BulletPoint text="Managing licenses adds more cost" delay={55} icon="📄" fontSize={28} />
        </div>
      </div>

      {/* Solution phase */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: interpolate(solutionProgress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(solutionProgress, [0, 1], [0.9, 1])})`,
        }}
      >
        <AnimatedText text='So Rob chose' fontSize={36} delay={155} fontWeight={400} color="hsla(210, 15%, 80%, 0.9)" />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, hsl(200, 65%, 50%), hsl(220, 60%, 45%))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px hsla(210, 60%, 40%, 0.4)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 64, fontWeight: 700, color: "white", fontFamily: "Inter, sans-serif" }}>
            GoEngage Voice
          </span>
        </div>

        <div style={{ height: 8 }} />

        <div
          style={{
            background: "hsla(200, 50%, 50%, 0.12)",
            border: "1px solid hsla(200, 50%, 55%, 0.25)",
            borderRadius: 100,
            padding: "12px 36px",
          }}
        >
          <span style={{ fontSize: 22, color: "hsl(200, 60%, 65%)", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
            AI-Powered Voice Automation
          </span>
        </div>

        <div style={{ height: 8 }} />

        <AnimatedText
          text="A simple, intelligent inbound voice agent"
          fontSize={26}
          delay={175}
          fontWeight={400}
          color="hsla(210, 15%, 75%, 0.85)"
        />
        <AnimatedText
          text="that connects directly to your CRM."
          fontSize={26}
          delay={185}
          fontWeight={400}
          color="hsla(210, 15%, 75%, 0.85)"
        />
      </div>
    </AbsoluteFill>
  );
};
