import React from 'react';
import { CheckCircle, Layers, Clock, CreditCard } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, ParallaxImage } from '../components/Animators';

const HajimariDesign: React.FC = () => {
  return (
    <div className="w-full">
      
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-light"></div>
        <div className="container mx-auto px-6 py-20 relative z-10 flex flex-col items-center text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-wide">HAJMARI Design</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-500 font-serif mb-10">創業期に特化した、トータルブランディング。</p>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 w-full h-[30vh] md:h-[40vh] max-w-5xl mx-auto left-0 right-0 translate-y-1/2 shadow-2xl">
          <ParallaxImage 
            src="https://picsum.photos/1200/600?random=3" 
            alt="Branding Workshop" 
            className="w-full h-full"
          />
        </div>
      </section>

      <div className="h-32 md:h-48 bg-brand-light"></div>

      {/* Problem & Solution */}
      <section className="bg-brand-light py-24 pt-0">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <FadeIn>
                <h2 className="text-2xl font-serif mb-6 leading-relaxed">
                  「何から始めればいいか分からない」<br/>
                  そんな創業期の悩みを解決します。
                </h2>
                <div className="space-y-6 text-gray-600 leading-7 text-justify">
                  <p>
                    創業時はロゴ、Webサイト、名刺、そしてそれらを彩る写真と、準備すべきものが山積みです。
                    しかし、それぞれを別の業者に依頼すると、デザインのトーンが揃わず、コミュニケーションコストも膨大になります。
                  </p>
                  <p>
                    HAJMARI Designは、「写真」を起点にすべてのデザインツールを一貫して制作。
                    世界観の統一された美しいブランドを、効率的に立ち上げることが可能です。
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <div className="order-1 md:order-2">
              <StaggerContainer className="grid grid-cols-2 gap-4">
                 <StaggerItem className="bg-white p-6 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                   <div className="h-2 w-10 bg-gray-200 mb-4"></div>
                   <p className="font-serif text-lg mb-2">Logo</p>
                   <p className="text-xs text-gray-400">ブランドの顔となる<br/>ロゴ制作</p>
                 </StaggerItem>
                 <StaggerItem className="bg-white p-6 shadow-sm rounded-sm translate-y-4 hover:shadow-md transition-shadow">
                   <div className="h-2 w-10 bg-gray-200 mb-4"></div>
                   <p className="font-serif text-lg mb-2">Web</p>
                   <p className="text-xs text-gray-400">STUDIOによる<br/>サイト構築</p>
                 </StaggerItem>
                 <StaggerItem className="bg-white p-6 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                   <div className="h-2 w-10 bg-gray-200 mb-4"></div>
                   <p className="font-serif text-lg mb-2">Photo</p>
                   <p className="text-xs text-gray-400">プロによる<br/>プロフィール撮影</p>
                 </StaggerItem>
                 <StaggerItem className="bg-white p-6 shadow-sm rounded-sm translate-y-4 hover:shadow-md transition-shadow">
                   <div className="h-2 w-10 bg-gray-200 mb-4"></div>
                   <p className="font-serif text-lg mb-2">Paper</p>
                   <p className="text-xs text-gray-400">名刺・資料の<br/>デザイン</p>
                 </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Strong Points */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl font-serif mb-4">選ばれる3つの理由</h2>
              <div className="w-10 h-[2px] bg-brand-accent mx-auto"></div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <StaggerItem className="text-center p-8 hover:bg-gray-50 transition-colors rounded-lg group">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent group-hover:bg-brand-dark group-hover:text-white transition-colors duration-500">
                <Layers size={32} />
              </div>
              <h3 className="text-xl font-serif mb-4">圧倒的な統一感</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                フォトグラファーがディレクションを行うため、写真のトーンとWebデザインが完全に調和します。視覚的なノイズのない、信頼感のあるブランドイメージを構築します。
              </p>
            </StaggerItem>

            {/* Feature 2 */}
            <StaggerItem className="text-center p-8 hover:bg-gray-50 transition-colors rounded-lg group">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent group-hover:bg-brand-dark group-hover:text-white transition-colors duration-500">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-serif mb-4">ワンストップ・短納期</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                窓口が一つであるため、打ち合わせの手間を最小限に。少人数精鋭チームによる制作で、スピーディーにビジネスの「はじまり」をサポートします。
              </p>
            </StaggerItem>

            {/* Feature 3 */}
            <StaggerItem className="text-center p-8 hover:bg-gray-50 transition-colors rounded-lg group">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent group-hover:bg-brand-dark group-hover:text-white transition-colors duration-500">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-serif mb-4">創業に優しい分割払い</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                資金繰りが不安な創業期に配慮し、全プランで最大12回のクレジットカード分割払いに対応。初期費用を抑えて、質の高いクリエイティブを導入できます。
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Service List Details */}
      <section className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-6 max-w-4xl">
           <FadeIn>
             <h2 className="text-3xl font-serif mb-12 text-center">提供サービス内容</h2>
           </FadeIn>
           <StaggerContainer className="grid gap-6">
             {[
               "ロゴデザイン制作（ご提案2〜3案）",
               "名刺デザイン制作（印刷代行可）",
               "Webサイト構築（STUDIO実装 / 1〜3ページ）",
               "Web用プロフィール写真・イメージ写真撮影",
               "店舗・オフィスの内外観撮影",
               "営業資料（PowerPoint/Google Slide）テンプレート制作"
             ].map((item, idx) => (
               <StaggerItem key={idx} className="flex items-center gap-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors cursor-default">
                 <CheckCircle className="text-brand-accent flex-shrink-0" size={20} />
                 <span className="text-lg font-light tracking-wide">{item}</span>
               </StaggerItem>
             ))}
           </StaggerContainer>
        </div>
      </section>

    </div>
  );
};

export default HajimariDesign;