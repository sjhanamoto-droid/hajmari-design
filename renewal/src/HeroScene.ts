/**
 * ヒーローの背景：回路基板（はーちゃんの上着の柄）をキャンバスに描く。
 * 中央の肉球のチップから配線が伸び、その上を光の信号が走る。
 */

export type HeroScene = {
  setPaused(paused: boolean): void;
  dispose(): void;
};

type Pt = { x: number; y: number };
type Trace = {
  pts: Pt[];
  len: number;
  pad: boolean; // 終点に丸いランド（はんだ付けの点）を付ける
  delay: number; // 登場の遅れ（秒）
  pulse?: { speed: number; offset: number; gap: number; reverse: boolean };
};
type Part = { x: number; y: number; w: number; h: number; vertical: boolean };

const C = {
  bgIn: '#14295a',
  bgOut: '#0a1530',
  dot: 'rgba(120, 170, 255, 0.13)',
  far: 'rgba(72, 118, 196, 0.55)',
  near: '#22b8dc',
  bright: '#8feaff',
  chipA: '#17306a',
  chipB: '#0d1d42',
};

// 再読み込みのたびに配線が変わらないよう、乱数は固定シードにする
const seeded = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (x: number) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);

const measure = (pts: Pt[]) => {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return len;
};

export function createHeroScene(canvas: HTMLCanvasElement, opts: { reduced: boolean }): HeroScene {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is not available');

  let W = 1;
  let H = 1;
  let dpr = 1;
  let chip = 120; // チップの一辺
  let near: Trace[] = [];
  let far: Trace[] = [];
  let parts: Part[] = [];

  /* ---------- 基板をつくる ---------- */
  const build = () => {
    const rand = seeded(20261110);
    const mobile = W <= 820;
    // スクロールで縮んだときの枠（motion.ts の r0）にちょうど収まる大きさにする
    const r0 = mobile ? Math.min(84, W * 0.22) : Math.min(150, H * 0.2);
    chip = r0 * 1.04;
    const half = chip / 2;
    near = [];
    far = [];
    parts = [];

    // 1) チップの四辺のピンから、外へ扇形に広がる配線
    const PINS = mobile ? 5 : 7;
    const mid = (PINS - 1) / 2;
    const sides: { d: Pt; n: Pt }[] = [
      { d: { x: 0, y: -1 }, n: { x: 1, y: 0 } },
      { d: { x: 1, y: 0 }, n: { x: 0, y: 1 } },
      { d: { x: 0, y: 1 }, n: { x: -1, y: 0 } },
      { d: { x: -1, y: 0 }, n: { x: 0, y: -1 } },
    ];
    const reach = Math.hypot(W, H) / 2;
    sides.forEach(({ d, n }, s) => {
      for (let i = 0; i < PINS; i++) {
        const k = i - mid; // 中央からの位置（負：左、正：右）
        const ak = Math.abs(k);
        const t = (k / (mid + 1)) * half * 0.86;
        const p0 = { x: d.x * half + n.x * t, y: d.y * half + n.y * t };
        const l1 = (mid - ak) * chip * 0.2 + chip * 0.22 + rand() * 10;
        const l2 = ak * chip * (0.34 + rand() * 0.08);
        const sign = Math.sign(k);
        const p1 = { x: p0.x + d.x * l1, y: p0.y + d.y * l1 };
        const p2 = { x: p1.x + (d.x + n.x * sign) * l2, y: p1.y + (d.y + n.y * sign) * l2 };
        const through = rand() < 0.45; // 画面の外まで伸びる線と、途中でランドに終わる線
        const l3 = through ? reach : chip * (0.5 + rand() * 1.9);
        const p3 = { x: p2.x + d.x * l3, y: p2.y + d.y * l3 };
        const pts = ak === 0 ? [p0, p3] : [p0, p1, p2, p3];
        near.push({
          pts,
          len: measure(pts),
          pad: !through,
          delay: 0.35 + ak * 0.07 + s * 0.05,
          pulse: rand() < 0.75 ? { speed: 150 + rand() * 170, offset: rand() * 900, gap: 500 + rand() * 900, reverse: rand() < 0.25 } : undefined,
        });
      }
    });

    // 2) 奥の層：画面の端から入ってくる配線の束（上着の柄と同じ、平行線＋ずれた終点）
    const bundles = mobile ? 12 : 22;
    for (let b = 0; b < bundles; b++) {
      const edge = Math.floor(rand() * 4);
      const horizontal = edge % 2 === 1; // 左右の端から入る
      const d = [{ x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }][edge];
      const along = (rand() - 0.5) * (horizontal ? H : W) * 0.96;
      const start = horizontal ? { x: (-d.x * W) / 2 - d.x * 20, y: along } : { x: along, y: (-d.y * H) / 2 - d.y * 20 };
      const l1 = (horizontal ? W : H) * (0.06 + rand() * 0.2);
      const l2 = 24 + rand() * 70;
      const l3 = 40 + rand() * (horizontal ? W : H) * 0.22;
      const turn = rand() < 0.5 ? 1 : -1;
      const n = { x: -d.y * turn, y: d.x * turn };
      const count = 1 + Math.floor(rand() * 4);
      const delay = 0.15 + rand() * 0.9;
      for (let j = 0; j < count; j++) {
        const o = j * 13;
        const p0 = { x: start.x + n.x * o, y: start.y + n.y * o };
        const p1 = { x: p0.x + d.x * (l1 - j * 13), y: p0.y + d.y * (l1 - j * 13) };
        const p2 = { x: p1.x + (d.x + n.x) * l2, y: p1.y + (d.y + n.y) * l2 };
        const p3 = { x: p2.x + d.x * Math.max(18, l3 - j * 22), y: p2.y + d.y * Math.max(18, l3 - j * 22) };
        const pts = [p0, p1, p2, p3];
        // 中央のチップと見出しのまわりは空けておく
        if (Math.abs(p3.x) < chip * 1.9 && Math.abs(p3.y) < chip * 1.9) continue;
        far.push({ pts, len: measure(pts), pad: true, delay: delay + j * 0.06 });
      }
    }

    // 3) 小さな部品（抵抗・IC）
    const count = mobile ? 4 : 8;
    for (let i = 0; i < count; i++) {
      const x = (rand() - 0.5) * W * 0.92;
      const y = (rand() - 0.5) * H * 0.88;
      if (Math.abs(x) < chip * 2.2 && Math.abs(y) < chip * 2.2) continue;
      const vertical = rand() < 0.5;
      const w = 26 + rand() * 30;
      parts.push({ x, y, w: vertical ? 16 : w, h: vertical ? w : 16, vertical });
    }
  };

  /* ---------- 描画 ---------- */
  const path = (t: Trace) => {
    ctx.moveTo(t.pts[0].x, t.pts[0].y);
    for (let i = 1; i < t.pts.length; i++) ctx.lineTo(t.pts[i].x, t.pts[i].y);
  };

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const drawTraces = (list: Trace[], time: number, color: string, width: number, padFill: string) => {
    ctx.lineWidth = width;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    const done: Trace[] = [];
    for (const t of list) {
      const k = easeOut(clamp01((time - t.delay) / 1.2));
      if (k <= 0) continue;
      if (k >= 1) {
        done.push(t);
        continue;
      }
      // 登場中：根もとから先へ向かって線が伸びる
      ctx.setLineDash([t.len * k, t.len]);
      ctx.beginPath();
      path(t);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    if (done.length) {
      ctx.beginPath();
      for (const t of done) path(t);
      ctx.stroke();
      for (const t of done) {
        if (!t.pad) continue;
        const e = t.pts[t.pts.length - 1];
        const pop = easeOutBack(clamp01((time - t.delay - 1.2) / 0.35));
        if (pop <= 0) continue;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 4.5 * pop, 0, Math.PI * 2);
        ctx.fillStyle = padFill;
        ctx.fill();
        ctx.stroke();
      }
    }
  };

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false, glow: 0 };

  const draw = (time: number) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 背景
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.hypot(W, H) * 0.6);
    bg.addColorStop(0, C.bgIn);
    bg.addColorStop(1, C.bgOut);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const px = pointer.x * W * 0.5;
    const py = pointer.y * H * 0.5;

    // 奥の層（点のグリッド・奥の配線・部品）：カーソルと逆へ少しだけずれる
    ctx.save();
    ctx.translate(W / 2 - pointer.x * 8, H / 2 - pointer.y * 6);
    ctx.fillStyle = C.dot;
    const step = 34;
    for (let x = -Math.ceil(W / 2 / step) * step; x <= W / 2 + step; x += step) {
      for (let y = -Math.ceil(H / 2 / step) * step; y <= H / 2 + step; y += step) ctx.fillRect(x - 1, y - 1, 2, 2);
    }
    drawTraces(far, time, C.far, 1.5, C.bgOut);
    const partK = clamp01((time - 1.2) / 0.6);
    if (partK > 0) {
      ctx.globalAlpha = partK;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = C.far;
      for (const p of parts) {
        roundRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, 4);
        ctx.fillStyle = 'rgba(20, 44, 96, 0.9)';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = C.far;
        const n = Math.floor((p.vertical ? p.h : p.w) / 9);
        for (let i = 0; i < n; i++) {
          const o = -((n - 1) * 9) / 2 + i * 9;
          if (p.vertical) {
            ctx.fillRect(p.x - p.w / 2 - 5, p.y + o - 1.5, 5, 3);
            ctx.fillRect(p.x + p.w / 2, p.y + o - 1.5, 5, 3);
          } else {
            ctx.fillRect(p.x + o - 1.5, p.y - p.h / 2 - 5, 3, 5);
            ctx.fillRect(p.x + o - 1.5, p.y + p.h / 2, 3, 5);
          }
        }
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // 手前の層（チップから伸びる配線）
    ctx.save();
    ctx.translate(W / 2 - pointer.x * 18, H / 2 - pointer.y * 13);
    drawTraces(near, time, C.near, 2, C.bgOut);

    // カーソルの近くだけ、配線が明るく光る
    if (pointer.glow > 0.01) {
      const g = ctx.createRadialGradient(px, py, 0, px, py, 240);
      g.addColorStop(0, `rgba(160, 240, 255, ${0.95 * pointer.glow})`);
      g.addColorStop(1, 'rgba(160, 240, 255, 0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (const t of near) if (time - t.delay > 1.2) path(t);
      for (const t of far) if (time - t.delay > 1.2) path(t);
      ctx.stroke();
    }

    // 配線を走る信号
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = C.bright;
    ctx.shadowColor = C.bright;
    ctx.shadowBlur = 12;
    for (const t of near) {
      if (!t.pulse || time - t.delay < 1.4) continue;
      const cycle = t.len + t.pulse.gap;
      let d = ((time - t.delay) * t.pulse.speed + t.pulse.offset) % cycle;
      if (d > t.len + 40) continue;
      if (t.pulse.reverse) d = t.len - d + 40;
      ctx.setLineDash([40, t.len + 200]);
      ctx.lineDashOffset = 40 - d;
      ctx.beginPath();
      path(t);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.shadowBlur = 0;

    // 中央のチップ
    const ck = clamp01((time - 0.15) / 0.8);
    if (ck > 0) {
      const s = easeOutBack(ck);
      const beat = 0.5 + 0.5 * Math.sin(time * 1.6);
      const half = (chip / 2) * s;
      // ピン
      ctx.fillStyle = C.near;
      for (const t of near) {
        const p = t.pts[0];
        const horizontal = Math.abs(p.x) > Math.abs(p.y);
        const q = { x: p.x * s, y: p.y * s };
        if (horizontal) ctx.fillRect(q.x - (p.x > 0 ? 0 : 8), q.y - 2.5, 8, 5);
        else ctx.fillRect(q.x - 2.5, q.y - (p.y > 0 ? 0 : 8), 5, 8);
      }
      ctx.shadowColor = 'rgba(60, 200, 240, 0.9)';
      ctx.shadowBlur = 26 + beat * 22;
      const body = ctx.createLinearGradient(0, -half, 0, half);
      body.addColorStop(0, C.chipA);
      body.addColorStop(1, C.chipB);
      roundRect(-half, -half, half * 2, half * 2, half * 0.3);
      ctx.fillStyle = body;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = C.near;
      ctx.stroke();
      roundRect(-half * 0.78, -half * 0.78, half * 1.56, half * 1.56, half * 0.18);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(95, 220, 247, 0.35)';
      ctx.stroke();
      // チップの中の印：はーちゃんの肉球
      const u = half * 0.36; // 肉球の大きさの基準
      ctx.shadowColor = C.bright;
      ctx.shadowBlur = 10 + beat * 14;
      ctx.fillStyle = '#6fe0fa';
      ctx.beginPath();
      ctx.ellipse(0, u * 0.5, u * 0.92, u * 0.76, 0, 0, Math.PI * 2); // 掌球
      for (const [x, y, r] of [[-1.02, -0.3, 0.36], [-0.4, -0.95, 0.4], [0.4, -0.95, 0.4], [1.02, -0.3, 0.36]]) {
        ctx.moveTo(x * u + r * u, y * u);
        ctx.ellipse(x * u, y * u, r * u, r * u * 1.12, 0, 0, Math.PI * 2); // 指球
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  };

  /* ---------- 入力・リサイズ・ループ ---------- */
  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    pointer.active = e.clientY >= r.top && e.clientY <= r.bottom;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let paused = false;
  let raf = 0;
  let time = opts.reduced ? 20 : 0; // 動きを減らす設定では、描き終わった状態から始める
  let last = performance.now();

  const resize = () => {
    W = canvas.clientWidth || 1;
    H = canvas.clientHeight || 1;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    build();
    if (!raf) draw(time);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    pointer.x += (pointer.tx - pointer.x) * 0.07;
    pointer.y += (pointer.ty - pointer.y) * 0.07;
    pointer.glow += ((pointer.active ? 1 : 0) - pointer.glow) * 0.06;
    draw(time);
  };
  const start = () => {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  resize();
  if (opts.reduced) paused = true;
  else start();

  return {
    setPaused(next: boolean) {
      paused = next || opts.reduced;
      if (paused) stop();
      else start();
    },
    dispose() {
      stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
    },
  };
}
