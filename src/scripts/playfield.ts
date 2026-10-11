import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { type Cell, cellsOf, MARKS, type MarkId, matches, sizeOf } from '../lib/marks';

const COLS = 10;
const ROWS = 7;
const CUBE = 0.88;
const TILE_TOP = 0.06;
const PAPER = 0xe9e6df;
const TILE = 0x1b1e21;
const BASE = 0x0e1013;

export interface PlayfieldEvents {
  onMoves(moves: number): void;
  onLocked(mark: MarkId): void;
  onUnlocked(): void;
}

interface Block {
  mesh: THREE.Mesh;
  col: number;
  row: number;
}

type Tween = { start: number; dur: number; step: (t: number) => void; done?: () => void };

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const cellKey = (c: number, r: number) => `${c},${r}`;

/** Where a mark sits when the game places it: centred on the board. */
function anchorFor(id: MarkId): { col: number; row: number } {
  const { cols, rows } = sizeOf(MARKS[id]);
  return { col: Math.floor((COLS - cols) / 2), row: Math.floor((ROWS - rows) / 2) };
}

function worldOf(col: number, row: number): THREE.Vector3 {
  return new THREE.Vector3(col - COLS / 2 + 0.5, TILE_TOP + CUBE / 2, row - ROWS / 2 + 0.5);
}

