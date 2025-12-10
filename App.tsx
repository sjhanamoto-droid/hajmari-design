import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import HajimariDesign from './pages/HajimariDesign';
import Photographer from './pages/Photographer';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
      
      <HashRouter>
        <ScrollToTop />
        <div className={`flex flex-col min-h-screen font-sans antialiased text-brand-dark transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/design" element={<HajimariDesign />} />
              <Route path="/photo" element={<Photographer />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </>
  );
};

export default App;