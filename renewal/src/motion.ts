/**
 * スクロール連動の演出をまとめて動かす。
 * 値はすべて CSS 変数として書き出し、見た目は style.css 側で決める。
 * （JS が動かない・動きを減らす設定のときは、変数の既定値＝完成状態で表示される）
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);

/** 歩きの8コマ：移動距離 px と体の幅から、いま見せるコマ番号を返す */
const WALK_FRAMES = 8;
const frameAt = (px: number, bodyWidth: number) => {
  const f = Math.floor(Math.abs(px) / Math.max(14, bodyWidth * 0.2)) % WALK_FRAMES;
  return f;
};

export function initMotion(root: HTMLElement): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const $$ = <T extends HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  const header = $('.head');
  const intro = $('.intro');
  const stage = $('.intro__stage');
  const wipe = $('.wipe');
  const wipeStage = $('.wipe__stage');
  const wipeCat = $('.wipe__cat');
  const wipeText = $('.wipe__text');
  const issue = $('.issue');
  const walker = $('.walker');
  const fills = $$('.fill').map((el) => ({ el, chars: Array.from(el.querySelectorAll<HTMLElement>('.ch')), on: -1 }));

  /* ---- 画面に入ったら現れる要素 ---- */
  const revealEls = $$('.rv');
  let io: IntersectionObserver | null = null;
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io?.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    revealEls.forEach((el) => io!.observe(el));
  }

  if (reduced) {
    root.classList.add('is-static');
    fills.forEach((f) => f.chars.forEach((c) => c.classList.add('on')));
  }

  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let smooth = window.scrollY;
  let lastY = window.scrollY;
  let raf = 0;

  const lightZones = () => $$('[data-header="light"]');

  const frame = () => {
    raf = 0;
    const y = window.scrollY;
    smooth += (y - smooth) * 0.16;
    if (Math.abs(y - smooth) < 0.4) smooth = y;

    /* ---- ヒーロー → チップ → ステートメント → ふたつの事業 ---- */
    if (intro && stage && !reduced) {
      const span = intro.offsetHeight - vh;
      const p = clamp((smooth - intro.offsetTop) / span);
      const mobile = vw <= 820;
      const r0 = mobile ? Math.min(84, vw * 0.22) : Math.min(150, vh * 0.2);
      const cy = mobile ? 0.2 : 0.5;
      const a = inOut(seg(p, 0, 0.3));
      const s = stage.style;
      s.setProperty('--r0', `${r0}px`);
      // 全画面の基板が、角丸の四角いチップの形まで縮む
      const cyPx = cy * vh;
      s.setProperty('--ct', `${(cyPx - r0) * a}px`);
      s.setProperty('--cb', `${(vh - cyPx - r0) * a}px`);
      s.setProperty('--cx', `${(vw / 2 - r0) * a}px`);
      s.setProperty('--crad', `${r0 * 0.26 * a}px`);
      s.setProperty('--shift', `${(cy - 0.5) * vh * a}px`);
      s.setProperty('--ring', `${seg(a, 0.8, 1)}`);
      s.setProperty('--hero', `${out(seg(p, 0, 0.1))}`);
      const l1 = out(seg(p, 0.3, 0.38));
      const l2 = out(seg(p, 0.37, 0.45));
      const l3 = out(seg(p, 0.44, 0.52));
      s.setProperty('--l1', `${l1}`);
      s.setProperty('--l2', `${l2}`);
      s.setProperty('--l3', `${l3}`);
      s.setProperty('--para', `${out(seg(p, 0.5, 0.58))}`);
      s.setProperty('--out', `${inOut(seg(p, 0.66, 0.75))}`);
      const s1 = out(seg(p, 0.74, 0.84));
      s.setProperty('--s1', `${s1}`);
      s.setProperty('--s2', `${out(seg(p, 0.78, 0.88))}`);
      s.setProperty('--ln', `${inOut(seg(p, 0.8, 0.94))}`);
      stage.classList.toggle('is-duo', s1 > 0.5);
      stage.classList.toggle('is-past-hero', p > 0.08);
      if (p < 0.12) stage.dataset.header = 'light';
      else delete stage.dataset.header;
    }

    /* ---- Mielba：斜めのワイプ ---- */
    if (wipe && wipeStage && !reduced) {
      const p = clamp((smooth - wipe.offsetTop) / (wipe.offsetHeight - vh));
      const s = wipeStage.style;
      // 斜めの切り口（配線の45°）が右から左へ走って、紺の面に切り替わる
      const lean = vh * 0.55;
      s.setProperty('--wk', `${lean}px`);
      s.setProperty('--we', `${vw + 12 - inOut(seg(p, 0.08, 0.78)) * (vw + lean + 24)}px`);
      s.setProperty('--wx', `${18 - p * 70}%`);
      if (wipeCat && wipeText) wipeCat.style.setProperty('--f', `${frameAt((p * 70 * wipeText.offsetWidth) / 100, wipeCat.offsetWidth)}`);
      if (p > 0.5) wipeStage.dataset.header = 'light';
      else delete wipeStage.dataset.header;
    }

    /* ---- 巨大見出し：スクロールに合わせて1文字ずつ色が入る ---- */
    if (!reduced) {
      for (const f of fills) {
        const rect = f.el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const n = Math.round(seg(vh * 0.95 - rect.top, 0, vh * 0.5) * f.chars.length);
        if (n === f.on) continue;
        f.on = n;
        f.chars.forEach((c, i) => c.classList.toggle('on', i < n));
      }
    }

    /* ---- ヘッダー：背景に合わせて文字色を変え、下スクロール中は隠す ---- */
    if (header) {
      const light = lightZones().some((z) => {
        const r = z.getBoundingClientRect();
        return r.top <= 40 && r.bottom > 40;
      });
      header.classList.toggle('is-light', light);
      header.classList.toggle('is-solid', y > 24 && !light);
      const dy = y - lastY;
      if (Math.abs(dy) > 4) header.classList.toggle('is-hidden', dy > 0 && y > vh * 0.9);
    }
    lastY = y;

    /* ---- Issue：スクロールした分だけ、はーちゃんが右から左へ歩く ---- */
    if (issue && walker && !reduced) {
      // 通り道（カードの上の縁）が画面の下から上へ抜けるあいだに、右端から左端まで歩ききる
      const laneY = issue.offsetTop + (walker.parentElement?.offsetTop ?? 0);
      const p = clamp((smooth + vh * 0.95 - laneY) / (vh * 0.95 + 80));
      const w = walker.offsetWidth;
      const x = vw - p * (vw + w);
      const ws = walker.style;
      ws.setProperty('--x', `${x}px`);
      ws.setProperty('--f', `${frameAt(vw - x, w)}`); // 進んだ距離に合わせてコマを送る
      ws.setProperty('--say', `${seg(p, 0.12, 0.2) * (1 - seg(p, 0.7, 0.8))}`);
    }

    if (smooth !== y) request();
  };

  const request = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  const onResize = () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
    request();
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', onResize);
  request();

  return () => {
    cancelAnimationFrame(raf);
    io?.disconnect();
    window.removeEventListener('scroll', request);
    window.removeEventListener('resize', onResize);
  };
}
