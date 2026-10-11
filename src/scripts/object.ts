import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export type MarkId = 'zanaat' | 'lonca' | 'baron';

/** Cubelets per edge: the approved comp's block is four by four by four. */
const N = 4;
/** One cubelet in world units; the whole block is N * CELL across. */
const CELL = 0.4;
const EDGE = N * CELL;

/** A cubelet's finish: brushed metal, a fine perforated metal, or a near-matte dark one. */
type Finish = 'brushed' | 'dotted' | 'matte';
/** Finish letter plus a tone from 1 (near black) to 5 (light graphite). */
type Code = `${'b' | 'd' | 'm'}${1 | 2 | 3 | 4 | 5}`;

/**
 * The two faces the approved comp shows, read cubelet by cubelet, rows top to bottom. The left face
 * (z = 3) lists x = 0..2, the right face (x = 3) lists z = 2..0; the near corner column between them
 * is CORNER. The block is half-turn symmetric, so the two faces behind repeat these and the visitor
 * meets the comp's view twice in a full turn.
 */
const LEFT: Code[][] = [
  ['b3', 'm2', 'b2'],
  ['d3', 'm1', 'b4'],
  ['d3', 'b4', 'm2'],
  ['d3', 'b4', 'm2'],
];
const RIGHT: Code[][] = [
  ['d3', 'b5', 'd4'],
  ['m1', 'b5', 'd4'],
  ['b4', 'm2', 'b3'],
  ['d4', 'm2', 'b4'],
];
/** The near corner, top to bottom: missing, silver, missing, silver. */
const CORNER: ('silver' | null)[] = [null, 'silver', null, 'silver'];
const TOPS: Code[] = ['b2', 'd3', 'm2', 'b3', 'd2'];

const FINISH: Record<string, Finish> = { b: 'brushed', d: 'dotted', m: 'matte' };
const TONE = [0, 0.15, 0.19, 0.24, 0.29, 0.35];

/** A small deterministic hash, so every visitor sees the same block. */
function hash(a: number, b: number, c: number) {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** What sits at a cell: a code, silver, or nothing (a corner piece taken out). */
function cellAt(x: number, y: number, z: number): Code | 'silver' | null {
  const row = N - 1 - y;
  const last = N - 1;
  if ((x === last && z === last) || (x === 0 && z === 0)) return CORNER[row];
  if (z === last) return LEFT[row][x];
  if (x === last) return RIGHT[row][last - 1 - z];
  // Half a turn round: (x, y, z) shows what (3 - x, y, 3 - z) shows.
  if (z === 0) return LEFT[row][last - x];
  if (x === 0) return RIGHT[row][z - 1];
  return TOPS[Math.floor(hash(x, y, z) * TOPS.length)];
}

function canvasTexture(draw: (g: CanvasRenderingContext2D, s: number) => void, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  if (g) draw(g, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

/** Fine vertical streaks, as on the comp's brushed pieces. */
function brushedTexture() {
  return canvasTexture((g, s) => {
    const rnd = seeded(7);
    for (let x = 0; x < s; x++) {
      const v = 165 + Math.floor(rnd() * 50);
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.fillRect(x, 0, 1, s);
    }
    for (let i = 0; i < 220; i++) {
      const v = 120 + Math.floor(rnd() * 120);
      g.fillStyle = `rgba(${v},${v},${v},0.45)`;
      g.fillRect(rnd() * s, rnd() * s, 1, 30 + rnd() * 140);
    }
  }, 512);
}

/** A tight grid of small pits: the comp's perforated pieces. */
function dottedTexture() {
  return canvasTexture((g, s) => {
    g.fillStyle = '#c8c8c8';
    g.fillRect(0, 0, s, s);
    const n = 16;
    const step = s / n;
    g.fillStyle = '#3a3a3a';
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        g.beginPath();
        g.arc((i + 0.5 + (j % 2) * 0.5) * step, (j + 0.5) * step, step * 0.28, 0, Math.PI * 2);
        g.fill();
      }
  }, 512);
}

function makeMaterials(env: THREE.Texture) {
  const brushed = brushedTexture();
  const dotted = dottedTexture();
  // Instance colours carry each cubelet's tone; material colours stay white so they multiply cleanly.
  // Part-metal, not mirror-metal: the pieces keep their tone from any side instead of going black
  // whenever they face away from a light.
  return {
    brushed: new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0.5, roughness: 0.5, roughnessMap: brushed, bumpMap: brushed, bumpScale: 0.04,
      // The highlight stretches along the brushing, as on machined metal.
      anisotropy: 0.8, anisotropyRotation: Math.PI / 2,
    }),
    dotted: new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.45, roughness: 0.6, map: dotted, bumpMap: dotted, bumpScale: 0.12 }),
    matte: new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.72 }),
    // Its own, stronger studio reflection: the comp's bright pieces flare where the rest only glints.
    silver: new THREE.MeshPhysicalMaterial({ color: 0xc8cace, metalness: 1, roughness: 0.1, envMap: env, envMapIntensity: 2 }),
    core: new THREE.MeshBasicMaterial({ color: 0x000000 }),
  };
}

