import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { ToneMappingEffect, ToneMappingMode } from "postprocessing";
import { makeBloom } from "../bridge/Bridge";
import { InkPass, noInkFallback } from "../bridge/ink";
import { LensBlur } from "../bridge/lensblur";
import { GradeEffect, GRADES } from "../bridge/grade";
import {
  PompeiiWorld,
  cameraAt,
  focusAt,
  shotAt,
  POMPEII_FRAMES,
} from "./scene";

const fwd = new THREE.Vector3();
const CINF = [2.4, 7.5, 4.5, 7.5, 2.4] as const;

const Inner: React.FC = () => {
  const frame = useCurrentFrame();
  const { camera, scene } = useThree();
  const world = useMemo(() => new PompeiiWorld(), []);
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  const fx = useMemo(() => ({
    ink: new InkPass(scene, perspectiveCamera),
    lens: new LensBlur({ maxCoC: 24, nearScale: 1.2 }),
    bloom: makeBloom(),
    tone: new ToneMappingEffect({ mode: ToneMappingMode.NEUTRAL }),
    grade: new GradeEffect(GRADES.golden, 0.58),
  }), [scene, perspectiveCamera]);

  useEffect(() => () => {
    fx.ink.dispose();
    fx.lens.dispose();
    fx.bloom.dispose();
    fx.tone.dispose();
    fx.grade.dispose();
  }, [fx]);

  const post = useMemo(() => (
    <EffectComposer multisampling={4}>
      <primitive object={fx.ink} dispose={null} />
      <primitive object={fx.lens.pre} dispose={null} />
      <primitive object={fx.lens.main} dispose={null} />
      <primitive object={fx.bloom} dispose={null} />
      <primitive object={fx.tone} dispose={null} />
      <primitive object={fx.grade} dispose={null} />
    </EffectComposer>
  ), [fx]);

  // Update scene and camera deterministically for the requested Remotion frame.
  const cam = cameraAt(frame);
  perspectiveCamera.position.copy(cam.pos);
  perspectiveCamera.lookAt(cam.look);
  perspectiveCamera.rotation.z = cam.roll;
  perspectiveCamera.fov = cam.fov;
  perspectiveCamera.updateProjectionMatrix();

  world.update(frame);
  noInkFallback(world.root);
  scene.fog = world.fog;

  perspectiveCamera.getWorldDirection(fwd);
  const focusPoint = focusAt(frame);
  fx.lens.focus = Math.max(0.3, focusPoint.sub(perspectiveCamera.position).dot(fwd));
  fx.lens.cInf = CINF[shotAt(frame) - 1];

  const shot = shotAt(frame);
  const light = shot <= 2 ? "golden" : shot === 5 ? "day" : "night";
  const gradeTag = fx.grade as GradeEffect & { _pompeiiLight?: keyof typeof GRADES };
  if (gradeTag._pompeiiLight !== light) {
    fx.grade.set(GRADES[light]);
    gradeTag._pompeiiLight = light;
  }
  fx.grade.amount = 0.58;

  return (
    <>
      <primitive object={world.root} dispose={null} />
      {post}
    </>
  );
};

export const PompeiiTest: React.FC = () => (
  <AbsoluteFill style={{ background: "#302b35" }}>
    <ThreeCanvas
      width={1080}
      height={1920}
      shadows
      gl={{
        antialias: false,
        stencil: false,
        powerPreference: "high-performance",
        toneMappingExposure: 1.0,
      }}
      camera={{
        fov: 45,
        near: 0.2,
        far: 1500,
      }}
    >
      <Inner />
    </ThreeCanvas>
  </AbsoluteFill>
);
