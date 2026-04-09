// Scene 2: The Problem - Repetitive Calls
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { BulletPoint } from "../components/BulletPoint";

export const Scene2_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progress bar showing 35% routine
  const barProgress = spring({ frame: frame - 30, fps, config: { damping: 40, stiffness: 80 } });
  const barWidth = interpolate(barProgress, [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 100, alignItems: "center", maxWidth: 1600, padding: "0 100px" }}>
        {/* Left side - Text */}
        <div style={{ flex: 1 }}>
          <AnimatedText
            text="Every day, hundreds of calls…"
            fontSize={48}
            delay={5}
            fontWeight={600}
            textAlign="left"
          />
          <div style={{ height: 12 }} />
          <AnimatedText
            text="but 35% are routine."
            fontSize={48}
            delay={15}
            fontWeight={700}
            color="hsl(200, 70%, 55%)"
            textAlign="left"
          />

          <div style={{ height: 48 }} />

          <BulletPoint text="Vaccination records" delay={40} icon="📋" fontSize={26} />
          <BulletPoint text="Schedule nail trim" delay={50} icon="✂️" fontSize={26} />
          <BulletPoint text="Basic inquiries" delay={60} icon="❓" fontSize={26} />

          <div style={{ height: 32 }} />

          <AnimatedText
            text="Simple requests that don't require a human touch."
            fontSize={24}
            delay={80}
            fontWeight={400}
            color="hsla(210, 20%, 70%, 0.8)"
            textAlign="left"
          />
        </div>

        {/* Right side - Visual bar */}
        <div style={{ flex: 0.6 }}>
          <div
            style={{
              opacity: interpolate(barProgress, [0, 1], [0, 1]),
            }}
          >
            {/* Circular chart representation */}
            <svg width="320" height="320" viewBox="0 0 320 320">
              <circle
                cx="160" cy="160" r="130"
                fill="none"
                stroke="hsla(210, 20%, 30%, 0.4)"
                strokeWidth="24"
              />
              <circle
                cx="160" cy="160" r="130"
                fill="none"
                stroke="hsl(200, 65%, 50%)"
                strokeWidth="24"
                strokeDasharray={`${barWidth * 8.168} 816.8`}
                strokeLinecap="round"
                transform="rotate(-90 160 160)"
                style={{ filter: "drop-shadow(0 0 8px hsla(200, 65%, 50%, 0.4))" }}
              />
              <text x="160" y="150" textAnchor="middle" fill="white" fontSize="56" fontWeight="700" fontFamily="Inter, sans-serif">
                {Math.round(interpolate(barProgress, [0, 1], [0, 35]))}%
              </text>
              <text x="160" y="185" textAnchor="middle" fill="hsla(210, 20%, 70%, 0.8)" fontSize="18" fontFamily="Inter, sans-serif">
                Routine Calls
              </text>
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
