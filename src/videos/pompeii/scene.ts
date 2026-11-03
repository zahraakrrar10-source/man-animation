// "The City That Was Buried Alive" — a self-contained stylised Roman city for PompeiiTest.
// Reuses the BridgeShort look systems (two-tone world shading, ink, thin-lens DOF, bloom, grade)
// but owns its geometry, camera path and animation. No BridgeShort/Benchmark files are touched.
import * as THREE from "three";
import { Batch, V, quad, tri } from "../bridge/build";
import { ctex, cobble, grassHD, rep, roofHD, stoneHD, rng } from "../bridge/paint";
import { NOINK } from "../bridge/ink";
import { twoTone } from "../bridge/shade";

export const POMPEII_FPS = 30;
export const POMPEII_FRAMES = 420; // 14 s
export const SHOT_STARTS = [0, 75, 150, 240, 330];
export const SHOT_ENDS = [75, 150, 240, 330, 420];

export type Shot = 1 | 2 | 3 | 4 | 5;
export const shotAt = (f: number): Shot => (f < 75 ? 1 : f < 150 ? 2 : f < 240 ? 3 : f < 330 ? 4 : 5);
const localU = (f: number) => {
  const s = shotAt(f);
  return { shot: s, u: (f - SHOT_STARTS[s - 1]) / (SHOT_ENDS[s - 1] - SHOT_STARTS[s - 1]), lt: (f - SHOT_STARTS[s - 1]) / POMPEII_FPS };
};
const ease = (u: number) => u * u * (3 - 2 * u);

// ---------------- look targets per shot ----------------
type Look = {
  skyTop: string; skyHor: string; skyBot: string; sunCol: string;
  lit: [number, number, number]; shade: [number, number, number]; lift: [number, number, number];
  lambert: number; sideK: number; term: number; sat: number;
  fog: string; fogNear: number; fogFar: number;
  sunDir: [number, number, number]; sunI: number;
  glow: number; plume: number; ash: number; surge: number;
};
const LOOKS: Record<Shot, Look> = {
  1: {
    skyTop: "#4d7fc4", skyHor: "#ffd7a2", skyBot: "#c98e62", sunCol: "#fff0c8",
    lit: [1.62, 1.36, 0.86], shade: [0.24, 0.31, 0.55], lift: [0.03, 0.04, 0.08],
    lambert: 0.32, sideK: 0.92, term: 0.16, sat: 1.16,
    fog: "#d8b892", fogNear: 80, fogFar: 620, sunDir: [-0.82, 0.46, 0.32], sunI: 2.4,
    glow: 1, plume: 0.34, ash: 0, surge: 0,
  },
  2: {
    skyTop: "#435173", skyHor: "#e7a06b", skyBot: "#9a5b45", sunCol: "#ffd0a0",
    lit: [1.5, 1.08, 0.66], shade: [0.22, 0.25, 0.42], lift: [0.025, 0.03, 0.06],
    lambert: 0.34, sideK: 0.9, term: 0.18, sat: 1.12,
    fog: "#b98b76", fogNear: 55, fogFar: 420, sunDir: [-0.72, 0.36, 0.42], sunI: 2.0,
    glow: 0.55, plume: 0.9, ash: 0.55, surge: 0,
  },
  3: {
    skyTop: "#191524", skyHor: "#b8512d", skyBot: "#3a2020", sunCol: "#ff9a50",
    lit: [1.42, 0.72, 0.38], shade: [0.16, 0.18, 0.34], lift: [0.02, 0.02, 0.05],
    lambert: 0.38, sideK: 0.86, term: 0.2, sat: 1.1,
    fog: "#6e3b30", fogNear: 26, fogFar: 300, sunDir: [-0.28, 0.3, -0.91], sunI: 1.7,
    glow: 1.2, plume: 1, ash: 0.9, surge: 1,
  },
  4: {
    skyTop: "#100d16", skyHor: "#5c2b22", skyBot: "#1b1111", sunCol: "#ff7a38",
    lit: [0.98, 0.5, 0.3], shade: [0.12, 0.13, 0.22], lift: [0.015, 0.015, 0.03],
    lambert: 0.4, sideK: 0.82, term: 0.22, sat: 1.0,
    fog: "#4b3029", fogNear: 14, fogFar: 190, sunDir: [-0.18, 0.26, -0.95], sunI: 1.3,
    glow: 1.35, plume: 1, ash: 1, surge: 1,
  },
  5: {
    skyTop: "#7e92ad", skyHor: "#ddd5c6", skyBot: "#aaa296", sunCol: "#e8f0ff",
    lit: [1.05, 1.1, 1.18], shade: [0.38, 0.42, 0.54], lift: [0.05, 0.055, 0.07],
    lambert: 0.3, sideK: 0.95, term: 0.24, sat: 0.78,
    fog: "#c9c4b8", fogNear: 45, fogFar: 460, sunDir: [-0.78, 0.5, 0.36], sunI: 1.5,
    glow: 0, plume: 0.22, ash: 0.34, surge: 0,
  },
};

// ---------------- camera path ----------------
export type CamState = { pos: THREE.Vector3; look: THREE.Vector3; fov: number; roll: number };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: [number, number, number], b: [number, number, number], t: number): THREE.Vector3 =>
  new THREE.Vector3(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t));

export const cameraAt = (f: number): CamState => {
  const { shot, u } = localU(f);
  const t = ease(u);
  if (shot === 1) {
    return { pos: lerp3([2.4, 54, 118], [0.6, 30, 82], t), look: lerp3([0, 8, -14], [0, 10, -24], t), fov: lerp(47, 41, t), roll: 0 };
  }
  if (shot === 2) {
    return { pos: lerp3([3.2, 1.75, 21], [6.2, 2.25, 27], t), look: lerp3([-1, 5.2, -18], [-1.6, 7.2, -24], t), fov: lerp(50, 45, t), roll: 0.006 * Math.sin(u * 5) };
  }
  if (shot === 3) {
    return { pos: lerp3([-9.5, 2.3, 27], [-4.5, 4.2, 18.5], t), look: lerp3([0, 11, -56], [0, 14, -48], t), fov: lerp(52, 45, t), roll: -0.008 };
  }
  if (shot === 4) {
    return { pos: lerp3([0, 2.1, 20], [-3.5, 18, 35], t), look: lerp3([0, 4.6, -20], [0, 2.2, -6], t), fov: lerp(54, 43, t), roll: 0.01 };
  }
  return { pos: lerp3([37, 23, 66], [25, 16.5, 54], t), look: lerp3([0, 5.6, -10], [0, 4.4, -10], t), fov: lerp(43, 38, t), roll: 0 };
};