/**
 * A dark studio, used for reflections: a soft key overhead and a ring of tall softboxes all the way
 * round, so whichever way the block is turned its faces and its silver have something to mirror.
 */
function studioEnvironment(renderer: THREE.WebGLRenderer) {
  const room = new THREE.Scene();
  room.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x030304, side: THREE.BackSide })));
  // Each softbox brightens toward its foot, so a flat silver face mirrors a gradient, not a white sheet.
  const falloff = canvasTexture((g, s) => {
    const r = g.createLinearGradient(0, 0, 0, s);
    r.addColorStop(0, '#2a2a2a');
    r.addColorStop(0.55, '#9a9a9a');
    r.addColorStop(1, '#ffffff');
    g.fillStyle = r;
    g.fillRect(0, 0, s, s);
  }, 64);
  const panel = (w: number, h: number, intensity: number, pos: [number, number, number]) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(intensity), map: falloff, side: THREE.DoubleSide }),
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    room.add(m);
  };
  panel(10, 6, 2, [2, 12, -2]);
  // One narrow, hot strip high on the front left: the comp's silver flares on its left face and
  // carries a graded sheen on its right.
  panel(1.5, 6, 6, [-7, 4, 9]);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    panel(3.2, 9, i % 2 ? 0.6 : 1.1, [Math.sin(a) * 12, 0.5, Math.cos(a) * 12]);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(room, 0.04).texture;
  pmrem.dispose();
  return texture;
}

/**
 * The pieces taken out of the corners leave pockets. Light does not reach far into a pocket, so its
 * walls darken with depth, as in the comp; without this a pocket reads as flat face, not as a hole.
 * Faces turned to the floor darken too.
 */
