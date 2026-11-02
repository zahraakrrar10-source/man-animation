import { MyComposition } from "./Composition";
import { BridgeShort, BRIDGE_FRAMES } from "./videos/bridge/Bridge";
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="BridgeShort"
        component={BridgeShort}
        durationInFrames={BRIDGE_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

