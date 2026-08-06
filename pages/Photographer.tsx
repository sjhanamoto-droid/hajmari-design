import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Building2, Plane, Globe, MapPin, Users, X, ArrowRight } from 'lucide-react';
import { FadeIn, ParallaxImage, StaggerContainer, StaggerItem } from '../components/Animators';
import { motion, AnimatePresence } from 'framer-motion';

const Photographer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // 撮影の3本柱
  const pillars = [
    {
      icon: Camera,
      en: 'PORTRAIT',
      jp: 'ポートレート',
      img: '/images/portrait.webp',
      desc: '経営者・士業・チームの信頼感を引き出すプロフィール撮影。表情と佇まいから、その人の「人柄」までを伝えます。',
    },
    {
      icon: Building2,
      en: 'ARCHITECTURE',
      jp: '物件・建築',
      img: '/images/property/property01.webp',
      desc: '民泊・宿泊施設・店舗・住宅。構造の魅力とそこで過ごす体験を両立させ、予約率・成約率を上げる一枚を設計します。',
    },
    {
      icon: Plane,
      en: 'AERIAL',
      jp: '空撮',
      img: '/images/drone001.webp',
      desc: 'ドローンによる俯瞰の視点。立地や周辺環境、建物のスケール感を、地上からは捉えられないアングルで表現します。',
    },
  ];

  // ポートレート作例
  const portraitImages = [
    { src: '/images/portrait.webp', alt: 'ポートレート撮影事例1' },
    { src: '/images/profile001.webp', alt: 'ポートレート撮影事例2' },
    { src: '/images/profile002.webp', alt: 'ポートレート撮影事例3' },
    { src: '/images/profile003.webp', alt: 'ポートレート撮影事例4' },
    { src: '/images/profile004.webp', alt: 'ポートレート撮影事例5' },
  ];

  const propertyImages = Array.from({ length: 26 }, (_, i) => ({
    src: `/images/property/property${String(i + 1).padStart(2, '0')}.webp`,
    alt: `物件・建築写真撮影事例${i + 1}`
  }));

  const displayedImages = showMore ? propertyImages : propertyImages.slice(0, 9);

  return (
    <div className="w-full">
       {/* Hero */}
       <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <ParallaxImage
          src="/images/photography_hero.webp"
          alt="Modern Architecture Interior"
          className="absolute inset-0 w-full h-full brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl text-brand-dark font-serif font-bold mb-6 tracking-wide drop-shadow-lg">
              ポートレート・建築・空撮。<br/>
              3つの視点で「伝わる一枚」を。
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-brand-dark font-light tracking-widest drop-shadow-md">
              人の魅力、空間の構造、俯瞰の風景。<br/>
              建築とビジネスを理解するカメラマンが、目的から逆算して撮影します。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Expert Profile */}
      <section className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative">
            <FadeIn>
              <div className="relative z-10">
                 <img
                  src="/images/top_photographer.webp"
                  alt="Photographer working"
                  className="w-full h-auto rounded-sm shadow-2xl"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-accent z-0 hidden md:block"></div>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2">
             <FadeIn delay={0.2}>
               <span className="text-brand-accent font-bold tracking-widest text-xs mb-4 block">SPECIALTY</span>
               <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-snug">
                 構造を知り、運営を知る。<br/>
                 だから、「伝わる」。
               </h2>
               <div className="space-y-6 text-gray-600 leading-8">
                 <p>
                   ただ写真を撮るカメラマンではなく、建築を学び、古民家オーベルジュの立ち上げにも携わってきました。
                 </p>
                 <p>
                   空間の構造、人の表情、俯瞰で捉える風景。被写体は違っても、「何を伝えたいか」から逆算して光と構図を設計する姿勢は変わりません。
                 </p>
               </div>

               <StaggerContainer className="space-y-4 mt-10">
                 <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                    <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                    <span className="font-serif text-lg">建築設計/施工経験からの空間理解力</span>
                 </StaggerItem>
                 <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                    <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                    <span className="font-serif text-lg">宿運営経験に基づく「伝わる」視点</span>
                 </StaggerItem>
                 <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                    <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                    <span className="font-serif text-lg">インバウンド（海外客）好みの色彩編集</span>
                 </StaggerItem>
               </StaggerContainer>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Web × Photography — 強み & 料金 */}
      <section className="bg-brand-dark text-white py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14">
            <FadeIn>
              <span className="text-xs font-bold tracking-[0.3em] text-brand-accent block mb-6">WEB × PHOTOGRAPHY</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-snug">
                撮る人が、そのまま<br className="md:hidden" />「Webサイト」まで作る。
              </h2>
              <p className="text-base md:text-lg text-gray-300 font-light leading-8 max-w-3xl mx-auto">
                AIで、誰でも同じようなWebサイトが作れる時代。<br className="hidden md:block" />
                だからこそ、本物の写真が「オリジナリティ」と「信頼」をつくります。
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <p className="text-gray-400 leading-8 max-w-3xl mx-auto text-center mb-16 text-sm md:text-base">
              撮影からWeb制作までを、フォトグラファー自身が一貫して担当。外注のストック写真ではなく、あなたのための一枚でサイトを組み立てます。だから“どこかで見た”にならない、あなただけのサイトになります。
            </p>
          </FadeIn>

          {/* Pricing */}
          <StaggerContainer className="grid md:grid-cols-2 gap-6 md:gap-8">
            <StaggerItem className="bg-white text-brand-dark p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-brand-accent">
                <Globe size={22} />
                <span className="text-xs font-bold tracking-widest">WEB PRODUCTION</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-6">Webサイト制作</h3>
              <div>
                <span className="inline-block bg-brand-accent/10 text-brand-accent text-sm font-bold px-3 py-1 rounded-full">初期制作費 0円</span>
              </div>
              <div className="flex items-end gap-1 mt-5 mb-4">
                <span className="text-sm text-gray-500 mb-2">月額</span>
                <span className="text-4xl font-bold">¥9,800</span>
                <span className="text-lg text-gray-500 mb-1">〜</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mt-auto">
                LP（ランディングページ）の場合。制作費は無料。公開後の運用・更新サポートまで含みます。
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white text-brand-dark p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6 text-brand-accent">
                <Camera size={22} />
                <span className="text-xs font-bold tracking-widest">PHOTOGRAPHY</span>
              </div>
              <h3 className="text-xl font-serif font-bold mb-6">写真撮影</h3>
              <div>
                <span className="inline-block bg-brand-accent/10 text-brand-accent text-sm font-bold px-3 py-1 rounded-full">別途オプション</span>
              </div>
              <div className="flex items-end gap-1 mt-5 mb-4">
                <span className="text-4xl font-bold">¥30,000</span>
                <span className="text-lg text-gray-500 mb-1">〜</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mt-auto">
                ポートレート・物件・空撮に対応。サイトに合わせて、オリジナルの撮影を行います。
              </p>
            </StaggerItem>
          </StaggerContainer>

          <p className="text-center text-xs text-gray-500 mt-8">
            ※価格は目安です。内容・ボリュームに応じてお見積もりいたします。
          </p>

          <FadeIn delay={0.2}>
            <div className="text-center mt-14">
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

      {/* Three Pillars */}
      <section className="bg-brand-light py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">WHAT WE SHOOT</span>
              <h2 className="text-3xl font-serif mb-4">撮影の3本柱</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto"></div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem
                  key={pillar.en}
                  className="group bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={pillar.img}
                      alt={pillar.jp}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3 text-brand-accent">
                      <Icon size={22} />
                      <span className="text-xs font-bold tracking-widest">{pillar.en}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 font-serif">{pillar.jp}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Portrait Works */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">PORTRAIT</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">ポートレートの撮影事例</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto"></div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {portraitImages.map((item, idx) => (
              <StaggerItem
                key={idx}
                className="group relative overflow-hidden bg-gray-200 rounded-sm cursor-pointer"
              >
                <div
                  onClick={() => setSelectedImage(item.src)}
                  className="w-full h-full relative"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Property / Architecture Works */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">ARCHITECTURE</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">物件・建築の撮影事例</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto"></div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedImages.map((item, idx) => (
              <StaggerItem
                key={idx}
                className="group relative overflow-hidden bg-gray-200 rounded-sm cursor-pointer"
              >
                <div
                  onClick={() => setSelectedImage(item.src)}
                  className="w-full h-full relative"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {!showMore && propertyImages.length > 9 && (
            <div className="text-center mt-12">
              <FadeIn>
                <button
                  onClick={() => setShowMore(true)}
                  className="inline-block border border-brand-dark px-12 py-4 text-sm tracking-widest hover:bg-brand-dark hover:text-white transition-colors duration-300"
                >
                  MORE
                </button>
              </FadeIn>
            </div>
          )}
        </div>
      </section>

      {/* Logic for "Selling" Photos (Architecture) */}
      <section className="bg-brand-light py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">ARCHITECTURE</span>
              <h2 className="text-3xl font-serif mb-4">民泊・宿泊施設で「成果を出す」ための撮影ロジック</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto"></div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6 text-brand-accent"><Globe size={36} /></div>
              <h3 className="text-xl font-bold mb-4 font-serif">1. ヒーロー画像の最適化</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                OTA（Airbnb/Booking.com）での検索一覧で、クリックされるかどうかは1枚目の写真で決まります。競合と差別化し、視線を止めるための明るさと構図を徹底的に計算します。
              </p>
            </StaggerItem>
            <StaggerItem className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6 text-brand-accent"><MapPin size={36} /></div>
              <h3 className="text-xl font-bold mb-4 font-serif">2. ストーリーテリング</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                「部屋の広さ」だけでなく「そこでどんな時間が過ごせるか」を撮ります。コーヒーを飲むシーン、窓からの景色など、体験を想起させるカットを織り交ぜます。
              </p>
            </StaggerItem>
            <StaggerItem className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6 text-brand-accent"><Users size={36} /></div>
              <h3 className="text-xl font-bold mb-4 font-serif">3. 海外ゲスト対応</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                欧米系、アジア系など、ターゲットとする客層に合わせて写真のトーン（色温度やコントラスト）を調整。インバウンド需要を取り込むためのビジュアル戦略を提案します。
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Aerial Feature */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">AERIAL</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">空撮の撮影事例</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto"></div>
            </div>
          </FadeIn>

          {/* 空撮素材が増えたら、この2カラムをグリッドギャラリーに拡張できます */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div
                onClick={() => setSelectedImage('/images/drone001.webp')}
                className="group relative overflow-hidden bg-gray-200 rounded-sm cursor-pointer"
              >
                <img
                  src="/images/drone001.webp"
                  alt="ドローン空撮の撮影事例"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none"></div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-2xl md:text-3xl font-serif mb-6 leading-snug">
                空から捉える、<br/>立地とスケールの説得力。
              </h3>
              <p className="text-gray-600 leading-8 mb-8">
                物件の魅力は、建物単体だけでは伝わりません。周辺環境や街並み、海や山との距離感。ドローンによる空撮は、その土地ならではの価値を一枚で語ります。
              </p>
              <StaggerContainer className="space-y-4">
                <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                  <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                  <span className="font-serif text-lg">立地・アクセスの良さを俯瞰で訴求</span>
                </StaggerItem>
                <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                  <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                  <span className="font-serif text-lg">建物と周辺環境のスケール感を可視化</span>
                </StaggerItem>
                <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                  <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                  <span className="font-serif text-lg">観光地・自然環境とのつながりを表現</span>
                </StaggerItem>
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-300 backdrop-blur-sm"
                aria-label="閉じる"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="拡大画像"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Other Services */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">OTHERS</span>
                <h2 className="text-3xl font-serif">その他の撮影・制作</h2>
              </div>
              <p className="text-sm text-gray-500 mt-4 md:mt-0 max-w-md text-right">
                3本柱以外にも、ビジネスに必要なクリエイティブ全般に対応します
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
             <StaggerItem className="group relative aspect-[16/9] overflow-hidden bg-gray-200 cursor-pointer">
               <img src="/images/food.webp" alt="Food" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white font-serif text-xl tracking-widest border-b border-white pb-1">料理・店舗</span>
               </div>
             </StaggerItem>
             <StaggerItem className="group relative aspect-[16/9] overflow-hidden bg-gray-200 cursor-pointer">
               <img src="/images/pv.webp" alt="Video" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white font-serif text-xl tracking-widest border-b border-white pb-1">PR動画制作</span>
               </div>
             </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
};

export default Photographer;