function shadePockets(material: THREE.Material) {
  const half = (N - 1) / 2;
  const pockets: THREE.Vector4[] = [];
  for (let x = 0; x < N; x += N - 1)
    for (let z = 0; z < N; z += N - 1)
      for (let y = 0; y < N; y++)
        if (cellAt(x, y, z) === null) pockets.push(new THREE.Vector4((x - half) * CELL, (y - half) * CELL, (z - half) * CELL, y === N - 1 ? 1 : 0));
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPockets = { value: pockets };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBlock;')
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n#ifdef USE_INSTANCING\nvBlock = (instanceMatrix * vec4(transformed, 1.0)).xyz;\n#else\nvBlock = transformed;\n#endif',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vBlock;\nuniform vec4 uPockets[${pockets.length}];`)
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float shade = 1.0;
        for (int i = 0; i < ${pockets.length}; i++) {
          vec3 d = vBlock - uPockets[i].xyz;
          if (max(max(abs(d.x), abs(d.y)), abs(d.z)) > ${(CELL * 0.53).toFixed(3)}) continue;
          // Depth from the open sides: the two outward faces of the corner, and the top for a top pocket.
          float s = sign(uPockets[i].x);
          float depth = min(${(CELL / 2).toFixed(3)} - s * d.x, ${(CELL / 2).toFixed(3)} - s * d.z);
          if (uPockets[i].w > 0.5) depth = min(depth, ${(CELL / 2).toFixed(3)} - d.y);
          shade = min(shade, 1.0 - 0.8 * smoothstep(0.0, ${(CELL * 0.85).toFixed(3)}, depth + ${(CELL * 0.12).toFixed(3)}));
        }
        // Whatever faces the floor is in the block's own shadow: the underside and the seams' lower lips.
        vec3 normalW = inverseTransformDirection(normal, viewMatrix);
        shade *= mix(1.0, 0.34, smoothstep(-0.25, -0.75, normalW.y));
        gl_FragColor.rgb *= shade;`,
      );
  };
  return material;
}

/** The block as instanced cubelets around a black core, centred on the origin. */
function buildBlock(materials: ReturnType<typeof makeMaterials>) {
  // Small machined bevels that catch the light, and hairline seams, as the comp's pieces have.
  const geo = new RoundedBoxGeometry(CELL * 0.975, CELL * 0.975, CELL * 0.975, 4, CELL * 0.045);
  const half = (N - 1) / 2;
  type Slot = { m: THREE.Matrix4; c?: THREE.Color };
  const slots: Record<Finish | 'silver', Slot[]> = { brushed: [], dotted: [], matte: [], silver: [] };
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++)
      for (let z = 0; z < N; z++) {
        const outer = x === 0 || y === 0 || z === 0 || x === N - 1 || y === N - 1 || z === N - 1;
        if (!outer) continue;
        const cell = cellAt(x, y, z);
        if (!cell) continue;
        const m = new THREE.Matrix4().makeTranslation((x - half) * CELL, (y - half) * CELL, (z - half) * CELL);
        if (cell === 'silver') {
          slots.silver.push({ m });
          continue;
        }
        const tone = TONE[Number(cell[1])] * (0.94 + hash(x, y, z) * 0.12);
        slots[FINISH[cell[0]]].push({ m, c: new THREE.Color().setRGB(tone, tone * 1.01, tone * 1.03, THREE.SRGBColorSpace) });
      }
  const group = new THREE.Group();
  for (const [name, list] of Object.entries(slots) as [Finish | 'silver', Slot[]][]) {
    const mesh = new THREE.InstancedMesh(geo, shadePockets(materials[name]), list.length);
    list.forEach(({ m, c }, i) => {
      mesh.setMatrixAt(i, m);
      if (c) mesh.setColorAt(i, c);
    });
    group.add(mesh);
  }
  // The seams look into black, not into lit metal. The core stays inside the outer layer, so a
  // missing corner piece shows its neighbours' faces rather than a black cube.
  const core = CELL * (N - 2) + CELL * 0.1;
  group.add(new THREE.Mesh(new THREE.BoxGeometry(core, core, core), materials.core));
  return group;
}

const FOG_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
// The beam and the haze it lights, in screen space where the comp has them: a cone from the top
// right down onto the block, and wisps of smoke drifting slowly through it.
const FOG_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uAspect;
  varying vec2 vUv;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
    return v;
  }
  void main() {
    vec2 uv = vUv;
    // The cone: its edges, measured off the comp, run from the top of the hero to the floor.
    float t = clamp((uv.y - 0.42) / 0.58, 0.0, 1.0);
    float left = mix(0.46, 0.604, t);
    float right = mix(0.752, 0.793, t);
    float cone = smoothstep(left - 0.035, left + 0.045, uv.x) * (1.0 - smoothstep(right - 0.06, right + 0.035, uv.x));
    cone *= smoothstep(0.3, 0.62, uv.y) * (0.55 + 0.45 * t);
    // The lit air round the block, brightest to its right.
    vec2 d = (uv - vec2(0.56, 0.66)) * vec2(uAspect, 1.0);
    float halo = exp(-dot(d, d) * 5.0);
    vec2 q = vec2(uv.x * uAspect, uv.y) * 6.0;
    // It rises through the light at roughly 20px a second, and the warp itself drifts, so the wisps
    // curl and change shape instead of sliding past as a fixed texture.
    float smoke = fbm(q - vec2(uTime * 0.05, uTime * 0.22));
    smoke = fbm(q * 1.4 + smoke * 1.8 + vec2(uTime * 0.07, -uTime * 0.16));
    float wisps = 0.78 + 0.38 * smoothstep(0.3, 0.8, smoke);
    // Where the beam meets the floor it lights a line of it, and the glossy floor throws the beam
    // back down as a long vertical streak, behind the copy, as in the comp.
    float floorLine = exp(-pow((uv.y - 0.425) / 0.018, 2.0)) * smoothstep(0.42, 0.55, uv.x) * (1.0 - smoothstep(0.7, 0.8, uv.x));
    float below = clamp((0.43 - uv.y) / 0.3, 0.0, 1.0);
    float streakX = (uv.x - (0.632 + below * 0.012)) / (0.042 + below * 0.03);
    float streaks = 0.8 + 0.4 * noise(vec2(uv.x * 70.0, uv.y * 3.0 - uTime * 0.06));
    // It fades in across the floor line rather than starting on it, so there is no seam.
    float mirror = exp(-streakX * streakX) * smoothstep(0.455, 0.39, uv.y) * pow(1.0 - below, 1.6) * streaks;
    // The comp's smoke also hangs, faintly, in the air left of the beam, behind the nav and the block.
    float wash = exp(-pow((uv.x - 0.42) / 0.2, 2.0)) * smoothstep(0.35, 0.9, uv.y);
    float a = (cone * 0.42 + halo * 0.26 + wash * 0.28) * wisps + floorLine * 0.22 + mirror * 0.26;
    vec3 col = mix(vec3(0.4, 0.52, 0.61), vec3(0.82, 0.88, 0.94), max(cone, max(mirror, floorLine)));
    gl_FragColor = vec4(col * a, a);
  }
`;

export interface ObjectScene {
  dispose(): void;
}

/** The pose the comp shows: a corner toward the viewer, the left face a touch wider than the right. */
const POSE = { x: 0, y: -Math.PI / 4 + 0.02 };

export function createObject(canvas: HTMLCanvasElement, opts: { still: boolean; onReady?: () => void }): ObjectScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.autoClear = false;

  const scene = new THREE.Scene();
  const env = studioEnvironment(renderer);
  scene.environment = env;
  scene.environmentIntensity = 0.9;

  const camera = new THREE.PerspectiveCamera(13.5, 1, 0.1, 100);
  // The floor, its shadow and the haze are drawn first, by a second eye (see resize); the block is
  // drawn over them. Layer 1 holds what only that eye sees.
  const floorCamera = new THREE.PerspectiveCamera(13.5, 1, 0.1, 100);
  floorCamera.layers.set(1);

  const materials = makeMaterials(env);
  const block = buildBlock(materials);
  const pivot = new THREE.Group();
  pivot.add(block);
  pivot.rotation.set(POSE.x, POSE.y, 0);
  scene.add(pivot);

  // The beam and its haze are drawn by the page, in the comp's screen places. This spot is the
  // beam's light on the metal, high on the right and a little behind.
  const spot = new THREE.SpotLight(0xf1f4f8, 520, 0, 0.2, 0.85, 1.6);
  spot.position.set(EDGE * 3.4, EDGE * 6, EDGE * 0.6);
  spot.target.position.set(0, -EDGE / 2, 0);
  scene.add(spot, spot.target);

  // The floor: a pool of light where the beam lands, and on it the block's shadow.
  const floorY = -EDGE / 2 - EDGE * 0.42;
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(EDGE * 3.6, EDGE * 3.6),
    new THREE.MeshBasicMaterial({
      map: canvasTexture((g, s) => {
        const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        r.addColorStop(0, 'rgba(205,216,228,0.62)');
        r.addColorStop(0.45, 'rgba(170,184,198,0.36)');
        r.addColorStop(0.75, 'rgba(120,134,148,0.12)');
        r.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = r;
        g.fillRect(0, 0, s, s);
      }),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = floorY;
  pool.renderOrder = 1;
  pool.layers.set(1);
  // The block's shadow: a square of soft dark, the block's own footprint blurred as an overhead light
  // would leave it, turning with the block and spreading as it floats up.
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(EDGE * 2.6, EDGE * 2.6),
    new THREE.MeshBasicMaterial({
      map: canvasTexture((g, s) => {
        g.filter = `blur(${s * 0.07}px)`;
        g.fillStyle = 'rgba(0,0,0,0.92)';
        g.fillRect(s * 0.27, s * 0.27, s * 0.46, s * 0.46);
        g.filter = `blur(${s * 0.12}px)`;
        g.fillStyle = 'rgba(0,0,0,0.5)';
        g.fillRect(s * 0.22, s * 0.22, s * 0.56, s * 0.56);
      }, 256),
      transparent: true,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = floorY + 0.001;
  shadow.renderOrder = 2;
  shadow.layers.set(1);
  scene.add(pool, shadow);

  const fogMat = new THREE.ShaderMaterial({
    vertexShader: FOG_VERTEX,
    fragmentShader: FOG_FRAGMENT,
    uniforms: { uTime: { value: 0 }, uAspect: { value: 1 } },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
  });
  const fog = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fogMat);
  fog.frustumCulled = false;
  fog.renderOrder = 0;
  fog.layers.set(1);
  scene.add(fog);
  // The camera never moves, so a soft light from beside it keeps whatever face is turned to the
  // viewer readable; the beam only adds the highlight on top.
  const front = new THREE.DirectionalLight(0xe8edf3, 1.6);
  front.position.set(4, 3, 10);
  const fill = new THREE.DirectionalLight(0xe8edf3, 2.1);
  fill.position.set(-6, 0.5, 8);
  scene.add(front, fill, new THREE.HemisphereLight(0xcfd6df, 0x050506, 0.35));

  // Measured off the comp: the eye is far off and about nine degrees below the block, looking level
  // through a shifted lens, so the verticals stay upright, every horizontal edge falls away from the
  // near corner, a sliver of the underside shows and the top-corner pocket notches the silhouette.
  // That is what makes a true cube look as tall as the comp's. The shift puts it in the comp's place.
  const eye = new THREE.Vector3(0, -EDGE * 2.2, EDGE * 14.4);
  // The floor can't be seen from below it, so a second eye, the same distance off and a few degrees
  // above the floor, draws the floor and the block's shadow where the comp has its pool of light.
  const floorEye = new THREE.Vector3(0, floorY + EDGE * 14.4 * Math.sin(0.12), EDGE * 14.4 * Math.cos(0.12));
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.copy(eye);
    camera.lookAt(0, eye.y, 0);
    // On a narrow stage the block would shrink to a thumbnail; both eyes zoom together so the floor
    // stays under it.
    const zoom = w / h < 1.4 ? Math.min(1.45, 1.79 / (w / h)) : 1;
    camera.zoom = zoom;
    floorCamera.zoom = zoom;
    // Zoom scales about the frame's centre, so the lens shift grows with it to keep the block at 16% above
    // centre, and the floor drops to stay just under the block's now larger foot.
    camera.setViewOffset(w, h, 0, -h * (0.474 + 0.633 * (zoom - 1)), w, h);
    camera.updateProjectionMatrix();
    floorCamera.aspect = w / h;
    floorCamera.position.copy(floorEye);
    floorCamera.lookAt(0, floorY, 0);
    floorCamera.setViewOffset(w, h, 0, -h * (0.07 + 0.18 * (zoom - 1)), w, h);
    floorCamera.updateProjectionMatrix();
    fogMat.uniforms.uAspect.value = w / h;
  }

  // Drag turns the block; it keeps a little momentum and then settles back into a slow idle turn.
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let velocity = 0;
  // It holds the comp's pose for a moment before it starts to turn.
  let idleAt = performance.now() + 4000;
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    velocity = 0;
    canvas.setPointerCapture(e.pointerId);
    canvas.dataset.dragging = '';
    wake();
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    pivot.rotation.y += dx * 0.009;
    pivot.rotation.x = THREE.MathUtils.clamp(pivot.rotation.x + dy * 0.005, -0.35, 0.5);
    velocity = dx * 0.009;
    wake();
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    idleAt = performance.now() + 2200;
    delete canvas.dataset.dragging;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  };
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowLeft' ? -0.25 : e.key === 'ArrowRight' ? 0.25 : 0;
    if (!step) return;
    e.preventDefault();
    velocity = step * 0.35;
    idleAt = performance.now() + 2200;
    wake();
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('keydown', onKey);

  let raf = 0;
  let visible = true;
  let last = performance.now();
  let ready = false;
  function frame(now: number) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!dragging) {
      if (Math.abs(velocity) > 0.0002) {
        pivot.rotation.y += velocity;
        velocity *= opts.still ? 0 : 0.94;
      } else if (!opts.still && now > idleAt) pivot.rotation.y += dt * 0.12;
      pivot.rotation.x += (POSE.x - pivot.rotation.x) * Math.min(dt * 1.5, 1);
    }
    // A slow float; the shadow tightens and loosens with it.
    if (!opts.still) {
      block.position.y = Math.sin(now / 1700) * CELL * 0.08;
      fogMat.uniforms.uTime.value = now / 1000;
    }
    shadow.rotation.z = pivot.rotation.y;
    const lift = (block.position.y / (CELL * 0.08) + 1) / 2;
    shadow.scale.setScalar(1 + lift * 0.06);
    (shadow.material as THREE.MeshBasicMaterial).opacity = 0.95 - lift * 0.12;
    renderer.clear();
    renderer.render(scene, floorCamera);
    renderer.clearDepth();
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
    const moving = dragging || Math.abs(velocity) > 0.0002 || !opts.still;
    if (visible && moving) wake();
  }
  function wake() {
    if (!raf && visible) raf = requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(() => {
    resize();
    wake();
  });
  ro.observe(canvas);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && !document.hidden;
    if (visible) {
      last = performance.now();
      wake();
    }
  });
  io.observe(canvas);
  const onVisibility = () => {
    visible = !document.hidden;
    if (visible) {
      last = performance.now();
      wake();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);
  resize();
  wake();

  return {
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      env.dispose();
      renderer.dispose();
    },
  };
}

/** Renders the block once, in the same metal and studio, for a project card; the comp shows the same view on both. */
export function renderThumb(_id: MarkId, px: number): string {
  const canvas = document.createElement('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(px, px, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  const env = studioEnvironment(renderer);
  scene.environment = env;
  scene.environmentIntensity = 0.95;
  const block = buildBlock(makeMaterials(env));
  block.rotation.set(0.08, POSE.y, 0);
  scene.add(block);
  const spot = new THREE.SpotLight(0xf1f4f8, 160, 0, 0.5, 0.8, 1.6);
  spot.position.set(EDGE * 1.6, EDGE * 3.4, EDGE * 0.4);
  const front = new THREE.DirectionalLight(0xe8edf3, 1.8);
  front.position.set(-3, 3, 10);
  scene.add(spot, front, new THREE.HemisphereLight(0xcfd6df, 0x050506, 0.4));
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  const dist = ((EDGE * 1.5) / 2 / Math.tan(THREE.MathUtils.degToRad(13))) * 1.08;
  camera.position.set(0, dist * 0.22, dist);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  const url = canvas.toDataURL('image/png');
  env.dispose();
  renderer.dispose();
  renderer.forceContextLoss();
  return url;
}
