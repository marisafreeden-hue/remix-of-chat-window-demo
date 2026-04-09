import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Persistent animated gradient background
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const hueShift = interpolate(frame, [0, 2700], [0, 30], {
    extrapolateRight: "clamp",
  });

  const orbX1 = interpolate(frame, [0, 2700], [-5, 5]);
  const orbY1 = interpolate(frame, [0, 2700], [-3, 3]);
  const orbX2 = interpolate(frame, [0, 2700], [3, -3]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${210 + hueShift}, 45%, 12%) 0%, hsl(${220 + hueShift}, 50%, 18%) 50%, hsl(${200 + hueShift}, 40%, 15%) 100%)`,
      }}
    >
      {/* Soft orbs */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsla(210, 70%, 50%, 0.12) 0%, transparent 70%)",
          top: -200 + orbY1 * 10,
          left: -100 + orbX1 * 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsla(190, 60%, 45%, 0.1) 0%, transparent 70%)",
          bottom: -100,
          right: -50 + orbX2 * 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsla(230, 55%, 55%, 0.08) 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${orbX1 * 5}px, ${orbY1 * 5}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
