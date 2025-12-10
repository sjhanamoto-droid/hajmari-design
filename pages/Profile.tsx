import React from 'react';
import { FadeIn, ParallaxImage } from '../components/Animators';

const Profile: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <ParallaxImage 
          src="/images/about_hero.jpg" 
          alt="Masaki Hanamoto Portrait" 
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white text-center px-6">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-widest mb-4">
              Masaki Hanamoto
            </h1>
            <p className="text-sm md:text-base tracking-[0.3em] font-light">
              PHOTOGRAPHER / DESIGNER
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-24 md:py-32 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <div className="w-full md:w-3/5 space-y-12">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-serif leading-relaxed mb-8">
                「はじまり」の景色を、<br/>
                もっと美しく、もっと確かに。
              </h2>
              <div className="space-y-6 text-gray-600 leading-8 font-light text-justify">
                <p>
                  SJ Design 代表の花本昌樹です。
                  私は「写真」というフィルターを通して、空間やブランドが持つ本来の価値を可視化することを生業としています。
                </p>
                <p>
                  大学では建築を専攻し、建物の構造や空間の在り方を学びました。
                  その後、自身で物件のフルイノベーションや古民家再生の立ち上げと運営に携わる中で、「素晴らしい場所であっても、その魅力が正しく伝わらなければ、人は訪れない」という現実を目の当たりにしました。
                </p>
                <p>
                  そこで気づいたのは、クリエイティブにおける「一貫性」の重要性です。
                  写真だけが良くても、Webサイトが使いにくければ意味がない。ロゴが美しくても、全体のトーンと合っていなければ記憶に残らない。
                </p>
                <p>
                  だからこそ、私はフォトグラファーとしての視点を軸に、ロゴデザインからWeb制作までをワンストップで手がける現在のスタイルに行き着きました。
                  創業期という、最もエネルギーが必要な時期に、迷いなく走れるための「c」をつくるお手伝いをさせてください。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border-t border-gray-200 pt-10">
                <h3 className="text-lg font-serif mb-4 tracking-widest text-brand-accent">CAREER</h3>
                <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex gap-4">
                    <span className="font-bold w-24 flex-shrink-0">2018~2019</span>
                    <span>スケートボードで日本縦断（北海道~沖縄）</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold w-24 flex-shrink-0">2020</span>
                    <span>一級建築士の元に弟子入り。単独でマンション一室のフルリノベーションを施工</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold w-24 flex-shrink-0">2021</span>
                    <span>東京都市大学 工学部 建築学科 卒業</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold w-24 flex-shrink-0">2021-2022</span>
                    <span>千葉県いすみ市 泊まれる古民家レストラン&グランピング『LUMP COURT ISUMI』 立ち上げ・運営</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-bold w-24 flex-shrink-0">2023</span>
                    <span>SJDESIGN 設立</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar / Image */}
          <div className="w-full md:w-2/5 md:sticky md:top-32">
            <FadeIn delay={0.3}>
              <img 
                src="/images/about_profile.jpg"
                alt="Working" 
                className="w-full h-auto shadow-xl mb-6"
              />
              <div className="bg-brand-light p-6">
                <p className="font-serif text-lg mb-2">花本 昌樹</p>
                <p className="text-xs text-gray-500 mb-4">Masaki Hanamoto</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  東京都杉並区出身。建築と写真の知見を活かし、民泊・宿泊施設のブランディング撮影で多数の実績を持つ。
                  「空気感を撮る」ことを信条とし、国内外のゲストに響くビジュアル制作を得意とする。
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Profile;