import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface BulletPointProps {
  text: string;
  delay?: number;
  icon?: string;
  fontSize?: number;
}

export const BulletPoint: React.FC<BulletPointProps> = ({
  text,
  delay = 0,
  icon = "•",
  fontSize = 28,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 25, stiffness: 150 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          fontSize: fontSize + 4,
          color: "hsl(200, 70%, 55%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize,
          color: "hsla(210, 15%, 85%, 0.95)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        }}
      >
        {text}
      </span>
    </div>
  );
};
