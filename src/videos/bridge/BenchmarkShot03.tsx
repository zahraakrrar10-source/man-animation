// Benchmark Shot 3: night wide with one warm practical lantern.
// Bible §18 shot 3: the night-time visual language — cool blue/purple ambient, a single warm practical,
// a readable warm pool on the planks, characters lit by it, contact/cast shadows, and fog-softened depth.
// Reuses the BridgeShort rendering pipeline (World, InkPass, LensBlur, Bloom, Grade, Grain) with a static
// slight-high-angle camera, two front-facing characters and the lantern built by world.ts. Shot 18 sits after
// the existing timeline (frames 2265-2385) so BridgeShort (0-2024), Shot 1 and Shot 2 are unaffected.
// The Kenney kit is loaded at the top level with delayRender/continueRender so Remotion waits until all GLBs
// are loaded before capturing the still.
import React, { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { AbsoluteFill, continueRender, delayRender, getInputProps, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { ToneMappingEffect, ToneMappingMode } from "postprocessing";
import { World, loadKit } from "./world";
import { InkPass, noInkFallback } from "./ink";
import { LensBlur, GrainEffect } from "./lensblur";
import { GradeEffect, GRADES, GRADE_STRENGTH, gradeFor } from "./grade";
import { Kit } from "./build";
import { toggles, makeBloom } from "./Bridge";
import { camAt, dofAt } from "./story";

export const BENCHMARK_SHOT_03_FRAMES = 120; // 4 seconds at 30 fps

// Frame offset: shot 18's SHOTS/CAMS/DOF entries live at frames 2265-2385.
// BenchmarkShot03 renders frames 0-119, offset by 2265 to align with story.ts tables.
const SHOT_OFFSET = 2265;

// Inner renderer: receives the already-loaded kit. No async loading here.
const BenchmarkShot03Inner: React.FC<{ kit: Kit }> = ({ kit }) => {
  const f = useCurrentFrame();
  const { camera, scene } = useThree();
  const on = useMemo(toggles, []);

  const world = useMemo(() => new World(kit), [kit]);

  const fx = useMemo(() => ({
    ink: new InkPass(scene, camera as THREE.PerspectiveCamera),
    lens: new LensBlur({ maxCoC: 24, nearScale: 1.2 }),
    bloom: makeBloom(),
    tone: new ToneMappingEffect({ mode: ToneMappingMode.NEUTRAL }),
    grade: new GradeEffect(GRADES.night, GRADE_STRENGTH.night),
    grain: new GrainEffect({ amount: 0.025, cellPx: 1.5 }),
  }), [camera, scene]);

  useEffect(() => () => fx.ink.dispose(), [fx]);

  const post = useMemo(() => {
    const els: React.ReactElement[] = [];
    if (on.ink) els.push(<primitive object={fx.ink} dispose={null} />);
    if (on.lens && on.pre) els.push(<primitive object={fx.lens.pre} dispose={null} />);
    if (on.lens) els.push(<primitive object={fx.lens.main} dispose={null} />);
    if (on.bloom) els.push(<primitive object={fx.bloom} dispose={null} />);
    els.push(<primitive object={fx.tone} dispose={null} />);
    if (on.grade) els.push(<primitive object={fx.grade} dispose={null} />);
    if (on.grain) els.push(<primitive object={fx.grain} dispose={null} />);
    return <EffectComposer multisampling={4}>{els}</EffectComposer>;
  }, [fx, on]);

  // Hook-declared target (must be unconditional).
  const target = useMemo(() => new THREE.Vector3(), []);

  const cam = camera as THREE.PerspectiveCamera;
  const absF = f + SHOT_OFFSET;

  // Pose the world for shot 18 (night wide). world.update() sets camera position from CAMS[18],
  // aims the warm key from the lantern side, and shows the practical/deck casting.
  target.copy(world.update(18, absF, cam, scene));
  noInkFallback(world.root);

  // Thin-lens focus: distance along the view axis to the shot's focus point (the two faces).
  const fwd = new THREE.Vector3(), fpt = new THREE.Vector3();
  const d = dofAt(absF);
  cam.getWorldDirection(fwd);
  fpt.set(...(d.focus ? d.focus(absF) : camAt(18, absF).look));
  fx.lens.focus = Math.max(0.3, fpt.sub(cam.position).dot(fwd));
  fx.lens.cInf = d.cInf;
  gradeFor(fx.grade, "night");
  fx.grain.seed = f;

  return (
    <>
      <primitive object={world.root} dispose={null} />
      {post}
    </>
  );
};

export const BenchmarkShot03Comp: React.FC = () => {
  const [handle] = useState(() => delayRender("benchmark-shot-03-kit"));
  const [kit, setKit] = useState<Kit | null>(null);

  useEffect(() => {
    loadKit().then((k) => { setKit(k); continueRender(handle); });
  }, [handle]);

  if (!kit) return null;

  const dprOverride = () => (getInputProps() as { post?: { dpr?: number } }).post?.dpr;

  return (
    <AbsoluteFill style={{ background: "#0b1226" }}>
      <ThreeCanvas width={1080} height={1920} {...(dprOverride() ? { dpr: dprOverride() } : {})}
        camera={{ fov: 34, near: 0.2, far: 1500 }} shadows gl={{ antialias: false, stencil: false, powerPreference: "high-performance", toneMappingExposure: 1.0 }}>
        <BenchmarkShot03Inner kit={kit} />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
