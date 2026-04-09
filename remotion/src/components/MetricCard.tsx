import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface MetricCardProps {
  label: string;
  value: string;
  delay?: number;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delay = 0,
  color = "hsl(200, 70%, 55%)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: "hsla(220, 30%, 20%, 0.6)",
        borderRadius: 16,
        padding: "32px 40px",
        border: "1px solid hsla(210, 40%, 40%, 0.3)",
        minWidth: 280,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color,
          fontFamily: "Inter, sans-serif",
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 18,
          color: "hsla(210, 20%, 75%, 0.9)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        }}
      >
        {label}
      </div>
    </div>
  );
};
