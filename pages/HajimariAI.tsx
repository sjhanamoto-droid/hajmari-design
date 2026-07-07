import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Search, PenTool, Cpu, Rocket, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animators';

// 進め方（4ステップ）
const steps = [
  {
    Icon: Search,
    step: '01',
    title: '業務を知る',
    text: '現状の業務の流れ・課題をヒアリング。ゼロから作るのではなく、既にある仕組みを起点に考えます。',
  },
  {
    Icon: PenTool,
    step: '02',
    title: '体験から設計',
    text: 'UI/UXの視点で、使う人にとって「本当に使われる」形を設計。現場に馴染む導線を描きます。',
  },
  {
    Icon: Cpu,
    step: '03',
    title: 'AIで作り込む',
    text: 'AIを活用し、その会社専用のオリジナルシステムへ。パッと出力して終わりにせず、作り込みます。',
  },
  {
    Icon: Rocket,
    step: '04',
    title: '運用まで伴走',
    text: '作って終わりにしない。動画・ロゴ・運用まで、仕事の方法そのものに関わり続けます。',
  },
];

// 開発事例
const works = [
  { name: 'Knock', image: '/images/サービス紹介_knock.png', alt: 'Knock｜建設業のための電子受発注システム' },
  { name: 'Mielba', image: '/images/サービス紹介_Mielba.png', alt: 'Mielba｜建設業の現場情報管理・顧客管理システム' },
  { name: 'みずたま顧問', image: '/images/サービス紹介_みずたま顧問.png', alt: 'みずたま顧問｜バックエンドの人脈管理システム' },
  { name: 'カンタン現金管理', image: '/images/サービス紹介_カンタン現金管理.png', alt: 'カンタン現金管理｜現金の記録をスマホでカンタンに' },
];

// 提供できること
const services = [
  'AIを活用した業務効率化・業務改善システムの開発',
  '会社に合わせたオリジナルシステムの設計・構築',
  'ホームページ制作（写真・映像でオリジナルに）',
  'AI活用のアドバイス・使い方の伴走支援',
  '写真撮影（ドローン空撮含む）・映像制作',
  'ロゴ・グラフィックなどのデザイン',
  '導入後の運用サポート・改善提案',
];

const HajimariAI: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center justify-center bg-brand-light">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-brand-accent/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-dark/5 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 py-24 relative z-10 flex flex-col items-center text-center">
          <FadeIn>
            <span className="inline-block text-xs md:text-sm tracking-[0.35em] text-brand-accent font-medium mb-6">
              AI × SYSTEM DEVELOPMENT
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-wide text-brand-dark">HAJMARI</h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-base md:text-xl text-gray-600 font-serif leading-relaxed max-w-2xl">
              写真も、映像も、システムも。すべて、オリジナルで。<br className="hidden md:block" />
              安く・早く・高品質な、あなただけのWEBとシステムを。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-serif mb-6 leading-relaxed text-brand-dark">
                ゼロから作らない、<br />
                という選択。
              </h2>
              <div className="space-y-6 text-gray-600 leading-8">
                <p>
                  システム開発というと、すべてを一から作り上げる大掛かりなものを想像しがちです。
                  しかしAIを活用すれば、既にある業務の流れを起点に、最短距離で「会社にフィットする仕組み」をつくることができます。
                </p>
                <p>
                  HAJMARI は、AIでパッと出力して終わりにするのではなく、その会社専用のオリジナルシステムへと作り込みます。
                  UI/UXデザインからシステム開発に携わってきた経験を活かし、現場で本当に使われるものを、運用まで伴走しながら形にします。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-brand-light p-8 md:p-10">
                <p className="text-xs tracking-widest text-brand-accent font-medium mb-6">HAJMARI が関わる領域</p>
                <StaggerContainer className="space-y-4">
                  {['AIシステム開発・業務改善', 'ホームページ制作', '写真・映像・ドローン撮影', 'デザイン（ロゴ・グラフィック）', 'AI活用のアドバイス・伴走'].map((item) => (
                    <StaggerItem key={item} className="flex items-center gap-3">
                      <CheckCircle className="text-brand-accent flex-shrink-0" size={18} />
                      <span className="text-sm text-brand-dark">{item}</span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24 md:py-32 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">FLOW</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">進め方</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto mt-6"></div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {steps.map(({ Icon, step, title, text }) => (
              <StaggerItem key={step} className="bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-dark group-hover:text-white transition-colors duration-500">
                    <Icon size={26} />
                  </div>
                  <span className="text-3xl font-serif text-gray-200">{step}</span>
                </div>
                <h3 className="text-lg font-serif mb-3 text-brand-dark">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Works */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-4 block">WORKS</span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark">開発事例</h2>
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

      {/* Service List */}
      <section className="bg-brand-dark text-white py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-serif mb-12 text-center">提供できること</h2>
          </FadeIn>
          <StaggerContainer className="grid gap-4">
            {services.map((item, idx) => (
              <StaggerItem
                key={idx}
                className="flex items-center gap-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors cursor-default"
              >
                <CheckCircle className="text-brand-accent flex-shrink-0" size={20} />
                <span className="text-lg font-light tracking-wide">{item}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="text-center mt-16">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-dark text-sm tracking-widest hover:bg-brand-accent hover:text-white transition-colors duration-300"
              >
                無料で相談する
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default HajimariAI;
