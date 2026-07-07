import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { FadeIn } from '../components/Animators';

const CONSULT_OPTIONS = [
  'WEBサイト制作',
  'システム開発',
  '業務改善・AI活用',
  '写真・映像・ドローン撮影',
  'その他',
];

const BUDGET_OPTIONS = [
  '〜30万円',
  '30〜50万円',
  '50〜100万円',
  '100万円以上',
  'まだわからない',
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  consult: string[];
  budget: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  consult: [],
  budget: '',
  message: '',
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleConsult = (option: string) => {
    setForm((prev) => ({
      ...prev,
      consult: prev.consult.includes(option)
        ? prev.consult.filter((c) => c !== option)
        : [...prev.consult, option],
    }));
    setErrors((prev) => ({ ...prev, consult: '' }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'お名前をご入力ください。';
    if (!form.email.trim()) {
      next.email = 'メールアドレスをご入力ください。';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'メールアドレスの形式をご確認ください。';
    }
    if (form.consult.length === 0) next.consult = 'ご相談内容を1つ以上お選びください。';
    if (!form.message.trim()) next.message = 'お問い合わせ内容をご入力ください。';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `HAJMARI お問い合わせ（${form.name} 様）`;
    const body = [
      `【お名前】${form.name}`,
      `【会社名・屋号】${form.company || '（未記入）'}`,
      `【メールアドレス】${form.email}`,
      `【電話番号】${form.phone || '（未記入）'}`,
      `【ご相談内容】${form.consult.join(' / ')}`,
      `【ご予算感】${form.budget || '（未選択）'}`,
      '',
      '【お問い合わせ内容】',
      form.message,
    ].join('\n');

    window.location.href = `mailto:info@sjdesign.jp?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputBase =
    'w-full border border-gray-300 bg-white px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:border-brand-accent focus:outline-none transition-colors';

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
              CONTACT
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-brand-dark">
              まずはお気軽に、<br className="md:hidden" />ご相談ください。
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-8 max-w-2xl mx-auto">
              WEB制作・システム開発・業務改善・撮影まで。<br className="hidden md:block" />
              「何から始めれば…」という段階でも大丈夫です。あなたの事業のはじまりに、いちばん近い味方として伴走します。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-2xl">
          {submitted ? (
            <FadeIn>
              <div className="bg-white p-10 md:p-14 text-center shadow-sm">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent">
                  <CheckCircle2 size={34} />
                </div>
                <h2 className="text-2xl font-serif mb-4 text-brand-dark">メールソフトを起動しました</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  ご入力内容を反映したメールが開きます。<br />
                  そのまま送信してください。内容を確認のうえ、折り返しご連絡いたします。
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  ※ メールソフトが開かない場合は、お手数ですが下記までご連絡ください。<br />
                  <a href="mailto:info@sjdesign.jp" className="text-brand-accent hover:underline">
                    info@sjdesign.jp
                  </a>
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initialState);
                  }}
                  className="mt-8 text-xs tracking-widest text-gray-500 hover:text-brand-dark transition-colors underline"
                >
                  もう一度入力する
                </button>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form onSubmit={handleSubmit} noValidate className="bg-white p-8 md:p-12 shadow-sm space-y-8">
                {/* Name / Company */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      お名前 <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className={inputBase}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      会社名・屋号 <span className="text-gray-400 text-xs">(任意)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="株式会社〇〇"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      メールアドレス <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className={inputBase}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      電話番号 <span className="text-gray-400 text-xs">(任意)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="090-1234-5678"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Consult type */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-3">
                    ご相談内容 <span className="text-brand-accent">*</span>
                    <span className="text-gray-400 text-xs ml-2">(複数選択可)</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {CONSULT_OPTIONS.map((option) => {
                      const active = form.consult.includes(option);
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => toggleConsult(option)}
                          className={`px-4 py-2 text-sm border transition-colors duration-200 ${
                            active
                              ? 'bg-brand-dark text-white border-brand-dark'
                              : 'bg-white text-gray-600 border-gray-300 hover:border-brand-accent'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {errors.consult && <p className="text-xs text-red-500 mt-2">{errors.consult}</p>}
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    ご予算感 <span className="text-gray-400 text-xs">(任意)</span>
                  </label>
                  <select name="budget" value={form.budget} onChange={handleChange} className={inputBase}>
                    <option value="">選択してください</option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    お問い合わせ内容 <span className="text-brand-accent">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="ご相談したい内容や、現在お困りのことをお聞かせください。"
                    className={`${inputBase} resize-y`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-dark text-white text-sm tracking-widest hover:bg-brand-accent transition-colors duration-300"
                >
                  この内容で相談する
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  送信ボタンを押すと、ご入力内容を反映したメールソフトが起動します。
                </p>
              </form>
            </FadeIn>
          )}

          {/* Direct contact */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 text-sm text-gray-500">
              <a href="mailto:info@sjdesign.jp" className="inline-flex items-center gap-2 hover:text-brand-dark transition-colors">
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

export default Contact;
