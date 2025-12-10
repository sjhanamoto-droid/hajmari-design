import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, Camera } from 'lucide-react';
import { FadeIn, ParallaxImage } from '../components/Animators';

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <ParallaxImage 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Atmospheric background" 
          className="absolute inset-0 w-full h-full opacity-30"
          speed={0.5}
        />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-relaxed md:leading-normal mb-8 text-brand-dark">
              写真とデザインで、<br className="md:hidden" />会社の“はじまり”を形に
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm md:text-base tracking-[0.2em] text-gray-600 mb-12">
              創業期の『第一印象』に込める想いを、信頼へつなぐ。
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
             <div className="w-16 h-[1px] bg-brand-dark mb-12 mx-auto"></div>
          </FadeIn>
        </div>
      </section>

      {/* Split Navigation Section */}
      <section className="container mx-auto px-6 py-24 -mt-32 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Card 1: Branding */}
          <FadeIn delay={0.2} className="h-full">
            <Link to="/design" className="group block relative h-[550px] overflow-hidden bg-white shadow-xl transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                <img 
                  src="/images/yellow.png"
                  alt="Branding Design" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                <div className="flex items-center gap-3 mb-4 text-brand-light/90 overflow-hidden">
                  <motion-div initial={{x:-20}} whileInView={{x:0}} className="flex gap-2">
                    <PenTool size={20} />
                    <span className="text-xs tracking-widest uppercase">For Startups</span>
                  </motion-div>
                </div>
                <h2 className="text-4xl font-serif mb-4 tracking-wide">HAJMARI Design</h2>
                <p className="text-sm opacity-90 mb-8 leading-relaxed max-w-sm">
                  創業期に特化したトータルブランディング。<br/>
                  ロゴ、Web、写真を一貫した世界観で。
                </p>
                <div className="flex items-center gap-2 text-sm tracking-widest group-hover:gap-4 transition-all">
                  VIEW DETAILS <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Card 2: Photography */}
          <FadeIn delay={0.4} className="h-full">
            <Link to="/photo" className="group block relative h-[550px] overflow-hidden bg-white shadow-xl transition-all duration-700 hover:-translate-y-2 md:translate-y-12">
               <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                <img 
                  src="/images/top_photographer.jpg"
                  alt="Architecture Photography" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                <div className="flex items-center gap-3 mb-4 text-brand-light/90">
                  <Camera size={20} />
                  <span className="text-xs tracking-widest uppercase">For Owners</span>
                </div>
                <h2 className="text-4xl font-serif mb-4 tracking-wide">Photographer</h2>
                <p className="text-sm opacity-90 mb-8 leading-relaxed max-w-sm">
                  民泊・宿泊施設に特化した「売れる写真」。<br/>
                  建築×運営の視点で空間を切り取る。
                </p>
                <div className="flex items-center gap-2 text-sm tracking-widest group-hover:gap-4 transition-all">
                  VIEW DETAILS <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </FadeIn>

        </div>
      </section>

      {/* About Section */}
      <section className="bg-brand-light py-32 md:py-40">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeIn>
            <span className="text-xs font-bold tracking-[0.2em] text-brand-accent mb-6 block">CONCEPT</span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-serif leading-relaxed mb-12 text-brand-dark">
              写真は、<br />
              デザインの原点である。
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-600 leading-9 mb-16 font-light">
              「良いデザイン」は、必ず「良い素材」から始まります。<br />
              SJ Designは、フォトグラファーとしての眼差しを起点に、<br className="hidden md:block"/>
              ブランディングの全領域を一気通貫で手がけるクリエイティブスタジオです。<br />
              <br />
              別々の業者に頼むちぐはぐさや、高額なコスト、長い納期。<br />
              そんな創業期の課題を、ワンストップの制作体制で解決します。
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <Link to="/portfolio" className="inline-block border border-brand-dark px-12 py-4 text-sm tracking-widest hover:bg-brand-dark hover:text-white transition-colors duration-300">
              VIEW WORKS
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;