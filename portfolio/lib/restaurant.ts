// 3D concept restaurant (burger diner) shown as a cut-away diorama.
// Loaded on demand with dynamic import() so Three.js never weighs on the first page load.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CONCEPT, PieceId } from "../constants";
import { pieceSource } from "./concept-art";
import { gsap } from "./motion";

export interface ScreenPoint {
  id: PieceId;
  x: number;
  y: number;
  visible: boolean;
}

export interface RestaurantAPI {
  focus: (id: PieceId | null) => void;
  dispose: () => void;
}

const C = CONCEPT.colors;

const ANCHORS: Record<string, [number, number, number]> = {
  sign: [-1.6, 4.15, -3.85],
  menuBoard: [2.4, 2.35, -3.85],
  placemat: [-2.75, 0.8, -0.55],
  tent: [-2.25, 0.98, -0.85],
  carta: [0.35, 0.8, 1.35],
  box: [1.55, 1.36, -2.8],
  bag: [2.55, 1.45, -2.85],
  cup: [3.35, 1.32, -2.72],
};
const OFFSETS: Record<string, [number, number, number]> = {
  sign: [0.8, 0.1, 4.6],
  menuBoard: [0.2, 0.05, 3.6],
  placemat: [1.0, 1.7, 1.5],
  tent: [1.0, 0.45, 1.5],
  carta: [0.7, 1.5, 1.2],
  box: [0.9, 0.55, 1.7],
  bag: [1.0, 0.45, 1.6],
  cup: [1.0, 0.3, 1.4],
};
const OVERVIEW = { pos: new THREE.Vector3(8.2, 6.4, 10.2), target: new THREE.Vector3(0, 1.3, -1.2) };

