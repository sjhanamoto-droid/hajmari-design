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
import { FadeIn, StaggerContainer, StaggerItem, HighlightText } from '../components/Animators';

// ③ 提供価値（3本柱）
const values = [
  {
    no: '01',
    Icon: Sparkles,
    title: 'AI × オリジナル素材',
    text: 'AIの効率と、人の手による撮影素材。両方を掛け合わせるから、コストを抑えながら独自性と信頼感を両立できます。',
  },
  {
    no: '02',
    Icon: Cpu,
    title: '使いやすいシステム開発',
    text: '属人性をなくし、誰でも迷わず使えるオリジナルシステムを構築。「AIを導入したいけど何から始めれば…」という段階からご一緒します。',
  },
  {
    no: '03',
    Icon: Camera,
    title: '撮影・映像制作',
    text: '写真、映像、ドローン撮影まで一貫対応。WEBサイトと素材をまとめて任せられるので、手間もコストも最小限に。',
  },
];

// ④ 選ばれる理由（なぜ、相棒なのか。）
const reasons = [
  {
    Icon: HeartHandshake,
    title: 'はじまりの不安に、伴走します。',
    text: 'これから事業を始める方、会社を立ち上げたばかりの方。何が必要かわからない段階から、一緒に考えます。',
  },
  {
    Icon: Eye,
    title: '現場を知っているから、伝わる。',
    text: '写真撮影をはじめ、これまで多種多様な現場・職種を経験してきました。だからこそ、机上の空論ではなく、現場が本当に見える目線で、AI活用・業務改善をご提案できます。',
  },
  {
    Icon: LifeBuoy,
    title: 'つくって終わり、にしません。',
    text: '使い方のアドバイスや導入後の改善まで。技術に詳しくなくても、ずっと頼れるパートナーであり続けます。',
  },
];

// ⑤ こんな方へ（対象）
const targets = [
  { Icon: Rocket, text: 'これから事業を始める方・会社を立ち上げたばかりの方' },
  { Icon: Fingerprint, text: '「他社と似たサイトにしたくない」方' },
  { Icon: Wrench, text: 'アナログな業態や現場のある仕事で、AIを使った業務改善をしたい方' },
  { Icon: Compass, text: 'AIを導入したいが、何から始めればいいか分からない方' },
];

// 開発・制作事例
const works = [
  { name: 'Knock', image: '/images/サービス紹介_knock.png', alt: 'Knock｜建設業のための電子受発注システム' },
  { name: 'Mielba', image: '/images/サービス紹介_Mielba.png', alt: 'Mielba｜建設業の現場情報管理・顧客管理システム' },
  { name: 'みずたま顧問', image: '/images/サービス紹介_みずたま顧問.png', alt: 'みずたま顧問｜バックエンドの人脈管理システム' },
  { name: 'カンタン現金管理', image: '/images/サービス紹介_カンタン現金管理.png', alt: 'カンタン現金管理｜現金の記録をスマホでカンタンに' },
];

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero — コンセプト */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-brand-light">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-brand-accent/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-brand-dark/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-20">
          <FadeIn>
            <span className="inline-block text-xs md:text-sm tracking-[0.35em] text-brand-accent font-medium mb-8">
              FOR STARTUPS
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-relaxed md:leading-tight mb-10 text-brand-dark">
              はじめる会社の、<br />
              いちばん頼れる味方。
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-sm md:text-base leading-8 text-gray-600 mb-12 max-w-2xl">
              AIを活用したシステム開発とWEBサイト制作。<br />
              写真も映像も自社で撮るから、“どこかで見たようなサイト”にはなりません。<br className="hidden md:block" />
              あなたの事業のはじまりを、速く・安く・高品質に支えます。
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
      </section>

      {/* ② 課題への共感（つかみ） */}
      <section className="py-28 md:py-40 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-6 block">CONCEPT</span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl md:text-4xl font-serif leading-relaxed md:leading-normal mb-12 text-brand-dark">
              AIで、誰でも簡単にサイトが作れる時代。<br />
              だからこそ、<HighlightText>“みんなと同じ”</HighlightText><br />
              になっていませんか？
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-600 leading-9 font-light">
              テンプレートやAI生成画像でつくられたサイトは、<br className="hidden md:block" />
              便利な反面、どれも似た印象になりがちです。<br />
              <br />
              私たちは、自社で撮影する写真・映像・ドローン素材を組み合わせることで、<br className="hidden md:block" />
              安く・速く・高品質なうえに、<span className="text-brand-dark font-normal">“あなただけ”</span>のWEBサイトをつくります。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ③ 提供価値（3本柱） */}
      <section className="py-24 md:py-32 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">VALUE</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">私たちが提供できること</h2>
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
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">なぜ、相棒なのか。</h2>
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
                AIを活用し、会社ごとの課題に合わせて作り上げたオリジナルの一例です。
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
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">こんな方へ</h2>
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
                <h3 className="text-lg font-serif mb-2 text-brand-dark">お金や手続きの相談も、まとめてどうぞ。</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  資金調達や税務関連など、なんでもご相談ください！
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* クロージング */}
      <section className="py-24 md:py-32 bg-brand-dark text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-serif mb-8 leading-relaxed">
              あなたの事業のはじまりに、<br />
              いちばん近い味方であり続けます。
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm text-gray-400 mb-10 leading-relaxed">まずはお気軽にご相談ください！</p>
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
