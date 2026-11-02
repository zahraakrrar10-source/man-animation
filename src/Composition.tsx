import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={60}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth horizontal movement across the screen (x: 300px to x: 980px)
  const xPos = interpolate(frame, [0, 59], [300, 980], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle vertical wave oscillation
  const yPos = 360 + Math.sin((frame / 59) * Math.PI * 2) * 40;

  // Spring entrance pop + smooth scale pulse
  const springScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 100 },
  });

  const scalePulse = interpolate(frame, [0, 30, 59], [1, 1.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const circleScale = springScale * scalePulse;

  // Background hue transition across the frame range (220° blue -> 280° purple)
  const bgHue = interpolate(frame, [0, 59], [220, 280]);

  // Title entrance animation (fade in and move down)
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `hsl(${bgHue}, 70%, 15%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background radial highlight */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Animated Circle */}
      <div
        style={{
          position: "absolute",
          left: xPos - 90,
          top: yPos - 90,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
          transform: `scale(${circleScale})`,
          boxShadow:
            "0 10px 30px rgba(255, 126, 95, 0.5), 0 0 50px rgba(254, 180, 123, 0.3)",
        }}
      />

      {/* Title Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "4px",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          RENDER TEST
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 20,
            marginTop: 8,
            letterSpacing: "2px",
            fontWeight: 500,
          }}
        >
          Frame {frame + 1} / 60
        </p>
      </div>
    </AbsoluteFill>
  );
};

