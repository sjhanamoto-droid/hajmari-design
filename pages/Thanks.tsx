import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import { FadeIn } from '../components/Animators';

const STEPS = [
  {
    no: '01',
    title: '送信完了',
    body: 'ご入力いただいた内容を受け付けました。確認用の自動返信メールは送信していません。',
  },
  {
    no: '02',
    title: '内容の確認',
    body: 'ご相談内容を拝見し、必要に応じて具体的なご提案の準備を進めます。',
  },
  {
    no: '03',
    title: 'ご返信',
    body: '通常1〜2営業日以内に、担当者よりメールまたはお電話でご連絡いたします。',
  },
];

const Thanks: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'お問い合わせありがとうございます | HAJMARI';

    // サンクスページは検索結果に出さない
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.title = previousTitle;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="w-full bg-brand-light">
      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand-accent/10 blur-3xl"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <FadeIn>
            <span className="inline-block text-xs md:text-sm tracking-[0.35em] text-brand-accent font-medium mb-6">
              THANK YOU
            </span>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8 text-brand-accent shadow-sm">
              <CheckCircle2 size={34} />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-brand-dark leading-snug">
              お問い合わせ<br className="md:hidden" />ありがとうございます。
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-8 max-w-2xl mx-auto">
              内容を確認のうえ、担当者より折り返しご連絡いたします。<br className="hidden md:block" />
              事業のはじまりを、いちばん近い場所からご一緒させてください。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Flow */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <FadeIn key={step.no} delay={i * 0.1}>
                <div className="h-full bg-white p-8 shadow-sm">
                  <span className="block text-xs tracking-[0.3em] text-brand-accent mb-4">{step.no}</span>
                  <h2 className="text-lg font-serif text-brand-dark mb-3">{step.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Next actions */}
      <section className="pb-28 pt-12">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <FadeIn delay={0.2}>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              数日経っても返信が届かない場合は、迷惑メールフォルダをご確認のうえ、<br className="hidden sm:block" />
              お手数ですが下記メールアドレスまで直接ご連絡ください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-dark text-white text-sm tracking-widest hover:bg-brand-accent transition-colors duration-300"
              >
                トップページに戻る
              </Link>
              <Link
                to="/portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-dark text-brand-dark text-sm tracking-widest hover:bg-brand-dark hover:text-white transition-colors duration-300"
              >
                制作実績を見る
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center mt-10 text-sm text-gray-500">
              <a
                href="mailto:info@sjdesign.jp"
                className="inline-flex items-center gap-2 hover:text-brand-dark transition-colors"
              >
                <Mail size={16} className="text-brand-accent" />
                info@sjdesign.jp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Thanks;
