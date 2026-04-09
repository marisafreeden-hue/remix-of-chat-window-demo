import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
  maxWidth?: number;
  lineHeight?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = "#FFFFFF",
  fontWeight = 600,
  fontFamily = "Inter, sans-serif",
  textAlign = "center",
  maxWidth,
  lineHeight = 1.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 30, stiffness: 120 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        fontSize,
        color,
        fontWeight,
        fontFamily,
        textAlign,
        opacity,
        transform: `translateY(${y}px)`,
        maxWidth,
        lineHeight,
      }}
    >
      {text}
    </div>
  );
};

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number; // chars per second
  fontSize?: number;
  color?: string;
  fontFamily?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 30,
  fontSize = 24,
  color = "#FFFFFF",
  fontFamily = "Inter, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.min(
    text.length,
    Math.floor((adjustedFrame / fps) * speed)
  );

  const cursorOpacity = Math.round(frame / 15) % 2 === 0 ? 1 : 0;
  const showCursor = charsToShow < text.length;

  return (
    <div style={{ fontSize, color, fontFamily, fontWeight: 400 }}>
      {text.slice(0, charsToShow)}
      {showCursor && (
        <span style={{ opacity: cursorOpacity, color: "hsla(200, 70%, 60%, 0.8)" }}>|</span>
      )}
    </div>
  );
};
