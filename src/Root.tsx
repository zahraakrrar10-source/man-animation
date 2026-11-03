import { PompeiiTest } from "./videos/pompeii/PompeiiTest";
import { POMPEII_FRAMES } from "./videos/pompeii/scene";
import { MyComposition } from "./Composition";
import { BridgeShort, BRIDGE_FRAMES } from "./videos/bridge/Bridge";
import { BenchmarkShot01Comp, BENCHMARK_SHOT_01_FRAMES } from "./videos/bridge/BenchmarkShot01";
import { BenchmarkShot02Comp, BENCHMARK_SHOT_02_FRAMES } from "./videos/bridge/BenchmarkShot02";
import { BenchmarkShot03Comp, BENCHMARK_SHOT_03_FRAMES } from "./videos/bridge/BenchmarkShot03";
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
      <Composition
        id="BenchmarkShot01"
        component={BenchmarkShot01Comp}
        durationInFrames={BENCHMARK_SHOT_01_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BenchmarkShot02"
        component={BenchmarkShot02Comp}
        durationInFrames={BENCHMARK_SHOT_02_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BenchmarkShot03"
        component={BenchmarkShot03Comp}
        durationInFrames={BENCHMARK_SHOT_03_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PompeiiTest"
        component={PompeiiTest}
        durationInFrames={POMPEII_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