export const createRestaurant = async (
  container: HTMLElement,
  opts: { reduced: boolean; onFrame: (pts: ScreenPoint[]) => void }
): Promise<RestaurantAPI> => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;touch-action:none";

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0B0D10");
  scene.fog = new THREE.Fog("#0B0D10", 18, 34);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.copy(OVERVIEW.pos);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(OVERVIEW.target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 1.4;
  controls.maxDistance = 18;
  controls.maxPolarAngle = 1.38;
  controls.autoRotate = !opts.reduced;
  controls.autoRotateSpeed = 0.35;

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x1a1410, 0.85));
  const sun = new THREE.DirectionalLight(0xffe2b8, 1.9);
  sun.position.set(6, 11, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const neon = new THREE.PointLight(0xf2a71b, 7, 7, 1.6);
  neon.position.set(-1.6, 3.6, -3.2);
  scene.add(neon);
  const counterLight = new THREE.PointLight(0xffd7a0, 4, 5, 1.6);
  counterLight.position.set(2.4, 2.6, -2.2);
  scene.add(counterLight);

  // ---------- helpers ----------
  const textures: THREE.Texture[] = [];
  const tex = async (id: PieceId) => {
    const src = await pieceSource(id);
    const t = src instanceof HTMLCanvasElement ? new THREE.CanvasTexture(src) : new THREE.Texture(src);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    t.needsUpdate = true;
    textures.push(t);
    return t;
  };
  const mat = (color: string, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.02, ...extra });
  const add = (geo: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], pos: [number, number, number], parent: THREE.Object3D = scene, shadow = true) => {
    const m = new THREE.Mesh(geo, material);
    m.position.set(...pos);
    m.castShadow = shadow;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const printed = (map: THREE.Texture, glow = 0) =>
    new THREE.MeshStandardMaterial({ map, roughness: 0.65, emissive: glow ? new THREE.Color(0xffffff) : new THREE.Color(0x000000), emissiveMap: glow ? map : null, emissiveIntensity: glow });

  const [tSign, tMenu, tPlacemat, tTent, tCarta, tBox, tBag, tCup] = await Promise.all(
    (["sign", "menuBoard", "placemat", "tent", "carta", "box", "bag", "cup"] as PieceId[]).map(tex)
  );

  // ---------- room ----------
  const checker = document.createElement("canvas");
  checker.width = checker.height = 256;
  const cx = checker.getContext("2d")!;
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    cx.fillStyle = (x + y) % 2 ? "#1E1B18" : "#EFE6D6";
    cx.fillRect(x * 64, y * 64, 64, 64);
  }
  const floorTex = new THREE.CanvasTexture(checker);
  floorTex.colorSpace = THREE.SRGBColorSpace;
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(5, 4);
  textures.push(floorTex);
  add(new THREE.BoxGeometry(10.4, 0.2, 8.4), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.55 }), [0, -0.1, 0], scene, false);

  const wall = mat("#F3E7D3");
  const red = mat(C.red);
  add(new THREE.BoxGeometry(10.4, 3.4, 0.2), wall, [0, 1.7, -4.1]);
  add(new THREE.BoxGeometry(10.4, 1.0, 0.24), red, [0, 0.5, -4.08]);
  add(new THREE.BoxGeometry(0.2, 3.4, 8.4), wall, [-5.1, 1.7, 0]);
  add(new THREE.BoxGeometry(0.24, 1.0, 8.4), red, [-5.08, 0.5, 0]);
  // window on the side wall
  add(new THREE.BoxGeometry(0.06, 1.2, 2.4), new THREE.MeshStandardMaterial({ color: "#9CC9E8", emissive: "#3B6E8F", emissiveIntensity: 0.6, roughness: 0.1 }), [-4.97, 2.0, 0.6], scene, false);

  // ---------- exterior roof sign ----------
  add(new THREE.BoxGeometry(4.6, 1.45, 0.3), mat(C.ink), [-1.6, 4.15, -4.1]);
  add(new THREE.PlaneGeometry(4.4, 1.32), printed(tSign, 0.55), [-1.6, 4.15, -3.94], scene, false);
  [-3.2, 0].forEach((x) => add(new THREE.BoxGeometry(0.12, 0.8, 0.12), mat(C.ink), [x, 3.3, -4.1]));

  // ---------- counter + menu screen ----------
  add(new THREE.BoxGeometry(3.8, 1.05, 0.95), red, [2.4, 0.525, -2.9]);
  add(new THREE.BoxGeometry(4.0, 0.08, 1.1), mat("#2A2522", { roughness: 0.4 }), [2.4, 1.09, -2.9]);
  add(new THREE.BoxGeometry(3.3, 1.95, 0.08), mat(C.ink), [2.4, 2.35, -3.98]);
  add(new THREE.PlaneGeometry(3.12, 1.76), printed(tMenu, 0.7), [2.4, 2.35, -3.93], scene, false);

  // burger box (kraft, logo on top and sides)
  const kraft = mat(C.kraft);
  const boxMat = printed(tBox);
  add(new THREE.BoxGeometry(0.44, 0.44, 0.44), [boxMat, boxMat, boxMat, kraft, boxMat, boxMat], [1.55, 1.35, -2.8]).rotation.y = -0.35;
  // takeaway bag
  const bagMat = printed(tBag);
  const bag = add(new THREE.BoxGeometry(0.44, 0.6, 0.26), [kraft, kraft, kraft, kraft, bagMat, bagMat], [2.55, 1.43, -2.85]);
  bag.rotation.y = -0.15;
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.012, 8, 24, Math.PI), mat(C.kraft));
  handle.position.set(0, 0.3, 0);
  bag.add(handle);
  // cup with wrapped label, lid and straw
  const cupGroup = new THREE.Group();
  cupGroup.position.set(3.35, 1.13, -2.72);
  scene.add(cupGroup);
  add(new THREE.CylinderGeometry(0.12, 0.09, 0.34, 40, 1, true), new THREE.MeshStandardMaterial({ map: tCup, roughness: 0.6, side: THREE.DoubleSide }), [0, 0.17, 0], cupGroup);
  add(new THREE.CylinderGeometry(0.125, 0.125, 0.025, 40), mat("#F5F1EA"), [0, 0.35, 0], cupGroup);
  add(new THREE.CylinderGeometry(0.009, 0.009, 0.28, 8), mat(C.red), [0.03, 0.47, 0], cupGroup).rotation.z = -0.15;

  // ---------- tables ----------
  const table = (x: number, z: number) => {
    add(new THREE.CylinderGeometry(0.8, 0.8, 0.06, 48), mat("#F7F1E6", { roughness: 0.5 }), [x, 0.75, z]);
    add(new THREE.CylinderGeometry(0.06, 0.06, 0.72, 16), mat("#2A2522", { metalness: 0.5, roughness: 0.4 }), [x, 0.37, z]);
    add(new THREE.CylinderGeometry(0.32, 0.36, 0.04, 32), mat("#2A2522", { metalness: 0.5, roughness: 0.4 }), [x, 0.02, z]);
    [[-1.05, 0], [1.05, 0]].forEach(([dx, dz]) => {
      add(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 32), red, [x + dx, 0.5, z + dz]);
      add(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12), mat("#2A2522", { metalness: 0.5 }), [x + dx, 0.23, z + dz]);
    });
  };
  table(-2.75, -0.55);
  table(0.35, 1.35);

  // placemat + plate with a little burger
  const pm = add(new THREE.PlaneGeometry(0.78, 0.56), printed(tPlacemat), [-2.75, 0.785, -0.45], scene, false);
  pm.rotation.x = -Math.PI / 2;
  pm.rotation.z = 0.12;
  add(new THREE.CylinderGeometry(0.2, 0.18, 0.02, 32), mat("#FFFFFF", { roughness: 0.3 }), [-2.78, 0.8, -0.42]);
  const b = new THREE.Group();
  b.position.set(-2.78, 0.81, -0.42);
  scene.add(b);
  add(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 24), mat(C.mustard), [0, 0.02, 0], b);
  add(new THREE.CylinderGeometry(0.115, 0.115, 0.035, 24), mat("#5A2E1A"), [0, 0.055, 0], b);
  add(new THREE.CylinderGeometry(0.118, 0.118, 0.01, 4), mat("#FFC93C"), [0, 0.078, 0], b);
  add(new THREE.SphereGeometry(0.115, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat(C.mustard), [0, 0.085, 0], b);

  // table tent (A-frame)
  const tent = new THREE.Group();
  tent.position.set(-2.25, 0.78, -0.85);
  tent.rotation.y = 0.5;
  scene.add(tent);
  const tentMat = new THREE.MeshStandardMaterial({ map: tTent, roughness: 0.6, side: THREE.DoubleSide });
  const f1 = add(new THREE.PlaneGeometry(0.2, 0.26), tentMat, [0, 0.125, 0.035], tent);
  f1.rotation.x = -0.27;
  const f2 = add(new THREE.PlaneGeometry(0.2, 0.26), tentMat, [0, 0.125, -0.035], tent);
  f2.rotation.x = 0.27;
  f2.rotation.y = Math.PI;

  // printed menu on the second table
  const carta = add(new THREE.PlaneGeometry(0.4, 0.55), printed(tCarta), [0.35, 0.785, 1.35], scene, false);
  carta.rotation.x = -Math.PI / 2;
  carta.rotation.z = -0.35;

  // ---------- hotspots ----------
  const ids = CONCEPT.hotspots.map((h) => h.id);
  const anchors = ids.map((id) => new THREE.Vector3(...(ANCHORS[id] || [0, 0, 0])));
  const v = new THREE.Vector3();

  let W = 1, H = 1;
  const resize = () => {
    W = container.clientWidth || 1;
    H = container.clientHeight || 1;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    // pull the camera back on narrow screens so the whole diorama fits
    camera.fov = W / H < 0.8 ? 52 : 36;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  let focused: PieceId | null = null;
  const stopAuto = () => (controls.autoRotate = false);
  controls.addEventListener("start", stopAuto);

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
    opts.onFrame(
      anchors.map((a, i) => {
        v.copy(a).project(camera);
        return { id: ids[i], x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H, visible: v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05 };
      })
    );
  });

  const goTo = (pos: THREE.Vector3, target: THREE.Vector3) => {
    gsap.killTweensOf([camera.position, controls.target]);
    if (opts.reduced) {
      camera.position.copy(pos);
      controls.target.copy(target);
      return;
    }
    gsap.to(camera.position, { x: pos.x, y: pos.y, z: pos.z, duration: 1.6, ease: "power3.inOut" });
    gsap.to(controls.target, { x: target.x, y: target.y, z: target.z, duration: 1.6, ease: "power3.inOut" });
  };

  // gentle entrance: start further out and glide in
  if (!opts.reduced) {
    camera.position.set(13, 9, 15);
    goTo(OVERVIEW.pos, OVERVIEW.target);
  }

  return {
    focus: (id) => {
      focused = id;
      if (!id) {
        controls.autoRotate = !opts.reduced;
        goTo(OVERVIEW.pos, OVERVIEW.target);
        return;
      }
      controls.autoRotate = false;
      const a = new THREE.Vector3(...ANCHORS[id]);
      const o = OFFSETS[id] || [1, 1, 1.5];
      goTo(new THREE.Vector3(a.x + o[0], a.y + o[1], a.z + o[2]), a);
    },
    dispose: () => {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      controls.removeEventListener("start", stopAuto);
      controls.dispose();
      gsap.killTweensOf([camera.position, controls.target]);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mm = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mm)) mm.forEach((x) => x.dispose());
        else mm?.dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      void focused;
    },
  };
};
