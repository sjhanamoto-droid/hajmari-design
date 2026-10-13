import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Camera,
  HeartHandshake,
  Eye,
  LifeBuoy,
  Rocket,
  Fingerprint,
  Wrench,
  Compass,
  Handshake,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, HighlightText, ParallaxImage } from '../components/Animators';

// 自社撮影素材（コンセプトの根拠として提示）
const originalShots = [
  { src: '/images/top_photographer.webp', label: '空間・建築' },
  { src: '/images/food.webp', label: '料理・店舗' },
  { src: '/images/portrait.webp', label: '人物・ライフ' },
  { src: '/images/portfolio07.webp', label: 'ショップ・カフェ' },
];

// ③ 提供価値（3本柱）
const values = [
  {
    no: '01',
    Icon: Sparkles,
    title: 'AI × 自社撮影素材',
    text: 'AIを最大限活用し、かつ素材は人の手で撮る。効率と手触りを分けて考えるからこそ、費用を抑えても、ありきたりにならないサイトを提供します。',
  },
  {
    no: '02',
    Icon: Cpu,
    title: '現場で使われるシステム開発',
    text: '誰か一人しか分からない仕事を、誰でも回せる仕組みにする。「AIを入れたいが、何から手をつければいいか分からない」。その段階から一緒に始めています。',
  },
  {
    no: '03',
    Icon: Camera,
    title: '撮影・映像制作',
    text: '写真、映像、ドローン空撮まで自分たちで撮る。サイトと素材を同じ手でつくるから、やり取りも費用も少なく済みます。',
  },
];

// ④ 選ばれる理由（なぜ、パートナーなのか。）
const reasons = [
  {
    Icon: HeartHandshake,
    title: 'はじまりに、一緒に立つ。',
    text: '事業を始める前、会社をつくったばかりの頃は、何が必要かも分からない。だから、そこから一緒に考えます。',
  },
  {
    Icon: Eye,
    title: '現場を知っている。',
    text: '写真撮影をはじめ、いくつもの現場と職種を経験してきた。机の上ではなく、現場の目線でAI活用と業務改善を考えています。',
  },
  {
    Icon: LifeBuoy,
    title: 'つくって終わりにしない。',
    text: '使い方を伝える。使ってみて出てきた不満を直す。技術に詳しくなくても、ずっと相談できる相手でいます。',
  },
];

// ⑤ こんな方へ（対象）
const targets = [
  { Icon: Rocket, text: 'これから事業を始める人、会社をつくったばかりの人' },
  { Icon: Fingerprint, text: '他社と同じようなサイトにしたくない人' },
  { Icon: Wrench, text: '紙や電話が中心の仕事、現場のある仕事を、AIで軽くしたい人' },
  { Icon: Compass, text: 'AIを入れたいが、最初の一歩が分からない人' },
];

