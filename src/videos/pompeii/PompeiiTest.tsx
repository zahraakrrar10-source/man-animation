
import React, { useMemo } from "react";
import * as THREE from "three";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import {
  PompeiiWorld,
  cameraAt,
} from "./scene";

const Inner: React.FC = () => {
  const frame = useCurrentFrame();
  const { camera, scene } = useThree();

  const world = useMemo(() => new PompeiiWorld(), []);

  const cam = cameraAt(frame);
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  // Update the animated world.
  world.update(frame);

  // Update the camera for this frame.
  perspectiveCamera.position.copy(cam.pos);
  perspectiveCamera.lookAt(cam.look);
  perspectiveCamera.rotation.z = cam.roll;
  perspectiveCamera.fov = cam.fov;
  perspectiveCamera.updateProjectionMatrix();

  // Use the fog configured by the Pompeii world.
  scene.fog = world.fog;

  return <primitive object={world.root} dispose={null} />;
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
