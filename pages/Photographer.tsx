import React from 'react';
import { MapPin, Users, Globe } from 'lucide-react';
import { FadeIn, ParallaxImage, StaggerContainer, StaggerItem } from '../components/Animators';

const Photographer: React.FC = () => {
  return (
    <div className="w-full">
       {/* Hero */}
       <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <ParallaxImage 
          src="/images/photography_hero.jpg"
          alt="Modern Architecture Interior" 
          className="absolute inset-0 w-full h-full brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl text-brand-dark font-serif font-bold mb-6 tracking-wide drop-shadow-lg">
              民泊・宿泊施設の<br className="md:hidden" />「売れる写真」を。
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-brand-dark font-light tracking-widest drop-shadow-md">
              建築×宿運営×写真。<br/>
              3つの視点で、予約率を上げる一枚を撮影します。
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
                  src="/images/top_photographer.jpg"
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
                   私は単なるカメラマンではありません。大学で建築を学び、卒業後は古民家オーベルジュの立ち上げにも携わりました。
                 </p>
                 <p>
                   「建物の構造的な魅力」と「宿泊者が求める体験」。
                   この両方を深く理解しているからこそ、単に綺麗なだけでなく、動線や光の入り方、ゲストが過ごす時間を想像させる「情報設計」としての撮影が可能です。
                 </p>
               </div>
               
               <StaggerContainer className="space-y-4 mt-10">
                 <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                    <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                    <span className="font-serif text-lg">建築学科卒の空間理解力</span>
                 </StaggerItem>
                 <StaggerItem className="flex items-center gap-4 p-4 bg-brand-light rounded-lg">
                    <span className="w-3 h-3 bg-brand-accent rounded-full flex-shrink-0"></span>
                    <span className="font-serif text-lg">宿運営経験に基づくゲスト視点</span>
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

      {/* Logic for "Selling" Photos */}
      <section className="bg-brand-light py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl font-serif mb-4">予約率を上げるためのロジック</h2>
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

      {/* Other Services */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-xs font-bold text-gray-400 tracking-widest block mb-2">OTHERS</span>
                <h2 className="text-3xl font-serif">その他の撮影サービス</h2>
              </div>
              <p className="text-sm text-gray-500 mt-4 md:mt-0 max-w-md text-right">
                民泊撮影以外にも、ビジネスに必要なクリエイティブ全般に対応します
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             <StaggerItem className="group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer">
               <img src="/images/portrait.jpg" alt="Portrait" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white font-serif text-xl tracking-widest border-b border-white pb-1">人物・プロフィール</span>
               </div>
             </StaggerItem>
             <StaggerItem className="group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer">
               <img src="/images/food.jpg" alt="Food" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white font-serif text-xl tracking-widest border-b border-white pb-1">料理・店舗</span>
               </div>
             </StaggerItem>
             <StaggerItem className="group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer">
               <img src="/images/drone001.jpg" alt="Drone" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-white font-serif text-xl tracking-widest border-b border-white pb-1">ドローン空撮</span>
               </div>
             </StaggerItem>
             <StaggerItem className="group relative aspect-square overflow-hidden bg-gray-200 cursor-pointer">
               <img src="/images/pv.jpg" alt="Video" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
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