// 開発・制作事例
const works = [
  { name: 'Knock', image: '/images/サービス紹介_knock.webp', alt: 'Knock｜建設業のための電子受発注システム' },
  { name: 'Mielba', image: '/images/サービス紹介_Mielba.webp', alt: 'Mielba｜建設業の現場情報管理・顧客管理システム' },
  { name: 'みずたま顧問', image: '/images/サービス紹介_みずたま顧問.webp', alt: 'みずたま顧問｜バックエンドの人脈管理システム' },
  { name: 'カンタン現金管理', image: '/images/サービス紹介_カンタン現金管理.webp', alt: 'カンタン現金管理｜現金の記録をスマホでカンタンに' },
];

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero — コンセプト */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center bg-brand-light">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-brand-accent/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-brand-dark/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-24 md:py-24">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* コピー */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
              <FadeIn>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-relaxed md:leading-tight mb-10 text-brand-dark">
                  はじめる会社の、<br />
                  パートナーになる。
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-sm md:text-base leading-8 text-gray-600 mb-12 max-w-lg">
                  システムをつくる。サイトをつくる。写真も映像も、自分たちで撮る。<br className="hidden md:block" />
                  借りものの素材は使わないから、どこにもないサイトになります。<br className="hidden md:block" />
                  事業のはじまりを、仕組みと見せ方の両方から支えています。
                </p>
              </FadeIn>
              <FadeIn delay={0.45}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-10 py-4 bg-brand-dark text-white text-sm tracking-widest hover:bg-brand-accent transition-colors duration-300"
                >
                  無料で相談する
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>

            {/* ビジュアル — 自社撮影の写真＋ドローン空撮 */}
            <FadeIn delay={0.35} className="w-full">
              <div className="relative max-w-sm mx-auto md:max-w-none md:mr-6">
                <div className="relative z-10 aspect-[4/5] overflow-hidden shadow-2xl">
                  <img
                    src="/images/photography_hero.webp"
                    alt="自社で撮影した建築・空間写真"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 装飾フレーム */}
                <div className="hidden md:block absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-accent z-0"></div>
                {/* ドローン空撮のインセット */}
                <div className="absolute -bottom-6 -left-5 md:-bottom-10 md:-left-10 w-28 sm:w-36 lg:w-48 aspect-square overflow-hidden shadow-xl border-4 border-brand-light z-20">
                  <img
                    src="/images/drone001.webp"
                    alt="ドローンによる空撮"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* バッジ */}
                <div className="absolute top-3 left-3 md:-top-3 md:-left-3 z-20 bg-brand-dark/90 backdrop-blur-sm text-white text-[10px] tracking-[0.2em] px-4 py-2">
                  ALL ORIGINAL
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ② 課題への共感（つかみ） */}
      <section className="py-28 md:py-40 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-6 block">CONCEPT</span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl md:text-4xl font-serif leading-relaxed md:leading-normal mb-12 text-brand-dark">
              誰でもサイトが作れる時代に、<br />
              <HighlightText>何をつくるのか。</HighlightText>
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-600 leading-9 font-light">
              AIを使えば、サイトは一日でできる。<br className="hidden md:block" />
              けれど、テンプレートと生成画像でできたサイトは、どれも同じ顔をしています。<br />
              <br />
              私たちは、自分たちで撮った写真・映像・ドローン素材でサイトを制作します。<br className="hidden md:block" />
              <span className="text-brand-dark font-normal">その会社にしかない景色</span>を、そのまま載せる。<br className="hidden md:block" />
              手間と費用はAIで抑え、浮いた分を「らしさ」にかけています。
            </p>
          </FadeIn>

          {/* 料金ダイジェスト */}
          <FadeIn delay={0.5}>
            <div className="max-w-2xl mx-auto mt-16 space-y-6">
              {/* WEBサイト制作 */}
              <div className="bg-brand-light border border-brand-accent/20 p-8 md:p-12">
                <span className="text-xs font-bold tracking-[0.2em] text-brand-accent block mb-6">WEBサイト制作</span>
                <div className="flex items-end justify-center gap-x-3 gap-y-2 flex-wrap">
                  <span className="flex items-baseline gap-1 text-brand-dark">
                    <span className="text-sm md:text-base">初期費用</span>
                    <span className="text-4xl md:text-5xl font-bold">0</span>
                    <span className="text-lg md:text-xl font-bold">円</span>
                  </span>
                  <span className="text-gray-300 text-2xl md:text-3xl font-light px-1 md:px-2">＋</span>
                  <span className="flex items-baseline gap-1 text-brand-dark">
                    <span className="text-sm md:text-base">月額</span>
                    <span className="text-4xl md:text-5xl font-bold">9,800</span>
                    <span className="text-lg md:text-xl font-bold">円</span>
                    <span className="text-lg text-gray-500">〜</span>
                  </span>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-3">
                  <span className="text-sm text-gray-600">
                    写真撮影のみ <span className="text-lg font-bold text-brand-dark ml-1">5万円〜</span>
                  </span>
                  <span className="hidden sm:inline text-gray-200">|</span>
                  <span className="text-sm text-gray-600">
                    WEB制作とセット <span className="text-lg font-bold text-brand-dark ml-1">3万円〜</span>
                  </span>
                </div>
              </div>

              {/* オリジナルシステム開発 */}
              <div className="bg-brand-light border border-brand-accent/20 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-accent">オリジナルシステム開発</span>
                  <span className="flex items-baseline gap-1 text-brand-dark">
                    <span className="text-3xl md:text-4xl font-bold">20</span>
                    <span className="text-base font-bold">万円</span>
                    <span className="text-base text-gray-500">〜</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">※価格は目安です。内容に合わせてお見積りします。</p>
            </div>
          </FadeIn>
        </div>

        {/* 自社撮影素材のギャラリー（コンセプトの証明） */}
        <div className="container mx-auto px-6 mt-20 md:mt-24">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {originalShots.map(({ src, label }) => (
              <StaggerItem key={src} className="group relative aspect-[3/4] overflow-hidden bg-brand-light">
                <img
                  src={src}
                  alt={label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white text-xs md:text-sm font-serif tracking-wider drop-shadow">
                  {label}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ③ 提供価値（3本柱） */}
      <section className="py-24 md:py-32 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">VALUE</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">私たちがやっていること</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto mt-6"></div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {values.map(({ no, Icon, title, text }) => (
              <StaggerItem
                key={no}
                className="bg-white p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-dark group-hover:text-white transition-colors duration-500">
                    <Icon size={26} />
                  </div>
                  <span className="text-4xl font-serif text-gray-200">{no}</span>
                </div>
                <h3 className="text-xl font-serif mb-4 text-brand-dark">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ④ 選ばれる理由（差別化） */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">WHY</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">なぜ、パートナーなのか。</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto mt-6"></div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid gap-6 max-w-4xl mx-auto">
            {reasons.map(({ Icon, title, text }) => (
              <StaggerItem
                key={title}
                className="flex gap-6 p-8 bg-brand-light hover:bg-brand-accent/5 transition-colors duration-500 group"
              >
                <div className="w-14 h-14 flex-shrink-0 bg-white rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-dark group-hover:text-white transition-colors duration-500">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif mb-3 text-brand-dark">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 開発・制作事例 */}
      <section id="works" className="py-24 md:py-32 bg-brand-light scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">WORKS</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">開発・制作事例</h2>
              <p className="text-sm text-gray-500 mt-6 max-w-xl mx-auto leading-relaxed">
                どれも、ひとつの会社の困りごとから生まれたシステムです。
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {works.map(({ name, image, alt }) => (
              <StaggerItem
                key={name}
                className="group overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100"
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-light">
                  <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ⑤ こんな方へ（対象） */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">FOR YOU</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">こんな方に、選ばれています。</h2>
            </FadeIn>
          </div>

          <StaggerContainer className="grid gap-4">
            {targets.map(({ Icon, text }) => (
              <StaggerItem
                key={text}
                className="flex items-center gap-5 p-6 border border-gray-200 hover:border-brand-accent/50 hover:bg-brand-light transition-colors duration-300"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-brand-light rounded-full flex items-center justify-center text-brand-accent">
                  <Icon size={22} />
                </div>
                <span className="text-base md:text-lg text-brand-dark">{text}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 補足：提携パートナー */}
      <section className="py-16 md:py-20 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-8 md:p-10 shadow-sm">
              <div className="w-14 h-14 flex-shrink-0 bg-brand-light rounded-full flex items-center justify-center text-brand-accent">
                <Handshake size={26} />
              </div>
              <div>
                <h3 className="text-lg font-serif mb-2 text-brand-dark">お金と手続きのことも、まとめて。</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  資金調達や税務のことも、相談を受けています。
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 自社撮影のパララックスバンド */}
      <section className="relative h-[52vh] md:h-[60vh] w-full overflow-hidden">
        <ParallaxImage
          src="/images/portfolio05.webp"
          alt="自社で手がけた空間演出の撮影"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-brand-dark/55"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <FadeIn>
            <p className="text-white font-serif text-xl md:text-3xl leading-relaxed md:leading-loose drop-shadow-lg">
              らしさは、既製品からは生まれない。<br />
              だから、自分たちの手で撮ります。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* クロージング */}
      <section className="py-24 md:py-32 bg-brand-dark text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-serif mb-8 leading-relaxed">
              はじまりのいちばん近くに、<br />
              いつもいる。
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm text-gray-400 mb-10 leading-relaxed">まずは、話を聞かせてください。</p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-12 py-4 bg-white text-brand-dark text-sm tracking-widest hover:bg-brand-accent hover:text-white transition-colors duration-300"
            >
              無料で相談する
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
