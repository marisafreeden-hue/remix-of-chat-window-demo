import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface ChatBubbleProps {
  text: string;
  role: "ai" | "caller";
  delay?: number;
  label?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  role,
  delay = 0,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 180 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [20, 0]);

  const isAI = role === "ai";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: isAI ? "flex-start" : "flex-end",
        marginBottom: 16,
      }}
    >
      {label && (
        <div
          style={{
            fontSize: 13,
            color: isAI ? "hsl(200, 60%, 65%)" : "hsl(30, 60%, 70%)",
            fontFamily: "Inter, sans-serif",
            marginBottom: 6,
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          background: isAI
            ? "linear-gradient(135deg, hsl(210, 50%, 28%), hsl(210, 45%, 32%))"
            : "linear-gradient(135deg, hsl(210, 20%, 35%), hsl(210, 18%, 38%))",
          borderRadius: isAI ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
          padding: "16px 24px",
          maxWidth: 700,
          border: isAI
            ? "1px solid hsla(200, 50%, 50%, 0.25)"
            : "1px solid hsla(210, 20%, 50%, 0.2)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#E8EDF3",
            fontFamily: "Inter, sans-serif",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
