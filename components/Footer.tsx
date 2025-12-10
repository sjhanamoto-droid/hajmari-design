import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-gray-700 pb-10 mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-widest mb-2">SJ Design</h2>
            <p className="text-gray-400 text-sm">写真とデザインで、はじまりを形に。</p>
          </div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/masaskate" className="hover:text-brand-accent transition-colors"><Instagram size={24} /></a>
            <a href="mailto:info@sjdesign.jp" className="hover:text-brand-accent transition-colors"><Mail size={24} /></a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-400">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Link to="/design" className="hover:text-white transition-colors">HAJMARI Design (Branding)</Link>
              <Link to="/photo" className="hover:text-white transition-colors">Photographer (Architecture/Airbnb)</Link>
              <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            </div>
          </div>
          <div className="md:text-right">
            <p>© {new Date().getFullYear()} SJ Design. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;