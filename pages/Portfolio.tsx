import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Animators';

const Portfolio: React.FC = () => {
  // Mock data for portfolio items
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? "Hotel Renovation Project" : "Startup Branding Kit",
    category: i % 2 === 0 ? "Photography / Architecture" : "Design / Identity",
    imageUrl: `https://picsum.photos/800/${i % 3 === 0 ? '1000' : '600'}?random=${i + 20}`,
    span: i % 3 === 0 ? 'row-span-2' : 'row-span-1'
  }));

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl font-serif font-bold mb-4">Selected Works</h1>
            <p className="text-gray-500 tracking-widest text-sm">
              デザインと写真、それぞれの実績。
            </p>
          </FadeIn>
        </div>

        {/* Masonry-like Grid Layout */}
        <StaggerContainer className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((item) => (
            <StaggerItem key={item.id} className="break-inside-avoid group cursor-pointer inline-block w-full">
              <div className="relative overflow-hidden rounded-sm bg-gray-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100">
                  <span className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {item.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-24 text-center">
          <FadeIn delay={0.4}>
            <p className="text-gray-600 mb-8">
              より詳細な実績（非公開案件含む）をご覧になりたい方は、<br/>
              お問い合わせフォームよりご連絡ください。
            </p>
            <a href="mailto:contact@hajimari-design.com" className="inline-block bg-brand-dark text-white px-12 py-4 tracking-widest hover:bg-brand-accent transition-colors duration-300">
              CONTACT US
            </a>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;