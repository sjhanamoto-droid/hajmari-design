import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createHeroScene, type HeroScene } from './HeroScene';
import { initMotion } from './motion';

const IMG = '/renewal/images';
const CONTACT_URL = '/contact'; // 既存サイトのお問い合わせフォーム

const NAV = [
  { href: '#issue', label: 'Issue' },
  { href: '#service', label: 'Service' },
  { href: '#mielba', label: 'Mielba' },
  { href: '#work', label: 'Work' },
  { href: '#company', label: 'Company' },
];

const ISSUES = [
  { title: ['社長に聞かないと、', '分からない'], text: '段取りや判断の情報が、社長や担当者の頭の中に止まっている。' },
  { title: ['忙しくて、', '記録が残らない'], text: '現場の合間に書く余裕がなく、あとで振り返れない。' },
  { title: ['紙・Excel・LINEに', '散らばっている'], text: '必要なときに、どこを見ればいいか分からない。' },
  { title: ['入力と転記に', '追われている'], text: '同じ内容を何度も書き写し、確認と共有に時間がかかる。' },
];

const WAYS = [
  { title: '毎日のどこに入るか', text: '誰が、どの場面で使うかから考えます。' },
  { title: '小さく絞って始める', text: '大事な使い方2〜3つに絞り、やらないことも決めます。' },
  { title: '気づけばAIが働く', text: 'いつもの仕事の中で、自然に手間が減る形にします。' },
];

const MIELBA_POINTS = [
  { title: '日報で現場を見える化', text: 'スタッフの日報をリアルタイムで集計。進捗・課題・予定を一元管理します。' },
  { title: '顧客・案件を一元管理', text: '顧客情報や案件履歴をまとめて管理。対応履歴もすぐに確認できます。' },
  { title: '導入支援', text: '現場に定着するまで、導入を支援します。' },
];

type WorkCat = 'construction' | 'community';
const WORK_FILTERS: { key: 'all' | WorkCat; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'construction', label: '建設業' },
  { key: 'community', label: 'コミュニティ事業' },
];
const WORKS: { cat: WorkCat; tag: string; title: string }[] = [
  { cat: 'construction', tag: '建設業 ／ オーダーメイド開発', title: '[建設会社A] [課題 → 開発内容 → 業務の変化]' },
  { cat: 'construction', tag: '建設業 ／ オーダーメイド開発', title: '[建設会社B] [課題 → 開発内容 → 業務の変化]' },
  { cat: 'community', tag: 'コミュニティ事業 ／ オーダーメイド開発', title: '[事業名] [課題 → 開発内容 → 業務の変化]' },
];

const PROCESS = [
  { title: '話を聞く', text: 'いまの仕事の流れと、困っていることを伺います。' },
  { title: '整理・設計', text: '誰が、どの場面で使うかを決め、画面と仕組みを設計します。' },
  { title: '開発・導入', text: '一緒に確かめながらつくり、現場に入れます。' },
  { title: '定着・改善', text: '使われ方を見て、続けやすい形に直していきます。' },
];

const MARQUEE = ['Workflow Design', 'Custom System', 'AI in Daily Work', 'Mielba for Construction', 'Support after Launch'];

/* ---------- 小さな部品 ---------- */

