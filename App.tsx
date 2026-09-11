import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import HajimariAI from './pages/HajimariAI';
import Photographer from './pages/Photographer';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';
import ProfilePhotoPlan from './pages/ProfilePhotoPlan';
import Contact from './pages/Contact';
import Thanks from './pages/Thanks';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// SPAはページ遷移時にHTMLを読み込み直さないため、ルート変更をGA4へ手動で通知する
const PageViewTracker = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 初回表示分は index.html の gtag('config', ...) が送信済み
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // 各ページが document.title を更新したあとに送信する
    const timer = window.setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location]);

  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <BrowserRouter>
        <ScrollToTop />
        <PageViewTracker />
        <div className={`flex flex-col min-h-screen font-sans antialiased text-brand-dark transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service" element={<HajimariAI />} />
              <Route path="/design" element={<HajimariAI />} />
              <Route path="/photo" element={<Photographer />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/plan/profile-photo" element={<ProfilePhotoPlan />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/thanks" element={<Thanks />} />
              {/* 日本語パスでアクセスされた場合も同じサンクスページを表示 */}
              <Route path="/サンクス" element={<Thanks />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;