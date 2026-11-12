import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react';
import { Arrow, Chars, MotionToggle } from './App';
import { initMotion } from './motion';

const HOME = '/renewal/';

// Web3Forms アクセスキー（既存サイトのお問い合わせフォームと同じ送信先。フロントに公開して問題ない値）
const WEB3FORMS_ACCESS_KEY =
  (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_WEB3FORMS_ACCESS_KEY ??
  '8d0fde71-6b27-4451-8fec-ec4d3daac65e';

const NAV = [
  { href: `${HOME}#issue`, label: 'Issue' },
  { href: `${HOME}#service`, label: 'Service' },
  { href: `${HOME}#mielba`, label: 'Mielba' },
  { href: `${HOME}#work`, label: 'Work' },
  { href: `${HOME}#company`, label: 'Company' },
];

const MIELBA = 'Mielbaの導入';
const CONSULT_OPTIONS = ['オーダーメイドのシステム・AI開発', MIELBA, '業務の整理・進め方の相談', 'その他'];

const NOTES = [
  { title: '決まっていなくても大丈夫', text: '何をつくるか決まっていない段階でも、困りごとからお聞かせください。' },
  { title: '1〜2営業日以内にご返信', text: '内容を確認のうえ、メールまたはお電話でご連絡します。' },
  { title: '業種は問いません', text: '建設業に限らず、会社ごとの仕事の流れに合わせてご提案します。' },
];

type FormState = { name: string; company: string; email: string; phone: string; consult: string[]; message: string };
const emptyForm = (consult: string[] = []): FormState => ({ name: '', company: '', email: '', phone: '', consult, message: '' });

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [motionOn, setMotionOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() =>
    emptyForm(new URLSearchParams(window.location.search).get('topic') === 'mielba' ? [MIELBA] : []),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [done, setDone] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (!rootRef.current) return;
    return initMotion(rootRef.current);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? 'on' : 'off';
  }, [motionOn]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleConsult = (option: string) => {
    setForm((prev) => ({
      ...prev,
      consult: prev.consult.includes(option) ? prev.consult.filter((c) => c !== option) : [...prev.consult, option],
    }));
    setErrors((prev) => ({ ...prev, consult: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'お名前をご入力ください。';
    if (!form.email.trim()) next.email = 'メールアドレスをご入力ください。';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'メールアドレスの形式をご確認ください。';
    if (form.consult.length === 0) next.consult = 'ご相談内容を1つ以上お選びください。';
    if (!form.message.trim()) next.message = 'お問い合わせ内容をご入力ください。';
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`f-${first}`)?.focus();
    return !first;
  };

  const finish = () => {
    setDone(true);
    setForm(emptyForm());
    requestAnimationFrame(() => cardRef.current?.scrollIntoView({ block: 'center' }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || !validate()) return;
    // ハニーポットに入力があれば bot とみなし、送信せず完了扱いにする
    if (honeypot) return finish();

    setSending(true);
    setSendError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `HAJMARI お問い合わせ（${form.name} 様）`,
          from_name: 'HAJMARI お問い合わせフォーム',
          email: form.email, // 返信先（Reply-To）になる
          'お名前': form.name,
          '会社名・屋号': form.company || '（未記入）',
          'メールアドレス': form.email,
          '電話番号': form.phone || '（未記入）',
          'ご相談内容': form.consult.join(' / '),
          'お問い合わせ内容': form.message,
        }),
      });
      const data = await res.json();
      if (data.success) finish();
      else setSendError(data.message || '送信に失敗しました。お手数ですが時間をおいて再度お試しください。');
    } catch {
      setSendError('送信に失敗しました。通信環境をご確認のうえ、再度お試しください。');
    } finally {
      setSending(false);
    }
  };

  const toggleMotion = () => setMotionOn((v) => !v);
  const err = (key: string) =>
    errors[key] ? <p className="field__error" id={`e-${key}`} role="alert">{errors[key]}</p> : null;
  const aria = (key: string) => ({ 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `e-${key}` : undefined });

  return (
    <div className="site cpage" ref={rootRef}>
      <a className="skip" href="#main">本文へ移動</a>

      <header className={`head ${menuOpen ? 'is-open' : ''}`}>
        <a className="head__logo" href={HOME}>HAJMARI</a>
        <nav className="head__nav" aria-label="メインメニュー">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="head__side">
          <a className="pill" href={HOME}>トップへ戻る<Arrow /></a>
          <button
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="menu"
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div id="menu" className={`menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="モバイルメニュー">
          {[{ href: HOME, label: 'Top' }, ...NAV].map((n, i) => (
            <a key={n.href} href={n.href} style={{ '--i': i } as CSSProperties} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      <main id="main">
        {/* ===== 見出し ===== */}
        <section className="chero" data-header="light">
          <svg className="chero__traces" aria-hidden="true" viewBox="0 0 1440 520" preserveAspectRatio="xMaxYMid slice">
            <path className="trace" pathLength="1" d="M1440 150 H1210 L1160 200 H1010" />
            <circle className="pad" cx="1010" cy="200" r="6" />
            <path className="trace" pathLength="1" d="M1440 200 H1260 L1210 250 V330" />
            <circle className="pad" cx="1210" cy="330" r="6" />
            <path className="trace" pathLength="1" d="M1440 400 H1320 L1280 360 H1120" />
            <circle className="pad" cx="1120" cy="360" r="6" />
            <path className="pulse" pathLength="1" d="M1440 150 H1210 L1160 200 H1010" />
          </svg>
          <div className="wrap chero__inner">
            <h1 className="contact__title fill" aria-label="Contact">
              <span className="giant__line" aria-hidden="true"><Chars text="Contact" /></span>
            </h1>
            <p className="chero__lead">まずは、困りごとを聞かせてください。</p>
            <p className="chero__text">業務の困りごと、システム・AI開発、Mielbaの導入について。<br />何をつくるか決まっていない段階でも、お気軽にご相談ください。</p>
          </div>
        </section>

        {/* ===== フォーム ===== */}
        <section className="cform">
          <div className="wrap cform__inner">
            <aside className="cform__side">
              <h2 className="cform__heading">お問い合わせ<br />フォーム</h2>
              <ul className="cform__notes">
                {NOTES.map((n, i) => (
                  <li className="rv" key={n.title} style={{ '--d': i } as CSSProperties}>
                    <span className="cform__no">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="cform__ntitle">{n.title}</p>
                      <p className="cform__ntext">{n.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="cform__card" ref={cardRef}>
              {done ? (
                <div className="cdone" role="status">
                  <span className="cdone__chip" aria-hidden="true">
                    <svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="9" ry="8" /><circle cx="8.5" cy="15" r="4" /><circle cx="15.5" cy="8.5" r="4" /><circle cx="24.5" cy="8.5" r="4" /><circle cx="31.5" cy="15" r="4" /></svg>
                  </span>
                  <p className="cdone__en">Thank you.</p>
                  <h2 className="cdone__title">お問い合わせを受け付けました。</h2>
                  <p className="cdone__text">
                    内容を確認のうえ、通常1〜2営業日以内にメールまたはお電話でご連絡します。確認用の自動返信メールはお送りしていません。
                  </p>
                  <a className="btn btn--blue" href={HOME}>トップページに戻る<Arrow /></a>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  {/* スパム対策（ハニーポット：人には見えません） */}
                  <input type="text" name="botcheck" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="f-name">お名前<span className="req">必須</span></label>
                      <input id="f-name" type="text" name="name" value={form.name} onChange={onChange} placeholder="山田 太郎" autoComplete="name" {...aria('name')} />
                      {err('name')}
                    </div>
                    <div className="field">
                      <label htmlFor="f-company">会社名・屋号<span className="opt">任意</span></label>
                      <input id="f-company" type="text" name="company" value={form.company} onChange={onChange} placeholder="株式会社〇〇" autoComplete="organization" />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="f-email">メールアドレス<span className="req">必須</span></label>
                      <input id="f-email" type="email" name="email" value={form.email} onChange={onChange} placeholder="example@mail.com" autoComplete="email" {...aria('email')} />
                      {err('email')}
                    </div>
                    <div className="field">
                      <label htmlFor="f-phone">電話番号<span className="opt">任意</span></label>
                      <input id="f-phone" type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="090-1234-5678" autoComplete="tel" />
                    </div>
                  </div>

                  <fieldset className="field" {...aria('consult')}>
                    <legend>ご相談内容<span className="req">必須</span><span className="field__hint">複数選択できます</span></legend>
                    <div className="picks">
                      {CONSULT_OPTIONS.map((option, i) => (
                        <button
                          type="button"
                          key={option}
                          id={i === 0 ? 'f-consult' : undefined}
                          className={`pick ${form.consult.includes(option) ? 'is-on' : ''}`}
                          aria-pressed={form.consult.includes(option)}
                          onClick={() => toggleConsult(option)}
                        >
                          <span className="pick__mark" aria-hidden="true" />
                          {option}
                        </button>
                      ))}
                    </div>
                    {err('consult')}
                  </fieldset>

                  <div className="field">
                    <label htmlFor="f-message">お問い合わせ内容<span className="req">必須</span></label>
                    <textarea id="f-message" name="message" value={form.message} onChange={onChange} rows={7} placeholder="ご相談したい内容や、現在お困りのことをお聞かせください。" {...aria('message')} />
                    {err('message')}
                  </div>

                  {sendError && <p className="cform__senderror" role="alert">{sendError}</p>}

                  <button type="submit" className="btn btn--blue cform__submit" disabled={sending}>
                    {sending ? '送信中…' : 'この内容で相談する'}
                    <Arrow />
                  </button>
                  <p className="cform__fine">送信ボタンを押すと、ご入力内容がそのまま送信されます。通常1〜2営業日以内にご返信します。</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot" data-header="light">
        <div className="wrap">
          <div className="foot__top">
            <div>
              <p className="foot__logo">HAJMARI</p>
              <p className="foot__tag">その会社の仕事に合う、システムとAIを。</p>
            </div>
            <nav className="foot__nav" aria-label="フッターメニュー">
              <div>
                <a href={`${HOME}#service`}>Service</a>
                <a href={`${HOME}#mielba`}>Mielba</a>
                <a href={`${HOME}#work`}>Work</a>
              </div>
              <div>
                <a href={`${HOME}#process`}>Process</a>
                <a href={`${HOME}#company`}>Company</a>
                <a href={HOME}>Top</a>
              </div>
            </nav>
          </div>
          <div className="foot__bottom cpage__bottom">
            <MotionToggle on={motionOn} onToggle={toggleMotion} />
            <small>© 2026 HAJMARI All rights reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
