import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animators';

const ProfilePhotoPlan: React.FC = () => {
  return (
    <div className="w-full pt-24 md:pt-28 pb-24">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/images/portrait.jpg"
          alt="Profile photography"
          className="w-full h-[320px] md:h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <FadeIn>
            <div className="text-center text-white space-y-4">
              <p className="text-xs tracking-[0.25em] uppercase text-brand-light/80">Plan</p>
              <h1 className="text-3xl md:text-5xl font-serif font-bold">プロフィール写真撮影</h1>
              <p className="text-sm md:text-base text-brand-light/90">
                仕事につながるプロフィール写真を。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-16 space-y-16 max-w-5xl">
        {/* About Section */}
        <section className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">プロフィール写真撮影について</h2>
            <div className="space-y-6 text-gray-600 leading-8">
              <p>
                プロフィール写真は、ただ見た目を整えるための写真ではなく、「この人に頼みたい」と思ってもらうための大切な入口だと考えています。
              </p>
              <p>
                当サービスでは、撮影前にオンラインでのヒアリング（約30分）を行い、使用目的と写真イメージを共有した上で撮影を行います。
              </p>
              <p>
                HP・SNS・名刺・営業資料など、「どこで・どのように使うか」を整理することで、とりあえず撮った写真ではなく、仕事につながるプロフィール写真に仕上げます。
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Plan Overview */}
        <section className="space-y-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">プランについて</h2>
            <p className="text-gray-600 leading-8">
              すべてのプランに、<strong>使用目的・写真イメージのヒアリング（Zoom 約30分）</strong>を含みます。
            </p>
            <p className="text-xs text-gray-500 mt-4 leading-6">
              ・撮影場所はご希望の場所にて対応可能です<br />
              　※スタジオ・レンタルスペース利用時の場所代はお客様ご負担となります
            </p>
          </FadeIn>
        </section>

        {/* Plan 1 */}
        <section className="bg-white border border-gray-100 p-8 md:p-10 rounded-sm shadow-sm">
          <FadeIn>
            <div className="mb-6">
              <span className="text-xs tracking-[0.2em] text-brand-accent font-bold uppercase mb-2 block">プラン①</span>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">枚数は少なく、しっかり整えたい方へ</h3>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-4xl font-bold text-brand-dark">¥27,500</span>
                <span className="text-sm text-gray-500">税込</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-base font-semibold text-brand-dark mb-4">内容</h4>
                <ul className="space-y-2 text-gray-600 leading-7 text-sm">
                  <li>・撮影料・データ作成料込み</li>
                  <li>・納品データ：5枚</li>
                  <li>・撮影時間：30分〜1時間程度</li>
                  <li>・オンラインアルバムにてデータ納品</li>
                  <li>・スタジオ／ロケーション対応</li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-brand-dark mb-4">こんな方に</h4>
                <ul className="space-y-2 text-gray-600 leading-7 text-sm">
                  <li>・SNS・名刺・プロフィール写真を整えたい方</li>
                  <li>・枚数より「きちんとした1枚」を重視したい方</li>
                  <li>・初めてプロフィール写真を撮る方</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Images after Plan 1 */}
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="w-full overflow-hidden rounded-sm">
              <img
                src="/images/profile001.jpg"
                alt="プロフィール写真撮影の実例1"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
            <div className="w-full overflow-hidden rounded-sm">
              <img
                src="/images/profile002.jpg"
                alt="プロフィール写真撮影の実例2"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
          </div>
        </FadeIn>

        {/* Plan 2 */}
        <section className="bg-brand-light border border-gray-100 p-8 md:p-10 rounded-sm shadow-sm">
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs tracking-[0.2em] text-brand-accent font-bold uppercase">プラン②</span>
                <span className="text-xs bg-brand-accent text-white px-2 py-1 rounded">おすすめ</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">仕事にしっかり使える写真が欲しい方</h3>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-4xl font-bold text-brand-dark">¥44,000</span>
                <span className="text-sm text-gray-500">税込</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-base font-semibold text-brand-dark mb-4">内容</h4>
                <ul className="space-y-2 text-gray-600 leading-7 text-sm">
                  <li>・撮影料・データ作成料込み</li>
                  <li>・納品データ：30枚前後</li>
                  <li>・撮影時間：1時間半〜2時間程度</li>
                  <li>・オンラインアルバムにてデータ納品</li>
                  <li>・表情・構図違いを含む複数パターン撮影</li>
                  <li>・使用媒体を想定した構図設計</li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-brand-dark mb-4">こんな方に</h4>
                <ul className="space-y-2 text-gray-600 leading-7 text-sm">
                  <li>・HP・LP・SNSなど複数媒体で使用したい方</li>
                  <li>・「人柄」で選ばれる仕事をしている方</li>
                  <li>・今後の活動を見据えて写真を整えたい方</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Images after Plan 2 */}
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="w-full overflow-hidden rounded-sm">
              <img
                src="/images/profile003.jpg"
                alt="プロフィール写真撮影の実例3"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
            <div className="w-full overflow-hidden rounded-sm">
              <img
                src="/images/profile004.jpg"
                alt="プロフィール写真撮影の実例4"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
          </div>
        </FadeIn>

        {/* Options */}
        <section className="space-y-6">
          <FadeIn>
            <h2 className="text-2xl font-serif font-bold">オプション</h2>
            <p className="text-gray-600 leading-8 mb-6">
              撮影内容やご要望に応じて、以下のオプションをご用意しています。
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'ヘアメイク（アテンド付き）', price: '￥15,000〜' },
              { title: '撮影時間延長', price: '￥11,000／30分' },
              { title: '追加納品', price: '￥3,300／1カット' },
            ].map((opt, idx) => (
              <StaggerItem key={opt.title} delay={idx * 0.05} className="bg-white border border-gray-100 p-5 shadow-sm">
                <h3 className="text-base font-semibold text-brand-dark mb-2">{opt.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{opt.price}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="text-sm text-gray-500 italic">※内容に応じて、その他のご相談も承ります。</p>
        </section>

        {/* Flow */}
        <section className="space-y-6">
          <FadeIn>
            <h2 className="text-2xl font-serif font-bold">撮影までの流れ</h2>
          </FadeIn>
          <StaggerContainer className="space-y-8">
            {[
              { 
                title: '1. お問い合わせ', 
                desc: 'フォームまたはLINEよりご連絡ください。ご希望の撮影内容・時期などを簡単にお伺いします。'
              },
              { 
                title: '2. 撮影前ヒアリング（Zoom／約30分）', 
                desc: '使用目的の整理、写真のイメージ・方向性のすり合わせ、服装・背景・撮影場所のご相談、撮影当日の流れ確認を行います。',
                note: '※事前にイメージを共有することで、撮影当日をスムーズに進め、仕上がりの精度を高めます。'
              },
              { 
                title: '3. 撮影当日', 
                desc: 'スタジオまたはご希望のロケーションにて撮影を行います。表情や構図を確認しながら進めますので、撮影に慣れていない方もご安心ください。'
              },
              { 
                title: '4. データ納品', 
                desc: 'セレクト・編集後、オンラインアルバムにてデータを納品いたします。'
              },
            ].map((step, idx) => (
              <StaggerItem key={step.title} delay={idx * 0.1} className="bg-white border border-gray-100 p-6 md:p-8 shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold text-brand-dark mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-7 mb-2">{step.desc}</p>
                {step.note && (
                  <p className="text-sm text-gray-500 italic mt-3">{step.note}</p>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Note */}
        <section className="space-y-3 text-sm text-gray-600 leading-7 bg-white border border-gray-100 p-6 md:p-8 rounded-sm shadow-sm">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">注意事項</h3>
          <ul className="space-y-3">
            <li>・撮影場所はご希望の場所にて対応可能です<br className="hidden md:block" />　※スタジオ・レンタルスペース利用時の場所代はお客様ご負担となります</li>
            <li>・交通費は別途となります</li>
            <li>・修正は<strong>明るさ・色味の調整のみ</strong>となります<br className="hidden md:block" />　※大幅な加工・合成は別途ご相談ください</li>
            <li>・金額の値下げ対応は行っておりません<br className="hidden md:block" />　※撮影時間・納品枚数の調整は可能です</li>
            <li>・天候や体調不良など、やむを得ない事情による日程変更については柔軟に対応いたします</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="text-center space-y-4">
          <FadeIn>
            <h2 className="text-2xl font-serif font-bold">Contact</h2>
          </FadeIn>
          <p className="text-gray-600">
            ご相談・お見積りはメールにてご連絡ください。
          </p>
          <a
            className="inline-block bg-brand-dark text-white px-10 py-3 tracking-widest text-sm hover:bg-brand-accent transition-colors duration-300"
            href="mailto:info@sjdesign.jp"
          >
            CONTACT US
          </a>
        </section>
      </div>
    </div>
  );
};

export default ProfilePhotoPlan;