export const focusAt = (f: number): THREE.Vector3 => {
  const { shot } = localU(f);
  if (shot === 1) return V(0, 9, -8);
  if (shot === 2) return V(0, 1.8, 2);
  if (shot === 3) return V(0, 8, -40);
  if (shot === 4) return V(0, 3, -6);
  return V(0, 5, -8);
};

// ---------------- shared materials / textures ----------------
const MATS = new Map<string, THREE.Material>();
const lit = (key: string, p: THREE.MeshLambertMaterialParameters) => {
  let m = MATS.get(key) as THREE.MeshLambertMaterial | undefined;
  if (!m) { m = twoTone(new THREE.MeshLambertMaterial(p)); MATS.set(key, m); }
  return m;
};
const basic = (key: string, p: THREE.MeshBasicMaterialParameters) => {
  let m = MATS.get(key) as THREE.MeshBasicMaterial | undefined;
  if (!m) { m = new THREE.MeshBasicMaterial(p); MATS.set(key, m); }
  return m;
};

const plasterTex = (key: string, base: string) => ctex("pompeiiPlaster" + key, 256, 256, (g, r) => {
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 60; i++) {
    g.fillStyle = `rgba(255,245,220,${0.02 + r() * 0.045})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 8 + r() * 32, 5 + r() * 18, r() * 3, 0, 7); g.fill();
  }
  for (let i = 0; i < 45; i++) {
    g.fillStyle = `rgba(70,40,25,${0.02 + r() * 0.04})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 6 + r() * 26, 4 + r() * 14, r() * 3, 0, 7); g.fill();
  }
  g.strokeStyle = "rgba(70,45,30,0.18)"; g.lineWidth = 1.2;
  for (let i = 0; i < 8; i++) {
    let x = r() * 256, y = r() * 256;
    g.beginPath(); g.moveTo(x, y);
    for (let k = 0; k < 4; k++) { x += (r() - 0.5) * 26; y += 8 + r() * 22; g.lineTo(x, y); }
    g.stroke();
  }
});
const plaster = (key: string, base: string) => rep(plasterTex(key, base), 1.5, 1.5);
const roof = (key: string, col: string) => rep(roofHD(col), 1, 1);
const stone = () => rep(stoneHD("pompeiiStone", ["#d9c9a8", "#cbb993", "#e2d4b8", "#bfae8b"], "#9a876e"), 1, 1);
const groundGrass = () => rep(grassHD(), 46, 46);
const streetTex = () => rep(cobble(), 3, 32);
const plazaTex = () => rep(stoneHD("pompeiiPlaza", ["#d7c8ac", "#c9b997", "#e0d2b6", "#bfae8b"], "#8f7d64"), 7, 6);