const Arrow = () => (
  <svg className="arw" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDot = () => (
  <span className="dot-arw" aria-hidden="true">
    <Arrow />
  </span>
);

/** 1文字ずつ <span> に分ける（読み上げは aria-label 側で行う） */
const Chars = ({ text, from = 0 }: { text: string; from?: number }) => (
  <>
    {Array.from(text).map((c, i) => (
      <span className="ch" key={i} style={{ '--i': from + i } as CSSProperties}>
        {c === ' ' ? ' ' : c}
      </span>
    ))}
  </>
);

const Heading = ({ lines, className = '' }: { lines: string[]; className?: string }) => {
  let count = 0;
  return (
    <h2 className={`giant fill ${className}`} aria-label={lines.join(' ')}>
      {lines.map((line) => {
        const from = count;
        count += line.length;
        return (
          <span className="giant__line" aria-hidden="true" key={line}>
            <Chars text={line} from={from} />
          </span>
        );
      })}
    </h2>
  );
};

const Rv = ({ children, d = 0, className = '', as: Tag = 'div' }: { children: ReactNode; d?: number; className?: string; as?: 'div' | 'li' | 'p' | 'article'; key?: string }) => (
  <Tag className={`rv ${className}`} style={{ '--d': d } as CSSProperties}>
    {children}
  </Tag>
);

const MotionToggle = ({ on, onToggle, className = '' }: { on: boolean; onToggle: () => void; className?: string }) => (
  <button type="button" className={`motion-toggle ${className}`} onClick={onToggle} aria-pressed={!on}>
    <span>モーション</span>
    <span className="motion-toggle__icon" aria-hidden="true">
      {on ? (
        <svg viewBox="0 0 12 12"><path d="M3.5 2.5v7M8.5 2.5v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      ) : (
        <svg viewBox="0 0 12 12"><path d="M4 2.5 9.5 6 4 9.5z" fill="currentColor" /></svg>
      )}
    </span>
    <span className="sr-only">{on ? 'を停止する' : 'を再生する'}</span>
  </button>
);

/* ---------- ページ ---------- */

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HeroScene | null>(null);
  const [motionOn, setMotionOn] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | WorkCat>('all');
  const [noWebgl, setNoWebgl] = useState(false);

  // スクロール演出
  useEffect(() => {
    if (!rootRef.current) return;
    return initMotion(rootRef.current);
  }, []);

  // ヒーローの回路基板
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      sceneRef.current = createHeroScene(canvas, { reduced });
    } catch {
      setNoWebgl(true); // キャンバスが使えない環境では、紺の背景だけを見せる
      return;
    }
    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = introRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    sceneRef.current?.setPaused(!motionOn || !heroVisible);
  }, [motionOn, heroVisible]);

  useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? 'on' : 'off';
  }, [motionOn]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const toggleMotion = () => setMotionOn((v) => !v);
  const works = WORKS.filter((w) => filter === 'all' || w.cat === filter);

  return (
    <div className="site" ref={rootRef}>
      <a className="skip" href="#main">本文へ移動</a>

      {/* ===== HEADER ===== */}
      <header className={`head ${menuOpen ? 'is-open' : ''}`}>
        <a className="head__logo" href="#top" onClick={() => setMenuOpen(false)}>HAJMARI</a>
        <nav className="head__nav" aria-label="メインメニュー">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="head__side">
          <a className="pill" href="#contact">相談する<Arrow /></a>
          <button
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="menu"
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div id="menu" className={`menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="モバイルメニュー">
          {[...NAV, { href: '#contact', label: 'Contact' }].map((n, i) => (
            <a key={n.href} href={n.href} style={{ '--i': i } as CSSProperties} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      <main id="main">
        {/* ===== 1. HERO → チップ → ステートメント → ふたつの事業 ===== */}
        <section className="intro" id="top" ref={introRef}>
          <div className="intro__stage">
            <div className={`intro__clip ${noWebgl ? 'is-fallback' : ''}`} aria-hidden="true">
              <canvas ref={canvasRef} />
            </div>
            <div className="porthole" aria-hidden="true" />
            <div className="intro__line" aria-hidden="true" />
            <div className="wire wire--l" aria-hidden="true" />
            <div className="wire wire--r" aria-hidden="true" />

            <div className="hero">
              <MotionToggle on={motionOn} onToggle={toggleMotion} className="hero__toggle" />
              <p className="hero__eyebrow">CUSTOM SYSTEM &amp; AI DEVELOPMENT</p>
              <h1 className="hero__title" aria-label="Made to fit your work.">
                <span className="mask" aria-hidden="true"><span>Made to fit</span></span>
                <span className="mask" aria-hidden="true"><span>your work<i>.</i></span></span>
              </h1>
              <p className="hero__sub">その会社の仕事に合う、<br />システムとAIを。</p>
            </div>

            <div className="stmt">
              <h2 className="stmt__title">
                <span style={{ '--o': 'var(--l1, 1)' } as CSSProperties}><em>現場</em>で無理なく</span>
                <span style={{ '--o': 'var(--l2, 1)' } as CSSProperties}><em>使い続けられる</em></span>
                <span style={{ '--o': 'var(--l3, 1)' } as CSSProperties}>仕組みをつくる</span>
              </h2>
              <p className="stmt__text">
                HAJMARIは、業務の整理から、オーダーメイドのシステム・AI開発、導入後の支援まで行う開発パートナーです。業種は問いません。
              </p>
            </div>

            <div className="duo">
              <a className="duo__item duo__item--l" href="#service">
                <span className="tag">FOR ALL INDUSTRIES</span>
                <span className="duo__title">Custom<b>System &amp; AI</b></span>
                <span className="duo__jp">オーダーメイドの<br />システム・AI開発</span>
                <span className="more">View Details<ArrowDot /></span>
              </a>
              <a className="duo__item duo__item--r" href="#mielba">
                <span className="tag tag--bronze">FOR CONSTRUCTION</span>
                <span className="duo__title">Mielba<b>for Builders</b></span>
                <span className="duo__jp">建設業向けAI業務管理システム<br />「ミエルバ」の販売・導入</span>
                <span className="more">View Details<ArrowDot /></span>
              </a>
            </div>
          </div>
        </section>

        {/* ===== 流れるキーワード帯 ===== */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((k) => (
              <div className="marquee__set" key={k}>
                {MARQUEE.map((m) => (
                  <span key={m}>{m}<i /></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ===== 2. ISSUE ===== */}
        <section className="sec issue" id="issue">
          <div className="wrap">
            <div className="sec__head">
              <Heading lines={['Issue']} />
              <Rv as="p" className="sec__lead">こんな場面、ありませんか。</Rv>
            </div>
            {/* スクロールに合わせて、はーちゃんが右から左へ歩く */}
            <div className="lane" aria-hidden="true">
              <div className="walker">
                <p className="walker__balloon">それ、ありますよね…</p>
                <div className="sprite walker__cat" />
              </div>
            </div>
            <ul className="issue__grid">
              {ISSUES.map((it, i) => (
                <Rv as="li" className="issue__card" d={i} key={it.text}>
                  <span className="issue__no">{String(i + 1).padStart(2, '0')}</span>
                  <p className="issue__title">{it.title[0]}<br />{it.title[1]}</p>
                  <p className="issue__text">{it.text}</p>
                </Rv>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== 3. SERVICE ===== */}
        <section className="sec service" id="service">
          <div className="wrap">
            <div className="sec__head">
              <Heading lines={['Service']} />
              <Rv as="p" className="sec__lead">ふたつの方法で、仕事を軽くします。</Rv>
            </div>
            <div className="service__grid">
              <Rv as="article" className="svc">
                <div className="svc__visual svc__visual--flow" aria-hidden="true">
                  <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
                    <g className="flow__src">
                      <rect x="44" y="52" width="132" height="60" rx="14" />
                      <rect x="44" y="150" width="132" height="60" rx="14" />
                      <rect x="44" y="248" width="132" height="60" rx="14" />
                      <text x="110" y="89">紙</text>
                      <text x="110" y="187">Excel</text>
                      <text x="110" y="285">LINE</text>
                    </g>
                    <path className="flow__trace" pathLength="1" d="M176 82 H250 L300 132 V160 H360" />
                    <path className="flow__trace" pathLength="1" d="M176 180 H360" />
                    <path className="flow__trace" pathLength="1" d="M176 278 H250 L300 228 V200 H360" />
                    <g className="flow__app">
                      <rect x="360" y="64" width="236" height="232" rx="22" />
                      <rect className="flow__bar" x="384" y="92" width="96" height="14" rx="7" />
                      <rect className="flow__row" x="384" y="130" width="188" height="34" rx="10" />
                      <rect className="flow__row" x="384" y="176" width="188" height="34" rx="10" />
                      <rect className="flow__row flow__row--on" x="384" y="222" width="188" height="34" rx="10" />
                      <circle cx="556" cy="99" r="9" />
                    </g>
                  </svg>
                </div>
                <p className="svc__no">01 / 業種不問</p>
                <h3 className="svc__title">オーダーメイドの<br />システム・AI開発</h3>
                <p className="svc__text">仕事の進め方や困りごとを伺い、業務の整理から設計・開発・導入、使われ方を見た改善まで支援します。何をつくるか決まっていなくても大丈夫です。</p>
              </Rv>
              <Rv as="article" className="svc" d={1}>
                <div className="svc__visual svc__visual--mielba">
                  <img src={encodeURI('/images/サービス紹介_Mielba.webp')} alt="Mielbaの画面イメージ" width="1024" height="768" loading="lazy" />
                </div>
                <p className="svc__no svc__no--bronze">02 / 建設業</p>
                <h3 className="svc__title">Mielbaの<br />販売・導入支援</h3>
                <p className="svc__text">建設業に特化したAI業務管理システム「ミエルバ」をご提供し、現場に定着するまで導入を支援します。</p>
                <a className="more" href="#mielba">View Details<ArrowDot /></a>
              </Rv>
            </div>
          </div>
        </section>

        {/* ===== 4. OUR WAY ===== */}
        <section className="sec way" id="way">
          <Rv className="way__traces">
            <svg aria-hidden="true" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice">
              <path className="trace" pathLength="1" d="M1440 92 H1180 L1130 142 H960" />
              <circle className="pad" cx="960" cy="142" r="6" />
              <path className="trace" pathLength="1" d="M1440 132 H1222 L1172 182 V262" />
              <circle className="pad" cx="1172" cy="262" r="6" />
              <path className="trace trace--ink" pathLength="1" d="M1440 210 H1362 L1340 232 V372" />
              <circle className="pad pad--ink" cx="1340" cy="372" r="6" />
              <path className="trace trace--ink" pathLength="1" d="M1440 470 H1322 L1272 420 H1150" />
              <circle className="pad pad--ink" cx="1150" cy="420" r="6" />
              <path className="trace" pathLength="1" d="M0 600 H220 L260 560 H420" />
              <circle className="pad" cx="420" cy="560" r="6" />
              <path className="trace trace--ink" pathLength="1" d="M0 522 H118 L158 482 V430" />
              <circle className="pad pad--ink" cx="158" cy="430" r="6" />
              <path className="trace trace--ink" pathLength="1" d="M0 70 H70 L110 110 V170" />
              <circle className="pad pad--ink" cx="110" cy="170" r="6" />
              <path className="pulse" pathLength="1" d="M1440 92 H1180 L1130 142 H960" />
              <path className="pulse" pathLength="1" d="M0 600 H220 L260 560 H420" style={{ animationDelay: '1.6s' }} />
            </svg>
          </Rv>
          <div className="wrap way__inner">
            <div className="sec__head">
              <Heading lines={['Our Way']} />
              <Rv as="p" className="sec__note">開発で大切にしていること</Rv>
            </div>
            <div className="way__body">
              <Rv as="p" className="way__lead">現場で働く人の、<br />使いやすさから考える。</Rv>
              <Rv as="p" className="way__text" d={1}>
                職人やトレーナーなど、小規模な会社や事業の現場に実務を通じて関わってきました。その経験を生かし、実際の仕事の流れや使う場面に合わせて、システム・AIを設計・開発します。忙しい仕事の合間にも迷わず使え、日々の負担を減らせることを大切にしています。
              </Rv>
              <ul className="way__list">
                {WAYS.map((w, i) => (
                  <Rv as="li" d={i} key={w.title}>
                    <span className="way__mark" aria-hidden="true" />
                    <p className="way__title">{w.title}</p>
                    <p className="way__desc">{w.text}</p>
                  </Rv>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== 5. MIELBA：斜めのワイプで切り替わる ===== */}
        <div className="wipe" aria-hidden="true">
          <div className="wipe__stage">
            <div className="wipe__layer wipe__layer--base">
              <p className="wipe__text">Mielba for Construction</p>
            </div>
            <div className="wipe__layer wipe__layer--over">
              <p className="wipe__text">Mielba for Construction</p>
            </div>
            <div className="sprite wipe__cat" />
          </div>
        </div>

        <section className="sec mielba" id="mielba" data-header="light">
          <div className="wrap">
            <div className="mielba__head">
              <div>
                <Rv as="p" className="eyebrow eyebrow--bronze">FOR CONSTRUCTION</Rv>
                <Heading lines={['Mielba']} className="giant--light" />
                <Rv as="p" className="mielba__sub">ミエルバ｜建設業向けAI業務管理システム</Rv>
              </div>
              <Rv className="mielba__lead">
                <p>日報が、現場を変える。</p>
                <span>スタッフの日報を軸に、現場の「見える化」と「業務改善」を、現場の仕事の流れのまま実現します。</span>
              </Rv>
            </div>
            <Rv className="mielba__visual">
              <img src={encodeURI('/images/サービス紹介_Mielba.webp')} alt="Mielbaのダッシュボードと日報画面" width="1024" height="768" loading="lazy" />
            </Rv>
            <ul className="mielba__points">
              {MIELBA_POINTS.map((p, i) => (
                <Rv as="li" d={i} key={p.title}>
                  <p className="mielba__ptitle">{p.title}</p>
                  <p className="mielba__ptext">{p.text}</p>
                </Rv>
              ))}
            </ul>
            <Rv>
              <a className="btn btn--white" href={CONTACT_URL}>Mielbaについて相談する<ArrowDot /></a>
            </Rv>
          </div>
        </section>

        {/* ===== 6. WORK ===== */}
        <section className="sec work" id="work">
          <div className="wrap">
            <Heading lines={['Featured', 'Work']} className="giant--xl giant--two" />
            <div className="work__body">
              <div className="work__side">
                <p className="sec__lead">開発実績</p>
                <ul className="work__filters" role="list">
                  {WORK_FILTERS.map((f) => (
                    <li key={f.key}>
                      <button type="button" className={filter === f.key ? 'is-active' : ''} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                        {f.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="work__grid">
                {works.map((w, i) => (
                  <article className="work__card" key={`${filter}-${w.title}`} style={{ '--d': i } as CSSProperties}>
                    <div className="work__thumb"><span>[画面・写真（掲載許可後）]</span></div>
                    <p className={`chip ${w.cat === 'community' ? 'chip--blue' : ''}`}>{w.tag}</p>
                    <h3>{w.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 7. PROCESS ===== */}
        <section className="sec process" id="process" data-header="light">
          <div className="wrap">
            <div className="process__head">
              <Heading lines={['Process']} className="giant--grad" />
              <Rv as="p" className="process__lead">仕様が決まっていなくても、<br />困りごとから。</Rv>
            </div>
            <ol className="process__list">
              {PROCESS.map((p, i) => (
                <Rv as="li" d={i} key={p.title}>
                  <span className="process__no">{String(i + 1).padStart(2, '0')}</span>
                  <p className="process__title">{p.title}</p>
                  <p className="process__text">{p.text}</p>
                </Rv>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== 8. COMPANY ===== */}
        <section className="sec company" id="company">
          <div className="wrap company__inner">
            <div className="sec__head">
              <Heading lines={['Company']} />
              <Rv as="p" className="sec__note">会社概要</Rv>
            </div>
            <div className="company__body">
              <Rv>
                <dl className="company__dl">
                  <dt>会社名</dt><dd>合同会社HAJMARI</dd>
                  <dt>代表</dt><dd>花本 昌樹</dd>
                  <dt>所在地</dt><dd>〒106-0032<br />東京都港区六本木3丁目16番12号 六本木KSビル5F</dd>
                  <dt>事業内容</dt><dd>オーダーメイドのシステム・AI開発<br />建設業向けAI業務管理システム「Mielba」の販売・導入</dd>
                </dl>
              </Rv>
              <Rv className="company__msg" d={1}>
                <p className="company__mtitle">Message from CEO</p>
                <p>建築・施工、バックオフィス、写真・映像制作を経験し、システムのUI/UX設計に従事。小規模な事業の現場で培った業務理解をもとに、使う人に寄り添ったシステム・AI開発を行っています。</p>
              </Rv>
            </div>
          </div>
        </section>

        {/* ===== 9. CONTACT ===== */}
        <section className="contact" id="contact" data-header="light">
          <div className="wrap contact__inner">
            <h2 className="contact__title fill" aria-label="Let's talk about work.">
              <span className="giant__line" aria-hidden="true"><Chars text="Let's talk" /></span>
              <span className="giant__line" aria-hidden="true"><Chars text="about work." from={10} /></span>
            </h2>
            <div className="contact__row">
              <div className="bubbles">
                <a className="bubble bubble--a rv" href={CONTACT_URL}>
                  <small>Contact</small>
                  <strong>お問い合わせ</strong>
                  <span>業務・開発の相談をする</span>
                  <ArrowDot />
                </a>
                <a className="bubble bubble--b rv" href={CONTACT_URL} style={{ '--d': 1 } as CSSProperties}>
                  <small>Mielba</small>
                  <strong>導入の相談</strong>
                  <span>Mielbaについて相談する</span>
                  <ArrowDot />
                </a>
              </div>
              <Rv as="p" className="contact__text">
                業務の困りごと、システム・AI開発、Mielbaの導入について。何をつくるか決まっていない段階でも、お気軽にご相談ください。
              </Rv>
            </div>
            <img className="contact__cat" src={`${IMG}/hachan-back.webp`} alt="" aria-hidden="true" width="500" height="800" loading="lazy" />
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="foot" data-header="light">
        <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <g id="pawprint">
              <ellipse cx="20" cy="27" rx="9" ry="8" />
              <circle cx="8.5" cy="15" r="4" />
              <circle cx="15.5" cy="8.5" r="4" />
              <circle cx="24.5" cy="8.5" r="4" />
              <circle cx="31.5" cy="15" r="4" />
            </g>
          </defs>
        </svg>
        <div className="wrap">
          <div className="foot__top">
            <div>
              <p className="foot__logo">HAJMARI</p>
              <p className="foot__tag">その会社の仕事に合う、システムとAIを。</p>
            </div>
            <nav className="foot__nav" aria-label="フッターメニュー">
              <div>
                <a href="#service">Service</a>
                <a href="#mielba">Mielba</a>
                <a href="#work">Work</a>
              </div>
              <div>
                <a href="#process">Process</a>
                <a href="#company">Company</a>
                <a href="#contact">Contact</a>
              </div>
            </nav>
            <div className="foot__cta">
              <a className="btn btn--blue" href={CONTACT_URL}>Contact<Arrow /></a>
              <a className="btn btn--line" href="#mielba">Mielba<Arrow /></a>
            </div>
          </div>
          <div className="foot__bottom">
            <MotionToggle on={motionOn} onToggle={toggleMotion} />
            <small>© 2026 HAJMARI All rights reserved.</small>
          </div>
        </div>
        <div className="paws" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={{ left: `${3 + i * 5.6}%`, top: i % 2 ? 78 : 34, animationDelay: `${(i * 0.38).toFixed(2)}s` }}>
              <svg viewBox="0 0 40 40"><use href="#pawprint" /></svg>
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