export function createPlayfield(canvas: HTMLCanvasElement, events: PlayfieldEvents, still: boolean) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22.5, 1, 0.1, 200);

  // One soft light from overhead, a little to the back-left, plus a cool sky fill: the comp's lighting.
  scene.add(new THREE.HemisphereLight(0xdfe6ee, 0x0b0d10, 0.55));
  const sun = new THREE.DirectionalLight(0xfff1e0, 2.6);
  sun.position.set(-6, 10, -2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.radius = 6;
  sun.shadow.bias = -0.0005;
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
  scene.add(sun);

  const field = new THREE.Group();
  field.rotation.y = -0.72;
  scene.add(field);

  const base = new THREE.Mesh(
    new RoundedBoxGeometry(COLS + 0.3, 0.3, ROWS + 0.3, 2, 0.08),
    new THREE.MeshStandardMaterial({ color: BASE, roughness: 0.95 }),
  );
  base.position.y = -0.16;
  base.receiveShadow = true;
  field.add(base);

  const tileGeo = new RoundedBoxGeometry(0.94, 0.12, 0.94, 3, 0.05);
  const tileMat = new THREE.MeshStandardMaterial({ color: TILE, roughness: 0.88 });
  const tiles = new THREE.InstancedMesh(tileGeo, tileMat, COLS * ROWS);
  tiles.receiveShadow = true;
  const m = new THREE.Matrix4();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      m.setPosition(c - COLS / 2 + 0.5, 0, r - ROWS / 2 + 0.5);
      tiles.setMatrixAt(r * COLS + c, m);
    }
  field.add(tiles);

  // Soft, generous rounding: the cubes read as made objects, not raw geometry.
  const cubeGeo = new RoundedBoxGeometry(CUBE, CUBE, CUBE, 5, 0.13);
  const paper = new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.78 });
  const blocks: Block[] = [];
  const byCell = new Map<string, Block>();

  // The target mark drawn faintly on the tiles: where the modules go, so the game explains itself.
  const ghostFill = new THREE.MeshBasicMaterial({ color: 0xf2f1ec, transparent: true, opacity: 0.06, depthWrite: false });
  const ghostEdge = new THREE.LineBasicMaterial({ color: 0xf2f1ec, transparent: true, opacity: 0.34 });
  const ghostCell = new THREE.PlaneGeometry(0.9, 0.9).rotateX(-Math.PI / 2);
  const ghostLine = new THREE.EdgesGeometry(ghostCell);
  const ghost = new THREE.Group();
  field.add(ghost);

  // The finer grammar a locked mark gains: cascade squares, registration pixels, Baron's chamfer.
  const detail = new THREE.Group();
  field.add(detail);

  let target: MarkId = 'lonca';
  let locked: MarkId | null = null;
  let moves = 0;
  const tweens: Tween[] = [];
  let raf = 0;

  function showGhost(id: MarkId | null) {
    for (const child of [...ghost.children]) ghost.remove(child);
    if (id) {
      const a = anchorFor(id);
      for (const cell of cellsOf(MARKS[id])) {
        const at = worldOf(a.col + cell.col, a.row + cell.row);
        const fill = new THREE.Mesh(ghostCell, ghostFill);
        fill.position.set(at.x, TILE_TOP + 0.004, at.z);
        const edge = new THREE.LineSegments(ghostLine, ghostEdge);
        edge.position.copy(fill.position);
        ghost.add(fill, edge);
      }
    }
    render();
  }

  /** A thin arc left behind by a moving cube, drawn as it travels and faded after it lands. */
  function trail(from: THREE.Vector3, to: THREE.Vector3, lift: number, delay: number, dur: number) {
    const pts: THREE.Vector3[] = [];
    const n = 32;
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      const v = new THREE.Vector3().lerpVectors(from, to, t);
      v.y = to.y + Math.sin(Math.PI * t) * lift;
      pts.push(v);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0xe9e6df, transparent: true, opacity: 0.42 });
    const line = new THREE.Line(geo, mat);
    geo.setDrawRange(0, 0);
    field.add(line);
    const start = performance.now() + delay;
    tweens.push({ start, dur, step: (t) => geo.setDrawRange(0, Math.ceil(easeInOut(t) * (n + 1))) });
    tweens.push({
      start: start + dur + 120,
      dur: 900,
      step: (t) => {
        mat.opacity = 0.42 * (1 - t);
      },
      done: () => {
        field.remove(line);
        geo.dispose();
        mat.dispose();
      },
    });
  }

  function addBlock(col: number, row: number, from?: THREE.Vector3): Block {
    const mesh = new THREE.Mesh(cubeGeo, paper);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.copy(from ?? worldOf(col, row));
    field.add(mesh);
    const b = { mesh, col, row };
    blocks.push(b);
    byCell.set(cellKey(col, row), b);
    return b;
  }

  function removeBlock(b: Block) {
    field.remove(b.mesh);
    blocks.splice(blocks.indexOf(b), 1);
    byCell.delete(cellKey(b.col, b.row));
  }

  function place(id: MarkId) {
    const a = anchorFor(id);
    for (const cell of cellsOf(MARKS[id])) addBlock(a.col + cell.col, a.row + cell.row);
  }

  function clearDetail() {
    for (const child of [...detail.children]) detail.remove(child);
  }

  function lockDetail(id: MarkId, animate: boolean) {
    clearDetail();
    const mark = MARKS[id];
    const cells = cellsOf(mark);
    const minC = Math.min(...blocks.map((b) => b.col));
    const minR = Math.min(...blocks.map((b) => b.row));
    const pieces: THREE.Mesh[] = [];
    mark.cascade.forEach(([c, r], i) => {
      // Top-left corner: the half square hugs the module below, the pixel sits in the corner.
      // Bottom-right corner: mirrored.
      const sign = i === 0 ? -1 : 1;
      const centre = worldOf(minC + c, minR + r);
      const half = new THREE.Mesh(new RoundedBoxGeometry(CUBE / 2, CUBE / 2, CUBE / 2, 4, 0.07), paper);
      half.position.set(centre.x + sign * 0.22, TILE_TOP + CUBE / 4, centre.z - sign * 0.22);
      const px = new THREE.Mesh(new RoundedBoxGeometry(CUBE / 4, CUBE / 4, CUBE / 4, 3, 0.035), paper);
      px.position.set(centre.x + sign * 0.33, TILE_TOP + CUBE / 8, centre.z + sign * 0.33);
      pieces.push(half, px);
    });
    for (const cell of cells.filter((x: Cell) => x.chamfer)) {
      const b = byCell.get(cellKey(minC + cell.col, minR + cell.row));
      if (!b) continue;
      const s = CUBE / 2;
      const shape = new THREE.Shape([new THREE.Vector2(-s, s), new THREE.Vector2(-s, -s), new THREE.Vector2(s, -s)]);
      // The triangle keeps the module's bottom-left half: its hypotenuse is the 45° cut.
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: CUBE, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      geo.translate(0, -CUBE / 2, 0);
      b.mesh.geometry = geo;
    }
    for (const p of pieces) {
      p.castShadow = true;
      p.receiveShadow = true;
      detail.add(p);
      if (animate) {
        const y = p.position.y;
        p.scale.setScalar(0.001);
        tween(420, (t) => {
          p.scale.setScalar(Math.max(0.001, easeOut(t)));
          p.position.y = y;
        });
      }
    }
  }

  function unlock() {
    if (!locked) return;
    locked = null;
    clearDetail();
    for (const b of blocks) b.mesh.geometry = cubeGeo;
    events.onUnlocked();
  }

  function checkLock(animate: boolean, notify = true) {
    const occupied = blocks.map((b) => [b.col, b.row] as [number, number]);
    const hit = (Object.keys(MARKS) as MarkId[]).find((id) => matches(occupied, MARKS[id]));
    if (hit && hit !== locked) {
      locked = hit;
      lockDetail(hit, animate);
      if (notify) events.onLocked(hit);
    } else if (!hit) unlock();
    showGhost(locked === target ? null : target);
  }

  function tween(dur: number, step: (t: number) => void, done?: () => void) {
    if (still) {
      step(1);
      done?.();
      render();
      return;
    }
    tweens.push({ start: performance.now(), dur, step, done });
    kick();
  }

  function frame(now: number) {
    raf = 0;
    for (const tw of [...tweens]) {
      const t = Math.min(1, (now - tw.start) / tw.dur);
      if (t >= 0) tw.step(t);
      if (t >= 1) {
        tweens.splice(tweens.indexOf(tw), 1);
        tw.done?.();
      }
    }
    render();
    if (tweens.length) kick();
  }

  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function render() {
    renderer.render(scene, camera);
  }

  /** Move every block to the target mark along a short arc; extras sink, missing modules drop in. */
  function solveTo(id: MarkId, onDone?: () => void) {
    unlock();
    target = id;
    const a = anchorFor(id);
    const goal = cellsOf(MARKS[id]).map((c) => ({ col: a.col + c.col, row: a.row + c.row }));
    const free = [...blocks];
    const plan: { b: Block | null; to: { col: number; row: number } }[] = [];
    // Nearest first, so cubes already close to their place barely move.
    for (const g of goal) {
      let best = -1;
      let bestD = Number.POSITIVE_INFINITY;
      free.forEach((b, i) => {
        const d = (b.col - g.col) ** 2 + (b.row - g.row) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      plan.push({ b: best >= 0 ? free.splice(best, 1)[0] : null, to: g });
    }
    byCell.clear();
    let pending = plan.length + free.length;
    const finish = () => {
      pending -= 1;
      if (pending === 0) {
        checkLock(true);
        onDone?.();
      }
    };
    plan.forEach(({ b, to }, i) => {
      const end = worldOf(to.col, to.row);
      if (b) {
        const startPos = b.mesh.position.clone();
        b.col = to.col;
        b.row = to.row;
        byCell.set(cellKey(to.col, to.row), b);
        const lift = 0.6 + Math.min(1.6, startPos.distanceTo(end) * 0.22);
        const delay = i * 45;
        if (!still && startPos.distanceTo(end) > 0.5) trail(startPos.clone().setY(end.y), end, lift, delay, 760);
        tweens.push({
          start: performance.now() + delay,
          dur: 760,
          step: (t) => {
            const k = easeInOut(t);
            b.mesh.position.lerpVectors(startPos, end, k);
            b.mesh.position.y = end.y + Math.sin(Math.PI * k) * lift;
            b.mesh.rotation.y = Math.sin(Math.PI * k) * 0.35;
          },
          done: finish,
        });
      } else {
        const nb = addBlock(to.col, to.row, end.clone().setY(end.y + 4));
        const startPos = nb.mesh.position.clone();
        tweens.push({
          start: performance.now() + i * 45,
          dur: 640,
          step: (t) => nb.mesh.position.lerpVectors(startPos, end, easeOut(t)),
          done: finish,
        });
      }
    });
    for (const b of free) {
      blocks.splice(blocks.indexOf(b), 1);
      const startPos = b.mesh.position.clone();
      tweens.push({
        start: performance.now(),
        dur: 520,
        step: (t) => {
          b.mesh.position.y = startPos.y - easeOut(t) * 1.2;
          b.mesh.scale.setScalar(Math.max(0.001, 1 - t));
        },
        done: () => {
          field.remove(b.mesh);
          finish();
        },
      });
    }
    if (still) {
      for (const tw of tweens.splice(0)) {
        tw.step(1);
        tw.done?.();
      }
      render();
    } else kick();
  }

  // Picking: a click on a tile toggles a module there.
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -TILE_TOP);

  function cellAt(clientX: number, clientY: number): { col: number; row: number } | null {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(blocks.map((b) => b.mesh));
    const local = new THREE.Vector3();
    if (hits.length) {
      const b = blocks.find((x) => x.mesh === hits[0].object);
      if (b) return { col: b.col, row: b.row };
    }
    if (!raycaster.ray.intersectPlane(plane, local)) return null;
    field.worldToLocal(local);
    const col = Math.floor(local.x + COLS / 2);
    const row = Math.floor(local.z + ROWS / 2);
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return null;
    return { col, row };
  }

  function toggle(col: number, row: number) {
    const existing = byCell.get(cellKey(col, row));
    unlock();
    if (existing) {
      removeBlock(existing);
      const startPos = existing.mesh.position.clone();
      field.add(existing.mesh);
      tween(
        260,
        (t) => {
          existing.mesh.position.y = startPos.y - easeOut(t) * 0.9;
          existing.mesh.scale.setScalar(Math.max(0.001, 1 - t));
        },
        () => {
          field.remove(existing.mesh);
          checkLock(true);
        },
      );
    } else {
      const end = worldOf(col, row);
      const b = addBlock(col, row, end.clone().setY(end.y + 2.4));
      const startPos = b.mesh.position.clone();
      tween(
        340,
        (t) => b.mesh.position.lerpVectors(startPos, end, easeOut(t)),
        () => checkLock(true),
      );
    }
    moves += 1;
    events.onMoves(moves);
  }

  canvas.addEventListener('click', (e) => {
    const cell = cellAt(e.clientX, e.clientY);
    if (cell) toggle(cell.col, cell.row);
  });
  canvas.addEventListener('pointermove', (e) => {
    canvas.style.cursor = cellAt(e.clientX, e.clientY) ? 'pointer' : 'default';
  });

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Wide stage: the measured desktop frame. Narrow screens: widen the view so the board fills the width.
    camera.fov = camera.aspect >= 2 ? 22.5 : (2 * Math.atan(0.36 / camera.aspect) * 180) / Math.PI;
    // Frame the board the way the comp does: seen from the front-left, a little above.
    camera.position.set(-1.2, 9.5, 15.5);
    if (camera.aspect >= 2) camera.lookAt(0.9, 0, 0.2);
    else camera.lookAt(0.2, 0, 1.9);
    camera.updateProjectionMatrix();
    render();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  // The page opens on the workshop's own mark without announcing it: the card the HTML ships with stays.
  place('zanaat');
  checkLock(false, false);
  render();

  return {
    solve(id: MarkId = target, onDone?: () => void) {
      solveTo(id, onDone);
    },
    reset() {
      for (const b of [...blocks]) {
        field.remove(b.mesh);
        removeBlock(b);
      }
      unlock();
      moves = 0;
      events.onMoves(moves);
      place('zanaat');
      checkLock(false);
      render();
    },
    setTarget(id: MarkId) {
      target = id;
      showGhost(locked === target ? null : target);
    },
    get target() {
      return target;
    },
  };
}