const windowLit = () => lit("windowLit", { color: "#34211a", emissive: "#ff9a44", emissiveIntensity: 2.4 });
const windowDark = () => lit("windowDark", { color: "#292437" });
const doorMat = () => lit("door", { color: "#4a2e22" });
const trimMat = () => lit("trim", { color: "#eadfc8" });
const stoneMat = () => lit("stone", { map: stone() });
const roofA = () => lit("roofA", { map: roof("a", "#b95c3e") });
const roofB = () => lit("roofB", { map: roof("b", "#a94e35") });
const wallA = () => lit("wallA", { map: plaster("a", "#e3c79b") });
const wallB = () => lit("wallB", { map: plaster("b", "#cf9a5a") });
const wallC = () => lit("wallC", { map: plaster("c", "#b96a4f") });
const wallD = () => lit("wallD", { map: plaster("d", "#e9dcc0") });
const wallE = () => lit("wallE", { map: plaster("e", "#c9a879") });
const barkMat = () => lit("bark", { color: "#7a5338" });
const cypressMat = () => lit("cypress", { color: "#315a3c" });
const pineMat = () => lit("pine", { color: "#4f7d43" });
const bronzeMat = () => lit("bronze", { color: "#6f5a3a" });
const ashMat = () => lit("ash", { color: "#b9b1a4", map: rep(ctex("pompeiiAshGround", 256, 256, (g, r) => {
  g.fillStyle = "#bdb5a7"; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 90; i++) {
    g.fillStyle = `rgba(255,250,240,${0.02 + r() * 0.05})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 8 + r() * 30, 4 + r() * 14, r() * 3, 0, 7); g.fill();
  }
  for (let i = 0; i < 70; i++) {
    g.fillStyle = `rgba(70,60,50,${0.02 + r() * 0.045})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 5 + r() * 22, 3 + r() * 10, r() * 3, 0, 7); g.fill();
  }
}), 22, 22) });
const duneMat = () => lit("dune", { color: "#c6beb1", map: rep(ctex("pompeiiDune", 256, 256, (g, r) => {
  g.fillStyle = "#c8c0b3"; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 80; i++) {
    g.fillStyle = `rgba(250,246,238,${0.03 + r() * 0.06})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 10 + r() * 34, 5 + r() * 16, r() * 3, 0, 7); g.fill();
  }
  for (let i = 0; i < 50; i++) {
    g.fillStyle = `rgba(80,70,60,${0.02 + r() * 0.04})`;
    g.beginPath(); g.ellipse(r() * 256, r() * 256, 6 + r() * 20, 4 + r() * 12, r() * 3, 0, 7); g.fill();
  }
}), 5, 5) });

const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 12);
const CONE = new THREE.ConeGeometry(1, 1, 14);
const SPH = new THREE.SphereGeometry(1, 16, 12);
const YQ = (a: number) => new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), a);
const TRS = (x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0) =>
  new THREE.Matrix4().compose(V(x, y, z), YQ(ry), V(sx, sy, sz));

const box = (b: Batch, m: THREE.Material, x: number, y: number, z: number, w: number, h: number, d: number, ry = 0) =>
  b.add(BOX, m, TRS(x, y + h / 2, z, w, h, d, ry));
const cyl = (b: Batch, m: THREE.Material, x: number, y: number, z: number, r: number, h: number, rr = r) =>
  b.add(CYL, m, TRS(x, y + h / 2, z, rr, h, r));
const cone = (b: Batch, m: THREE.Material, x: number, y: number, z: number, r: number, h: number) =>
  b.add(CONE, m, TRS(x, y + h / 2, z, r, h, r));
const sphere = (b: Batch, m: THREE.Material, x: number, y: number, z: number, sx: number, sy: number, sz: number) =>
  b.add(SPH, m, TRS(x, y, z, sx, sy, sz));

// ---------------- city geometry ----------------
const gable = (b: Batch, m: THREE.Material, x: number, z: number, y: number, w: number, d: number, rh: number, ry = 0) => {
  const hw = w / 2, hd = d / 2, mat = new THREE.Matrix4().makeRotationY(ry).setPosition(x, y, z);
  const slope = Math.hypot(hd, rh);
  b.add(quad(V(-hw, 0, hd), V(hw, 0, hd), V(hw, rh, 0), V(-hw, rh, 0), w / 4, slope / 4), m, mat);
  b.add(quad(V(hw, 0, -hd), V(-hw, 0, -hd), V(-hw, rh, 0), V(hw, rh, 0), w / 4, slope / 4), m, mat);
  b.add(tri(V(-hw, 0, -hd), V(-hw, 0, hd), V(-hw, rh, 0)), m, mat);
  b.add(tri(V(hw, 0, hd), V(hw, 0, -hd), V(hw, rh, 0)), m, mat);
};

type Style = { wall: () => THREE.Material; roof: () => THREE.Material };
const STYLES: Style[] = [
  { wall: wallA, roof: roofA },
  { wall: wallD, roof: roofB },
  { wall: wallC, roof: roofA },
  { wall: wallB, roof: roofB },
  { wall: wallE, roof: roofA },
];

const house = (b: Batch, x: number, z: number, ry: number, w: number, d: number, h: number, si: number) => {
  const st = STYLES[si % STYLES.length], c = Math.cos(ry), s = Math.sin(ry);
  const put = (m: THREE.Material, px: number, py: number, pz: number, sx: number, sy: number, sz: number) =>
    b.add(BOX, m, TRS(x + px * c + pz * s, py, z - px * s + pz * c, sx, sy, sz, ry));
  put(st.wall(), 0, h / 2, 0, w, h, d);
  put(stoneMat(), 0, 0.25, 0, w + 0.32, 0.5, d + 0.32);
  put(trimMat(), 0, h - 0.25, 0, w + 0.4, 0.3, d + 0.4);
  put(doorMat(), 0, 1.4, d / 2 + 0.08, 1.3, 2.8, 0.16);
  const litWin = si % 3 !== 1;
  for (const wx of [-w * 0.29, w * 0.29]) {
    put(litWin && si % 2 === 0 ? windowLit() : windowDark(), wx, h * 0.56, d / 2 + 0.08, 0.95, 1.15, 0.14);
    put(trimMat(), wx, h * 0.56 + 0.66, d / 2 + 0.1, 1.18, 0.14, 0.22);
    put(trimMat(), wx, h * 0.56 - 0.66, d / 2 + 0.12, 1.12, 0.12, 0.28);
  }
  const fr = (px: number, py: number, pz: number, u: number, v: number) =>
    b.add(quad(V(px - u, py - v, pz), V(px + u, py - v, pz), V(px + u, py + v, pz), V(px - u, py + v, pz), 1, 1),
      st.wall(), new THREE.Matrix4().makeRotationY(ry).setPosition(x, 0, z));
  // shallow painted pilasters frame the door
  fr(-1.05, 1.45, d / 2 + 0.1, 0.12, 1.45);
  fr(1.05, 1.45, d / 2 + 0.1, 0.12, 1.45);
  gable(b, st.roof(), x, z, h, w + 0.7, d + 0.7, d * 0.34, ry);
  put(stoneMat(), w * 0.22, h + d * 0.16, -d * 0.18, 0.7, 1.7, 0.7);
};

const cypress = (b: Batch, x: number, z: number, h: number) => {
  cyl(b, barkMat(), x, 0, z, 0.18, h * 0.25);
  cone(b, cypressMat(), x, h * 0.12, z, h * 0.14, h * 0.9);
  cone(b, cypressMat(), x, h * 0.3, z, h * 0.1, h * 0.55);
};
const pine = (b: Batch, x: number, z: number, h: number) => {
  cyl(b, barkMat(), x, 0, z, 0.34, h * 0.72);
  sphere(b, pineMat(), x, h * 0.78, z, h * 0.36, h * 0.13, h * 0.36);
  sphere(b, pineMat(), x + 1.2, h * 0.72, z - 0.8, h * 0.22, h * 0.1, h * 0.24);
};

const column = (b: Batch, x: number, z: number, y: number, h: number, r: number) => {
  cyl(b, stoneMat(), x, y, z, r, h);
  cyl(b, trimMat(), x, y, z, r * 1.35, 0.3);
  cyl(b, trimMat(), x, y + h - 0.3, z, r * 1.32, 0.3);
};
const statue = (b: Batch, x: number, z: number, y: number) => {
  cyl(b, stoneMat(), x, y, z, 0.75, 1.3, 0.95);
  cyl(b, bronzeMat(), x, y + 1.3, z, 0.3, 1.6);
  sphere(b, bronzeMat(), x, y + 3.0, z, 0.28, 0.32, 0.28);
  cyl(b, bronzeMat(), x - 0.32, y + 2.3, z, 0.1, 0.8);
  cyl(b, bronzeMat(), x + 0.32, y + 2.3, z, 0.1, 0.8);
};

const buildCity = (root: THREE.Object3D) => {
  const b = new Batch();
  // ground / streets / forum
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(420, 420), lit("ground", { map: groundGrass() }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; ground.receiveShadow = true; root.add(ground);
  const street = new THREE.Mesh(new THREE.PlaneGeometry(12, 150), lit("street", { map: streetTex() }));
  street.rotation.x = -Math.PI / 2; street.position.set(0, 0.015, -18); street.receiveShadow = true; root.add(street);
  const plaza = new THREE.Mesh(new THREE.PlaneGeometry(46, 36), lit("plaza", { map: plazaTex() }));
  plaza.rotation.x = -Math.PI / 2; plaza.position.set(0, 0.025, -31); plaza.receiveShadow = true; root.add(plaza);
  // street-side domus, two rows
  for (let i = 0; i < 5; i++) {
    const z = 26 - i * 11;
    house(b, -12, z, Math.PI / 2, 9, 8, 7 + (i % 2) * 2, i);
    house(b, 12, z, -Math.PI / 2, 9, 8, 7 + ((i + 1) % 2) * 2, i + 2);
  }
  for (let i = 0; i < 6; i++) {
    const z = 30 - i * 12;
    house(b, -24, z, Math.PI / 2, 10, 8, 8 + ((i + 1) % 2) * 2, i + 1);
    house(b, 24, z, -Math.PI / 2, 10, 8, 8 + (i % 2) * 2, i + 3);
  }
  for (let i = 0; i < 6; i++) {
    const z = 24 - i * 14;
    house(b, -38, z, Math.PI / 2, 11, 9, 8 + (i % 2) * 3, i);
    house(b, 38, z, -Math.PI / 2, 11, 9, 8 + ((i + 1) % 2) * 3, i + 2);
  }
  // houses closing the far side of the forum, behind the temple
  for (let i = 0; i < 5; i++) house(b, -26 + i * 13, -62, 0, 11, 9, 8 + (i % 2) * 2, i + 1);
  // forum colonnade
  for (let i = 0; i < 7; i++) {
    const z = -17 - i * 4.2;
    column(b, -17, z, 0, 7.4, 0.42);
    column(b, 17, z, 0, 7.4, 0.42);
  }
  box(b, trimMat(), -17, 7.35, -29.6, 1.2, 0.55, 27);
  box(b, trimMat(), 17, 7.35, -29.6, 1.2, 0.55, 27);
  // temple: podium, steps, columns, entablature, pediment, cella
  box(b, stoneMat(), 0, 0, -46, 27, 2.6, 18);
  for (let i = 0; i < 3; i++) box(b, stoneMat(), 0, 0, -36.2 + i * 1.3, 20 - i * 2.4, 0.55 + i * 0.15, 2.6);
  box(b, wallD(), 0, 2.6, -49, 16, 8, 12);
  for (let i = 0; i < 6; i++) column(b, -10 + i * 4, -38.2, 2.6, 8.6, 0.52);
  for (const zz of [-41.5, -45.5]) for (const xx of [-10.5, 10.5]) column(b, xx, zz, 2.6, 8.6, 0.52);
  box(b, trimMat(), 0, 11.2, -42.4, 24, 1.5, 10);
  gable(b, stoneMat(), 0, -42.4, 12.7, 24, 10, 3.6, 0);
  statue(b, 0, -37.4, 0);
  // forum statues + fountain
  statue(b, -8, -21, 0);
  statue(b, 8, -21, 0);
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 0.65, 24, 1, true), stoneMat());
  basin.position.set(0, 0.32, -27); basin.castShadow = basin.receiveShadow = true; root.add(basin);
  const water = new THREE.Mesh(new THREE.CircleGeometry(2.9, 24), basic("fountainWater", { color: "#4f93b8", transparent: true, opacity: 0.82 }));
  water.rotation.x = -Math.PI / 2; water.position.set(0, 0.52, -27); root.add(water);
  cyl(b, stoneMat(), 0, 0, -27, 0.5, 2.2);
  // triumphal arch framing the forum
  box(b, stoneMat(), -5.2, 0, -16, 2.2, 9, 4);
  box(b, stoneMat(), 5.2, 0, -16, 2.2, 9, 4);
  box(b, trimMat(), 0, 8.7, -16, 12.8, 1.5, 4.4);
  const arch = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.85, 7, 18, Math.PI), stoneMat());
  arch.position.set(0, 7.1, -16); arch.castShadow = arch.receiveShadow = true; root.add(arch);
  // market stalls + carts near the camera in shot 2
  for (const [sx, sc] of [[-7.4, "#b5483c"], [7.4, "#c39a4a"]] as const) {
    for (const dz of [-1.4, 1.4]) cyl(b, barkMat(), sx + dz * 0.3, 0, 11.5, 0.09, 2.5);
    box(b, lit("awning" + sc, { color: sc }), sx, 2.35, 11.5, 3.1, 0.18, 3.4, 0.08);
    box(b, stoneMat(), sx, 0.55, 11.5, 2.7, 0.85, 2.4);
    for (let k = 0; k < 4; k++) {
      cyl(b, lit("amphora", { color: "#b2694a" }), sx - 0.9 + k * 0.55, 0, 12.5, 0.16, 0.45, 0.24);
      sphere(b, lit("amphora", { color: "#b2694a" }), sx - 0.9 + k * 0.55, 0.75, 12.5, 0.24, 0.3, 0.24);
    }
  }
  const cart = (x: number, z: number, ry: number) => {
    box(b, barkMat(), x, 0.65, z, 2.2, 0.25, 1.2, ry);
    for (const s of [-1, 1]) cyl(b, barkMat(), x + s * 1.05 * Math.cos(ry), 0.45, z - s * 1.05 * Math.sin(ry), 0.45, 0.12, 0.45);
  };
  cart(-7.5, 17.2, 0.2);
  cart(7.8, 18.6, -0.3);
  // trees and skyline
  for (const [x, z, h] of [[-20, 34, 12], [20, 36, 13], [-31, -2, 14], [31, 2, 12], [-42, -22, 15], [42, -18, 14], [-27, -56, 13], [28, -58, 15]] as const) cypress(b, x, z, h);
  for (const [x, z, h] of [[-34, 22, 14], [35, 26, 15], [-46, -8, 16], [46, -6, 15], [-52, -44, 17], [52, -40, 16]] as const) pine(b, x, z, h);
  // aqueduct on the left horizon
  for (let i = 0; i < 5; i++) {
    const x = -78 + i * 11;
    box(b, stoneMat(), x, 0, -96, 2.4, 15, 3.2);
    box(b, stoneMat(), x + 5.5, 0, -96, 2.4, 15, 3.2);
    const a = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.7, 6, 14, Math.PI), stoneMat());
    a.position.set(x + 5.5, 11.2, -96); a.castShadow = a.receiveShadow = true; root.add(a);
  }
  box(b, stoneMat(), -56, 15, -96, 56, 1.6, 3.6);
  // distant hills
  for (const [x, z, sx, sy, sz] of [[-150, -120, 120, 38, 90], [160, -115, 130, 44, 100], [-220, 20, 120, 30, 100], [220, 10, 130, 34, 110]] as const) {
    sphere(b, lit("hill", { color: "#6f9a4d" }), x, -6, z, sx, sy, sz);
  }
  b.build(root, true);
};

// ---------------- sky, clouds, volcano ----------------
const cloudTex = () => ctex("pompeiiCloud", 256, 256, (g, r) => {
  const blob = (x: number, y: number, rad: number, a: number) => {
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, `rgba(255,255,255,${a})`);
    gr.addColorStop(0.55, `rgba(255,255,255,${a * 0.5})`);
    gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill();
  };
  for (let i = 0; i < 85; i++) blob(128 + (r() - 0.5) * 150, 140 + (r() - 0.5) * 105, 24 + r() * 58, 0.05 + r() * 0.11);
  blob(128, 142, 98, 0.32);
  blob(96, 125, 62, 0.2);
  blob(165, 152, 54, 0.18);
});
const dotTex = () => ctex("pompeiiDot", 64, 64, (g) => {
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 31);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.45, "rgba(255,255,255,0.75)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
});
const glowTex = () => ctex("pompeiiGlow", 128, 128, (g) => {
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 63);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.3, "rgba(255,255,255,0.6)");
  gr.addColorStop(0.65, "rgba(255,255,255,0.16)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
});

const skyMat = () => new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    uTop: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uBot: { value: new THREE.Color() },
    uSunCol: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uSun: { value: 1 }, uGlow: { value: 0.3 },
  },
  vertexShader: "varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: `varying vec3 vDir; uniform vec3 uTop; uniform vec3 uHor; uniform vec3 uBot; uniform vec3 uSunCol; uniform vec3 uSunDir; uniform float uSun; uniform float uGlow;
    void main(){
      vec3 d = normalize(vDir);
      float h = clamp(d.y, -1.0, 1.0);
      vec3 c = h >= 0.0 ? mix(uHor, uTop, pow(h, 0.55)) : mix(uHor, uBot, pow(-h, 0.5));
      float s = max(dot(d, normalize(uSunDir)), 0.0);
      c += uSunCol * (pow(s, 1100.0) * uSun + pow(s, 14.0) * uGlow);
      gl_FragColor = vec4(c, 1.0);
    }`,
});

const mkSprite = (color: THREE.ColorRepresentation, opacity: number, additive = false, fog = true) => {
  const m = new THREE.SpriteMaterial({
    map: cloudTex(), color, transparent: true, depthWrite: false, opacity,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, fog,
  });
  const s = new THREE.Sprite(m); s.layers.set(NOINK); return s;
};

const volcanoTex = () => ctex("pompeiiVolcano", 8, 256, (g) => {
  const gr = g.createLinearGradient(0, 256, 0, 0);
  gr.addColorStop(0, "#4f6a43");
  gr.addColorStop(0.34, "#5d6f48");
  gr.addColorStop(0.62, "#6b5b4e");
  gr.addColorStop(0.84, "#554448");
  gr.addColorStop(1, "#3a3138");
  g.fillStyle = gr; g.fillRect(0, 0, 8, 256);
  for (let i = 0; i < 26; i++) {
    g.fillStyle = `rgba(20,20,18,${0.03 + (i % 3) * 0.02})`;
    g.fillRect(0, 30 + i * 8, 8, 2);
  }
});

// ---------------- simplified Roman actors ----------------
class Roman {
  readonly group = new THREE.Group();
  private legL = new THREE.Group();
  private legR = new THREE.Group();
  private armL = new THREE.Group();
  private armR = new THREE.Group();
  private head = new THREE.Group();
  private seed: number;
  private cloak: THREE.Mesh | null = null;

  constructor(seed: number, tunic: string, female: boolean, cloak = false) {
    this.seed = seed;
    const skin = lit("skin" + (seed % 3), { color: ["#e8b48a", "#d9a273", "#f0c49a"][seed % 3] });
    const cloth = lit("tunic" + tunic, { color: tunic });
    const hair = lit("hair" + (seed % 4), { color: ["#3a2a20", "#241a16", "#5a3a24", "#6a4a2a"][seed % 4] });
    const dark = lit("sandal", { color: "#4a3024" });
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.37, 0.86, 10), cloth);
    torso.position.y = 1.28; this.group.add(torso);
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.12, 10), dark);
    belt.position.y = 1.0; this.group.add(belt);
    if (female) {
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.52, 0.95, 12), cloth);
      skirt.position.y = 0.58; this.group.add(skirt);
    }
    this.head.position.y = 1.94; this.group.add(this.head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.215, 14, 12), skin);
    this.head.add(skull);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.225, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.52), hair);
    cap.position.y = 0.055; this.head.add(cap);
    const eyeG = new THREE.SphereGeometry(0.027, 7, 6);
    const eyeM = lit("eye", { color: "#1a1412" });
    for (const ex of [-0.073, 0.073]) {
      const e = new THREE.Mesh(eyeG, eyeM); e.position.set(ex, 0.015, 0.202); this.head.add(e);
    }
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.018, 0.015), eyeM);
    mouth.position.set(0, -0.075, 0.213); this.head.add(mouth);
    const armGeo = new THREE.CylinderGeometry(0.072, 0.06, 0.62, 8);
    for (const [g, sx] of [[this.armL, -1], [this.armR, 1]] as const) {
      g.position.set(sx * 0.36, 1.56, 0); this.group.add(g);
      const a = new THREE.Mesh(armGeo, skin); a.position.y = -0.31; g.add(a);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), skin); hand.position.y = -0.64; g.add(hand);
    }
    const legGeo = new THREE.CylinderGeometry(0.09, 0.075, 0.78, 8);
    for (const [g, sx] of [[this.legL, -1], [this.legR, 1]] as const) {
      g.position.set(sx * 0.155, 0.88, 0); this.group.add(g);
      const l = new THREE.Mesh(legGeo, skin); l.position.y = -0.39; g.add(l);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.3), dark); foot.position.set(0, -0.8, 0.06); g.add(foot);
    }
    if (cloak) {
      const c = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 1.25), lit("cloak", { color: "#8f2f32", side: THREE.DoubleSide }));
      c.position.set(0, 1.24, -0.24); c.rotation.x = 0.1; this.group.add(c); this.cloak = c;
    }
    this.group.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  }

  pose(t: number, run: boolean) {
    const ph = t * (run ? 9.5 : 4.4) + this.seed;
    const amp = run ? 0.82 : 0.32;
    this.legL.rotation.x = Math.sin(ph) * amp;
    this.legR.rotation.x = -Math.sin(ph) * amp;
    this.armL.rotation.x = -Math.sin(ph) * amp * 0.9;
    this.armR.rotation.x = Math.sin(ph) * amp * 0.9;
    this.group.position.y = Math.abs(Math.sin(ph)) * (run ? 0.07 : 0.025);
    this.group.rotation.x = run ? 0.12 : 0.015;
    this.group.rotation.z = Math.sin(ph * 0.5) * (run ? 0.035 : 0.01);
    this.head.rotation.z = Math.sin(ph * 0.47) * 0.035;
    if (this.cloak) this.cloak.rotation.x = 0.1 + (run ? 0.28 : 0.06) + Math.sin(ph * 0.7) * 0.08;
  }
}

// ---------------- world ----------------
type Puff = { s: THREE.Sprite; x: number; y: number; z: number; scale: number; phase: number; speed: number };
type Body = { s: THREE.Sprite; x: number; y: number; off: number; scale: number; phase: number };
type Curtain = { s: THREE.Sprite; off: number; w: number; h: number; op: number };
type Dune = { m: THREE.Mesh; x: number; z: number; sx: number; sy: number; sz: number; phase: number };
type CharCfg = { x0: number; z0: number; dx: number; speed: number; ry: number; female: boolean; cloak: boolean };

const CHAR_CFG: CharCfg[] = [
  { x0: -3.4, z0: -10, dx: 0.4, speed: 9.5, ry: 0, female: false, cloak: true },
  { x0: -1.2, z0: -4, dx: -0.5, speed: 8.2, ry: 0, female: true, cloak: false },
  { x0: 1.5, z0: -8, dx: 0.2, speed: 10.5, ry: 0, female: false, cloak: false },
  { x0: 3.4, z0: -2, dx: -0.3, speed: 8.8, ry: 0, female: false, cloak: false },
  { x0: -4.2, z0: 2, dx: 0.8, speed: 8.0, ry: 0, female: true, cloak: false },
  { x0: 0.2, z0: 4, dx: 0.1, speed: 9.2, ry: 0, female: false, cloak: true },
  { x0: 4.6, z0: 5, dx: -0.6, speed: 7.6, ry: 0, female: true, cloak: false },
  { x0: 6.2, z0: 12, dx: -1.1, speed: 7.0, ry: 0, female: false, cloak: false },
  { x0: -2.4, z0: 1, dx: 0.4, speed: 8.6, ry: 0, female: false, cloak: false },
];
const TUNICS = ["#c95a3f", "#d9a441", "#4a8a8a", "#efe6d0", "#8a5a9e", "#3f6fa8", "#b04a4a", "#7a8a4a", "#d08050"];

const duneGeo = (seed: number) => {
  const g = new THREE.SphereGeometry(1, 20, 12);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = 1 + 0.13 * Math.sin(x * 3.1 + seed) * Math.cos(z * 2.7 - seed);
    p.setXYZ(i, x * n, y, z * n);
  }
  g.computeVertexNormals();
  return g;
};

export class PompeiiWorld {
  readonly root = new THREE.Group();
  readonly fog = new THREE.Fog(0xffffff, 60, 500);
  private sky: THREE.Mesh;
  private sun = new THREE.DirectionalLight(0xffffff, 2);
  private sunTarget = new THREE.Vector3(0, 0, -16);
  private sunSprite: THREE.Sprite;
  private softClouds: Puff[] = [];
  private darkClouds: Puff[] = [];
  private plume: Puff[] = [];
  private craterGlow: THREE.Sprite;
  private surge = new THREE.Group();
  private surgeBodies: Body[] = [];
  private curtains: Curtain[] = [];
  private surgeGlow: THREE.Sprite[] = [];
  private chars: Roman[] = [];
  private ash: THREE.Points;
  private ashPos: Float32Array;
  private ashMat: THREE.PointsMaterial;
  private embers: THREE.Points;
  private emberPos: Float32Array;
  private emberMat: THREE.PointsMaterial;
  private slab: THREE.Mesh;
  private dunes: Dune[] = [];
  private foreground = new THREE.Group();

  constructor() {
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(620, 32, 18), skyMat());
    this.sky.layers.set(NOINK); this.sky.frustumCulled = false; this.sky.renderOrder = -10;
    this.root.add(this.sky);

    const sunMat = new THREE.SpriteMaterial({ map: glowTex(), color: "#fff0c8", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    this.sunSprite = new THREE.Sprite(sunMat); this.sunSprite.layers.set(NOINK); this.sunSprite.scale.set(120, 120, 1); this.root.add(this.sunSprite);

    buildCity(this.root);

    // soft golden-hour clouds (shot 1) and the eruption storm layer (shots 2-4)
    const r = rng(21);
    for (let i = 0; i < 7; i++) {
      const s = mkSprite("#ffe0c0", 0, false, false);
      const p = { s, x: (r() - 0.5) * 420, y: 95 + r() * 95, z: -250 - r() * 150, scale: 90 + r() * 120, phase: r() * 6.28, speed: 0.02 };
      s.scale.set(p.scale, p.scale * 0.55, 1); s.position.set(p.x, p.y, p.z); this.softClouds.push(p); this.root.add(s);
    }
    for (let i = 0; i < 11; i++) {
      const s = mkSprite("#2b2230", 0, false, false);
      const p = { s, x: (r() - 0.5) * 520, y: 105 + r() * 120, z: -245 - r() * 160, scale: 150 + r() * 170, phase: r() * 6.28, speed: 0.015 };
      s.scale.set(p.scale, p.scale * 0.55, 1); s.position.set(p.x, p.y, p.z); this.darkClouds.push(p); this.root.add(s);
    }

    // Vesuvius
    const volcano = new THREE.Group();
    const coneMesh = new THREE.Mesh(new THREE.CylinderGeometry(8, 96, 108, 52, 14, true), lit("volcano", { map: volcanoTex() }));
    coneMesh.position.set(0, 54, -178); coneMesh.castShadow = false; coneMesh.receiveShadow = false; volcano.add(coneMesh);
    const cap = new THREE.Mesh(new THREE.CircleGeometry(8, 28), lit("craterCap", { color: "#2b2228" }));
    cap.rotation.x = -Math.PI / 2; cap.position.set(0, 108, -178); volcano.add(cap);
    const vb = new Batch();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2, rr = 13 + (i % 3) * 3;
      cone(vb, lit("rock", { color: "#3f3438" }), Math.cos(a) * rr, 104, -178 + Math.sin(a) * rr, 5 + (i % 3) * 1.5, 8 + (i % 4) * 3);
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      cone(vb, lit("rock", { color: "#3f3438" }), Math.cos(a) * 78, 0, -178 + Math.sin(a) * 78, 24 + (i % 3) * 7, 22 + (i % 4) * 6);
    }
    vb.build(volcano, false);
    const cg = mkSprite(new THREE.Color(2.6, 0.9, 0.24), 0, true, false);
    cg.scale.set(22, 16, 1); cg.position.set(0, 110, -178); this.craterGlow = cg; volcano.add(cg);
    this.root.add(volcano);

    // eruption column
    const rp = rng(33);
    for (let i = 0; i < 22; i++) {
      const s = mkSprite("#4a3a3a", 0, false, false);
      const p = { s, x: (rp() - 0.5) * 28, y: 104 + rp() * 8, z: -178 + (rp() - 0.5) * 22, scale: 12 + rp() * 18, phase: rp(), speed: 0.055 + rp() * 0.05 };
      s.position.set(p.x, p.y, p.z); this.plume.push(p); this.root.add(s);
    }

    // pyroclastic surge
    this.root.add(this.surge);
    const rs = rng(44);
    for (let i = 0; i < 34; i++) {
      const s = mkSprite("#2b2429", 0, false, true);
      const p = { s, x: (rs() - 0.5) * 150, y: 5 + rs() * 62, off: 4 + rs() * 62, scale: 22 + rs() * 32, phase: rs() * 6.28 };
      s.position.set(p.x, p.y, p.off); this.surgeBodies.push(p); this.surge.add(s);
    }
    for (const [off, w, h, op] of [[18, 210, 132, 0.82], [30, 180, 118, 0.7], [44, 155, 105, 0.58]] as const) {
      const s = mkSprite("#2a2328", 0, false, true); s.scale.set(w, h, 1); this.curtains.push({ s, off, w, h, op }); this.surge.add(s);
    }
    for (let i = 0; i < 7; i++) {
      const g = mkSprite(new THREE.Color(2.8, 0.85, 0.2), 0, true, true);
      g.scale.set(34, 18, 1); this.surgeGlow.push(g); this.surge.add(g);
    }

    // ash fall + embers
    const N = 2400;
    this.ashPos = new Float32Array(N * 3);
    const ra = rng(77);
    for (let i = 0; i < N; i++) {
      this.ashPos[i * 3] = (ra() - 0.5) * 90;
      this.ashPos[i * 3 + 1] = ra() * 34;
      this.ashPos[i * 3 + 2] = (ra() - 0.5) * 90;
    }
    const ag = new THREE.BufferGeometry();
    ag.setAttribute("position", new THREE.BufferAttribute(this.ashPos, 3));
    this.ashMat = new THREE.PointsMaterial({ size: 0.16, map: dotTex(), transparent: true, opacity: 0, depthWrite: false, alphaTest: 0.02, sizeAttenuation: true, fog: true, color: "#c8c0b4" });
    this.ash = new THREE.Points(ag, this.ashMat); this.ash.frustumCulled = false; this.ash.layers.set(NOINK); this.root.add(this.ash);

    const NE = 170;
    this.emberPos = new Float32Array(NE * 3);
    const re = rng(88);
    for (let i = 0; i < NE; i++) {
      this.emberPos[i * 3] = (re() - 0.5) * 80;
      this.emberPos[i * 3 + 1] = re() * 18;
      this.emberPos[i * 3 + 2] = (re() - 0.5) * 70;
    }
    const eg = new THREE.BufferGeometry();
    eg.setAttribute("position", new THREE.BufferAttribute(this.emberPos, 3));
    this.emberMat = new THREE.PointsMaterial({ size: 0.24, map: dotTex(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, fog: false, color: new THREE.Color(3.2, 1.0, 0.25) });
    this.embers = new THREE.Points(eg, this.emberMat); this.embers.frustumCulled = false; this.embers.layers.set(NOINK); this.root.add(this.embers);

    // ash flood slab + rolling dunes
    this.slab = new THREE.Mesh(new THREE.BoxGeometry(230, 0.7, 1), ashMat());
    this.slab.castShadow = false; this.slab.receiveShadow = true; this.root.add(this.slab);
    const rd = rng(99);
    for (let i = 0; i < 15; i++) {
      const m = new THREE.Mesh(duneGeo(i * 3.7 + rd()), duneMat());
      m.castShadow = true; m.receiveShadow = true;
      const d = { m, x: (rd() - 0.5) * 120, z: -80 + rd() * 150, sx: 14 + rd() * 16, sy: 3.2 + rd() * 3.4, sz: 11 + rd() * 13, phase: rd() * 6.28 };
      m.scale.set(d.sx, d.sy, d.sz); m.position.set(d.x, 0, d.z); this.dunes.push(d); this.root.add(m);
    }

    // close foreground column: depth separator for the action shots
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.72, 6.4, 14), stoneMat());
    shaft.position.set(-6.4, 3.2, 18.4); shaft.castShadow = shaft.receiveShadow = true; this.foreground.add(shaft);
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 1.8), trimMat());
    base.position.set(-6.4, 0.25, 18.4); base.castShadow = base.receiveShadow = true; this.foreground.add(base);
    const broken = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.1, 8), stoneMat());
    broken.position.set(-6.4, 6.9, 18.4); broken.rotation.z = 0.16; broken.castShadow = true; this.foreground.add(broken);
    this.root.add(this.foreground);

    for (let i = 0; i < CHAR_CFG.length; i++) {
      const c = new Roman(11 + i * 7.3, TUNICS[i % TUNICS.length], CHAR_CFG[i].female, CHAR_CFG[i].cloak);
      c.group.position.set(CHAR_CFG[i].x0, 0, CHAR_CFG[i].z0); c.group.rotation.y = CHAR_CFG[i].ry;
      this.chars.push(c); this.root.add(c.group);
    }

    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0007; this.sun.shadow.normalBias = 0.03;
    const sc = this.sun.shadow.camera;
    sc.left = -90; sc.right = 90; sc.top = 90; sc.bottom = -90; sc.near = 1; sc.far = 430; sc.updateProjectionMatrix();
    this.root.add(this.sun); this.root.add(this.sun.target);
  }

    update(frame: number) {
    const f = THREE.MathUtils.clamp(frame, 0, POMPEII_FRAMES - 1);
    const { shot, u } = localU(f);
    const t = f / POMPEII_FPS;
    const look = LOOKS[shot];

    const smooth = (a: number, b: number, x: number) =>
      THREE.MathUtils.smoothstep(x, a, b);

    const mix = (a: number, b: number, x: number) =>
      THREE.MathUtils.lerp(a, b, x);

    // --------------------------------------------------
    // SKY: update the existing shader, not a replacement.
    // --------------------------------------------------
    const skyMaterial = this.sky.material as THREE.ShaderMaterial;
    const uniforms = skyMaterial.uniforms;

    uniforms.uTop.value.set(look.skyTop);
    uniforms.uHor.value.set(look.skyHor);
    uniforms.uBot.value.set(look.skyBot);
    uniforms.uSunCol.value.set(look.sunCol);

    const sunDirection = new THREE.Vector3(...look.sunDir).normalize();
    uniforms.uSunDir.value.copy(sunDirection);
       uniforms.uSun.value = look.sunI;
    uniforms.uGlow.value = look.glow;

    this.fog.color.set(look.fog);
    this.fog.near = look.fogNear;
    this.fog.far = look.fogFar;

    this.sun.color.set(look.sunCol);
    this.sun.intensity = look.sunI;
    this.sun.position.copy(this.sunTarget).addScaledVector(sunDirection, 180);
    this.sun.target.position.copy(this.sunTarget);

    this.sunSprite.position
      .copy(this.sunTarget)
      .addScaledVector(sunDirection, 260);

    // --------------------------------------------------
    // CLOUDS: warm clouds give way to the eruption storm.
    // --------------------------------------------------
    const warmCloudAmount = shot === 1 ? 1 : 0;
    const stormAmount = shot >= 2 ? 1 : 0;

    for (const p of this.softClouds) {
      const drift = t * p.speed + p.phase;
      p.s.position.x = p.x + Math.sin(drift) * 12;
      p.s.position.y = p.y + Math.sin(drift * 0.7) * 3;
      p.s.material.opacity = warmCloudAmount * 0.52;
    }

    for (const p of this.darkClouds) {
      const drift = t * p.speed + p.phase;
      p.s.position.x = p.x + Math.sin(drift) * 17;
      p.s.position.y = p.y + Math.cos(drift * 0.8) * 5;
      p.s.material.opacity = stormAmount * 0.68;
    }

    // --------------------------------------------------
    // VOLCANO PLUME: builds during the eruption sequence.
    // --------------------------------------------------
    const eruption = smooth(0.05, 0.9, u);
    const plumeAmount = shot >= 2 ? eruption : 0;

    this.craterGlow.material.opacity = plumeAmount * 0.85;
    this.craterGlow.scale.setScalar(1 + plumeAmount * 0.28);

    for (let i = 0; i < this.plume.length; i++) {
      const p = this.plume[i];
      const phase = t * p.speed + p.phase;

      p.s.position.x = p.x + Math.sin(phase) * (2 + plumeAmount * 4);
      p.s.position.y = p.y + ((phase * 2.2) % 18);
      p.s.position.z = p.z + Math.cos(phase * 0.8) * 2;

      const pulse = 0.78 + Math.sin(phase * 1.7) * 0.22;
      p.s.material.opacity = plumeAmount * pulse * 0.72;
    }

    // --------------------------------------------------
    // PYROCLASTIC SURGE: advances through the city.
    // --------------------------------------------------
    const surgeAmount =
      shot >= 4 ? smooth(0, 0.82, u) :
      shot === 3 ? smooth(0.55, 1, u) * 0.22 :
      0;

    this.surge.visible = surgeAmount > 0.001;
    this.surge.position.z = mix(-12, 18, surgeAmount);
    this.surge.scale.set(
      0.78 + surgeAmount * 0.35,
      0.78 + surgeAmount * 0.3,
      0.78 + surgeAmount * 0.5
    );

    for (const b of this.surgeBodies) {
      const pulse = 0.85 + Math.sin(t * 1.7 + b.phase) * 0.15;
      b.s.material.opacity = surgeAmount * pulse * 0.78;
      b.s.position.y = b.off + Math.sin(t * 1.3 + b.phase) * 2.5;
    }

    for (const c of this.curtains) {
      c.s.material.opacity = surgeAmount * c.op;
      c.s.visible = surgeAmount > 0.01;
    }

    for (let i = 0; i < this.surgeGlow.length; i++) {
      const g = this.surgeGlow[i];
      g.material.opacity =
        surgeAmount * (0.24 + Math.sin(t * 2.5 + i) * 0.08);
    }

    // --------------------------------------------------
    // ROMANS: fleeing during the eruption and surge.
    // --------------------------------------------------
    for (let i = 0; i < this.chars.length; i++) {
      const c = this.chars[i];
      const cfg = CHAR_CFG[i];

      const fleeing = shot >= 2;
      c.pose(t + i * 0.17, fleeing);

      if (fleeing) {
        const progress = smooth(0, 1, u);
        c.group.position.x = cfg.x0 + cfg.dx * progress * 0.5;
        c.group.position.z = cfg.z0 + Math.sin(t * 1.4 + i) * 0.45;
      } else {
        c.group.position.x = cfg.x0;
        c.group.position.z = cfg.z0;
      }
    }

    // --------------------------------------------------
    // FALLING ASH: begins as the sky darkens.
    // --------------------------------------------------
    const ashAmount = shot >= 2
      ? smooth(0.05, 0.65, u) * (shot >= 4 ? 1 : 0.72)
      : 0;

    this.ashMat.opacity = ashAmount * 0.72;

    for (let i = 0; i < this.ashPos.length / 3; i++) {
      const j = i * 3;

      this.ashPos[j + 1] -= 0.13 + (i % 7) * 0.012;
      this.ashPos[j] += Math.sin(t * 0.8 + i * 0.13) * 0.018;
      this.ashPos[j + 2] += 0.025;

      if (
        this.ashPos[j + 1] < 0 ||
        this.ashPos[j + 2] > 48
      ) {
        this.ashPos[j] = Math.sin(i * 12.989) * 42;
        this.ashPos[j + 1] = 18 + (i % 17) * 0.9;
        this.ashPos[j + 2] = -42 + (i % 19) * 4.5;
      }
    }

    this.ash.geometry.attributes.position.needsUpdate = true;

    // --------------------------------------------------
    // EMBERS: intensify near the eruption and surge.
    // --------------------------------------------------
    const emberAmount = shot >= 3
      ? smooth(0.15, 0.8, u)
      : 0;

    this.emberMat.opacity = emberAmount * 0.85;

    for (let i = 0; i < this.emberPos.length / 3; i++) {
      const j = i * 3;

      this.emberPos[j + 1] += 0.055 + (i % 5) * 0.012;
      this.emberPos[j] += Math.sin(t * 2 + i) * 0.025;
      this.emberPos[j + 2] -= 0.035;

      if (
        this.emberPos[j + 1] > 22 ||
        this.emberPos[j + 2] < -42
      ) {
        this.emberPos[j] = Math.sin(i * 7.13) * 36;
        this.emberPos[j + 1] = 0;
        this.emberPos[j + 2] = 12 + (i % 13) * 2;
      }
    }

    this.embers.geometry.attributes.position.needsUpdate = true;

    // --------------------------------------------------
    // ASH FLOOD: the final shot buries the streets.
    // --------------------------------------------------
    const burial = shot === 5 ? smooth(0.05, 0.92, u) : 0;

    this.slab.visible = burial > 0.001;
    this.slab.position.set(0, -0.3 + burial * 0.25, -10 - burial * 8);
    this.slab.scale.set(1, 1, 1 + burial * 220);

    for (const d of this.dunes) {
      const wave = Math.sin(t * 0.45 + d.phase);
      d.m.position.y = burial * (0.35 + wave * 0.22);
      d.m.scale.y = d.sy * (0.15 + burial * 0.85);
      d.m.visible = burial > 0.01;
    }

    // Keep the foreground column readable until the final burial.
    this.foreground.visible = burial < 0.96;

    // Keep the world root stable; the composition owns the camera.
  }
}

